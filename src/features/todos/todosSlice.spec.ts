import todoReducer, {
  add,
  update,
  remove,
  selectTodos,
  selectDeletedTodos,
  TodoState,
  TodoUpdatePayload,
  selectUpdatedTodos,
} from './todosSlice';
import { TodoEntityType, TodoInput, createTodoEntity } from './todo.entity';
import { RootState } from '@/src/app/store';

describe('todos reducer', () => {
  const initialState: TodoState = {
    entities: [],
  };

  it('should handle initial state', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
      entities: [],
    });
  });

  it('should handle add', () => {
    const payload: TodoInput = {
      title: 'title1',
      body: 'body1',
    };
    const actual = todoReducer(initialState, add(payload));
    const entities = actual.entities;
    expect(entities.length).toEqual(1);
    expect(entities[0].title).toEqual(payload.title);
    expect(entities[0].body).toEqual(payload.body);
    expect(entities[0].status).toEqual('waiting');
    expect(entities[0].createdAt).not.toEqual(undefined);
    expect(entities[0].updatedAt).toEqual(undefined);
    expect(entities[0].deletedAt).toEqual(undefined);
  });

  it('should handle update', () => {
    const payloadForAdd: TodoInput = {
      title: 'before update title',
      body: 'bofore update body',
    };
    const stateAfterAdd = todoReducer(initialState, add(payloadForAdd));
    const targetTodoId = stateAfterAdd.entities[0].id;

    const payloadForUpdate: TodoUpdatePayload = {
      id: targetTodoId,
      input: {
        title: 'after update title',
        body: 'after update body',
      },
    };

    const stateAfterUpdate = todoReducer(
      stateAfterAdd,
      update(payloadForUpdate)
    );
    const entity = stateAfterUpdate.entities.find(
      (entity) => entity.id === targetTodoId
    );
    expect(entity!.title).toEqual('after update title');
    expect(entity!.body).toEqual('after update body');
    expect(entity!.createdAt).not.toEqual(undefined);
    expect(entity!.updatedAt).not.toEqual(undefined);
    expect(entity!.deletedAt).toEqual(undefined);
  });

  it('should handle remove', () => {
    const initialState: TodoState = {
      entities: [],
    };
    const payloadForAdd: TodoInput = {
      title: 'before remove',
      body: 'bofore remove',
    };
    const stateAfterAdd = todoReducer(initialState, add(payloadForAdd));
    const targetTodoId = stateAfterAdd.entities[0].id;
    const stateAfterRemove = todoReducer(stateAfterAdd, remove(targetTodoId));
    const entity = stateAfterRemove.entities.find(
      (entity) => entity.id === targetTodoId
    );
    expect(entity?.deletedAt).not.toEqual(undefined);
  });
});

describe('todos selector', () => {
  it('should return todo entities that is not soft-deleted by the selectTodos function', () => {
    const state = {
      todos: {
        entities: [
          createTodoEntity({
            title: 'title 1',
            body: 'body 1',
            deletedAt: '9999-99-99 00:00:00',
          }),
          createTodoEntity({
            title: 'title 2',
            body: 'body 2',
          }),
        ] as TodoEntityType[],
      },
    } as RootState;

    const selectedTodos = selectTodos(state);
    expect(selectedTodos.length).toEqual(1);
    expect(selectedTodos[0].title).toEqual('title 2');
    expect(selectedTodos[0].body).toEqual('body 2');
  });

  it('should return soft-deleted todo entities when using "selectDeletedTodos" selector.', () => {
    const state = {
      todos: {
        entities: [
          createTodoEntity({
            title: 'title 1',
            body: 'body 1',
          }),
          createTodoEntity({
            title: 'title 2',
            body: 'body 2',
          }),
          createTodoEntity({
            title: 'title 3',
            body: 'body 3',
            deletedAt: '9999-99-99 00:00:00',
          }),
        ] as TodoEntityType[],
      },
    } as RootState;

    const selectedTodos = selectDeletedTodos(state);
    expect(selectedTodos.length).toEqual(1);
    expect(selectedTodos[0].title).toEqual('title 3');
    expect(selectedTodos[0].body).toEqual('body 3');
    expect(selectedTodos[0].deletedAt).toEqual('9999-99-99 00:00:00');
  });

  it('should return only updated todo entities when using "selectUpdatedTodos" selector.', () => {
    const state = {
      todos: {
        entities: [
          createTodoEntity({
            title: 'title 1',
            body: 'body 1',
            updatedAt: '8888-88-88 00:00:00',
          }),
          createTodoEntity({
            title: 'title 2',
            body: 'body 2',
          }),
          createTodoEntity({
            title: 'title 3',
            body: 'body 3',
            updatedAt: '9999-99-99 00:00:00',
            deletedAt: '9999-99-99 00:00:00',
          }),
        ] as TodoEntityType[],
      },
    } as RootState;

    const selectedTodos = selectUpdatedTodos(state);
    expect(selectedTodos.length).toEqual(1);
    expect(selectedTodos[0].title).toEqual('title 1');
    expect(selectedTodos[0].body).toEqual('body 1');
    expect(selectedTodos[0].updatedAt).toEqual('8888-88-88 00:00:00');
  });
});

import todoReducer, {
  add,
  update,
  remove,
  selectTodos,
  TodoState,
  TodoUpdatePayload,
} from './todosSlice';
import { TodoCollection } from '@/src/features/todos/todo.collection';
import { TodoEntity, TodoInput } from './todo.entity';
import { RootState } from '@/src/app/store';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
      collection: new TodoCollection(),
    });
  });

  it('should handle add', () => {
    const initialState: TodoState = {
      collection: new TodoCollection(),
    };
    const payload: TodoInput = {
      title: 'title1',
      body: 'body1',
    };
    const actual = todoReducer(initialState, add(payload));
    const entities = actual.collection.findAll();
    expect(entities.length).toEqual(1);
    expect(entities[0].title).toEqual(payload.title);
    expect(entities[0].body).toEqual(payload.body);
    expect(entities[0].status).toEqual('waiting');
    expect(entities[0].createdAt).not.toEqual(undefined);
    expect(entities[0].updatedAt).toEqual(undefined);
    expect(entities[0].deleteAt).toEqual(undefined);
  });

  it('should handle update', () => {
    const initialState: TodoState = {
      collection: new TodoCollection(),
    };
    const payloadForAdd: TodoInput = {
      title: 'before update title',
      body: 'bofore update body',
    };
    const stateAfterAdd = todoReducer(initialState, add(payloadForAdd));
    const targetTodoId = stateAfterAdd.collection.findAll()[0].id;

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
    const entity = stateAfterUpdate.collection.findById(targetTodoId);
    expect(entity!.title).toEqual('after update title');
    expect(entity!.body).toEqual('after update body');
    expect(entity!.createdAt).not.toEqual(undefined);
    expect(entity!.updatedAt).not.toEqual(undefined);
    expect(entity!.deleteAt).toEqual(undefined);
  });

  it('should handle remove', () => {
    const initialState: TodoState = {
      collection: new TodoCollection(),
    };
    const payloadForAdd: TodoInput = {
      title: 'before remove',
      body: 'bofore remove',
    };
    const stateAfterAdd = todoReducer(initialState, add(payloadForAdd));
    const targetTodoId = stateAfterAdd.collection.findAll()[0].id;
    const stateAfterRemove = todoReducer(stateAfterAdd, remove(targetTodoId));
    const entity = stateAfterRemove.collection.findById(targetTodoId);
    expect(entity).toEqual(undefined);
    expect(stateAfterRemove.collection.findAll().length).toEqual(0);
  });
});

describe('todos selector', () => {
  it('should return todo entities that is not soft-deleted by the selectTodos function', () => {
    const todoCollection = new TodoCollection();
    const numberOfTodos = 3;
    for (let i = 0; i < numberOfTodos; i++) {
      todoCollection.add({
        title: 'title' + i,
        body: 'body' + i,
      });
    }

    const state = {
      todos: {
        collection: todoCollection,
      },
    } as RootState;

    const selectedTodos = selectTodos(state);

    expect(selectedTodos.length).toEqual(numberOfTodos);
    expect(selectedTodos[0] instanceof TodoEntity).toEqual(true);
    expect(selectedTodos[0].title).toEqual('title0');
    expect(selectedTodos[0].body).toEqual('body0');
  });
});
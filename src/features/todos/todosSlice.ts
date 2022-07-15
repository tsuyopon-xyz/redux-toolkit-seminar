import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/src/app/store';
import {
  TodoInput,
  TodoId,
  TodoEntityType,
  createTodoEntity,
} from './todo.entity';
import { getCurrentDateTime } from '@/src/utils/date';

export type TodoState = {
  entities: TodoEntityType[];
};

export type TodoUpdatePayload = {
  id: TodoId;
  input: Partial<TodoInput>;
};

const initialState: TodoState = {
  entities: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoInput>) => {
      const entity = createTodoEntity(action.payload);
      state.entities.push(entity);
    },
    update: (state, action: PayloadAction<TodoUpdatePayload>) => {
      const { id, input } = action.payload;
      const index = state.entities.findIndex((_entity) => _entity.id === id);
      const entity = state.entities[index];
      if (!entity) return;

      state.entities[index] = {
        ...entity,
        ...input,
        updatedAt: getCurrentDateTime(),
      };
    },
    remove: (state, action: PayloadAction<TodoId>) => {
      const id = action.payload;
      const index = state.entities.findIndex((_entity) => _entity.id === id);
      const entity = state.entities[index];
      if (!entity) return;

      state.entities[index] = {
        ...entity,
        deletedAt: getCurrentDateTime(),
      };
    },
  },
});

export const { add, update, remove } = todoSlice.actions;

export const selectTodos = (state: RootState) =>
  state.todos.entities.filter((entity) => entity.deletedAt === undefined);

export const selectUpdatedTodos = (state: RootState) =>
  state.todos.entities.filter(
    (entity) => entity.updatedAt !== undefined && entity.deletedAt === undefined
  );

export const selectDeletedTodos = (state: RootState) =>
  state.todos.entities.filter((entity) => entity.deletedAt !== undefined);

export default todoSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/src/app/store';
import { TodoCollection } from './todo.collection';
import type { TodoInput, TodoId } from './todo.entity';

export type TodoState = {
  collection: TodoCollection;
};

export type TodoUpdatePayload = {
  id: TodoId;
  input: TodoInput;
};

const initialState: TodoState = {
  collection: new TodoCollection(),
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoInput>) => {
      state.collection.add(action.payload);
    },
    update: (state, action: PayloadAction<TodoUpdatePayload>) => {
      const { id, input } = action.payload;
      state.collection.updateById(id, input);
    },
    remove: (state, action: PayloadAction<TodoId>) => {
      state.collection.removeById(action.payload);
    },
  },
});

export const { add, update, remove } = todoSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default todoSlice.reducer;

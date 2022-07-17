import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/src/app/store';
import {
  TodoInput,
  TodoId,
  TodoEntityType,
  createTodoEntity,
} from './todo.entity';
import { getCurrentDateTime } from '@/src/utils/date';
import { fetchTodos } from './api/todosAPI';
import { setTodos } from './localStorage/todosLocalStorage';

export type TodoState = {
  entities: TodoEntityType[];
  status: 'idle' | 'loading';
  error: SerializedError | null;
};

export type TodoUpdatePayload = {
  id: TodoId;
  input: Partial<TodoInput>;
};

const initialState: TodoState = {
  entities: [],
  status: 'idle',
  error: null,
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoInput>) => {
      const { title, body } = action.payload;
      if (!title || !body)
        throw new Error('タイトルと本文の両方を入力してください');

      const entity = createTodoEntity(action.payload);
      state.entities.push(entity);
      setTodos(state.entities);
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
      setTodos(state.entities);
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
      setTodos(state.entities);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.error = null;
        state.entities = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      });
  },
});

export const fetchTodosAsync = createAsyncThunk<TodoEntityType[]>(
  `${todoSlice.name}/fetch`,
  async (_, _thunkAPI) => {
    const response = await fetchTodos();
    // // throw new Error('hoo');
    return response.data;
  }
);

export const { add, update, remove } = todoSlice.actions;

export const selectTodos = (state: RootState) =>
  state.todos.entities.filter((entity) => entity.deletedAt === undefined);

export const selectUpdatedTodos = (state: RootState) =>
  state.todos.entities.filter(
    (entity) => entity.updatedAt !== undefined && entity.deletedAt === undefined
  );

export const selectDeletedTodos = (state: RootState) =>
  state.todos.entities.filter((entity) => entity.deletedAt !== undefined);

export type TodosSelectorType = typeof selectTodos &
  typeof selectUpdatedTodos &
  typeof selectDeletedTodos;

export default todoSlice.reducer;

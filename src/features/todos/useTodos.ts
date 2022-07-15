import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/app/hooks';
import type { TodoInput, TodoId } from './todo.entity';
import {
  add,
  update,
  remove,
  fetchTodosAsync,
  selectTodos,
  selectUpdatedTodos,
  selectDeletedTodos,
  TodosSelectorType,
  TodoUpdatePayload,
} from './todosSlice';

export const DISPLAY_FLAG_MAP = {
  all: '全て（削除済みは除く）',
  updated: '更新済み（削除済みは除く）',
  deleted: '削除済み',
};
export type DisplayFlagType = keyof typeof DISPLAY_FLAG_MAP;

const selectSelectorByDisplayFlag = (
  flag: DisplayFlagType
): TodosSelectorType => {
  if (flag === 'updated') return selectUpdatedTodos;
  if (flag === 'deleted') return selectDeletedTodos;

  return selectTodos;
};

export const useTodos = () => {
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: '',
    body: '',
  });
  const [displayFlag, setDisplayFlag] = useState<DisplayFlagType>('all');
  const todos = useAppSelector(selectSelectorByDisplayFlag(displayFlag));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  const addTodo = (payload: TodoInput) => {
    try {
      dispatch(add(payload));
      setTodoInput({
        title: '',
        body: '',
      });
      // input:textにあたっているフォーカスを解除
      // エンターキーでTodoを追加したときの対処
      const activeElement = document.activeElement;
      if (!activeElement) return;
      (activeElement as HTMLInputElement).blur();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const updateTodo = (payload: TodoUpdatePayload) => {
    dispatch(update(payload));
  };

  const removeTodo = (payload: TodoId) => {
    dispatch(remove(payload));
  };

  return {
    todos,
    todoInput,
    displayFlag,
    setTodoInput,
    setDisplayFlag,
    addTodo,
    updateTodo,
    removeTodo,
  };
};

export default useTodos;

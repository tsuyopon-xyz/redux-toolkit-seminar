import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/app/hooks';
import type { TodoInput, TodoId } from './todo.entity';
import {
  add,
  update,
  remove,
  restore,
  fetchTodosAsync,
  selectTodos,
  selectUpdatedTodos,
  selectDeletedTodos,
  selectIsLoading,
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
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // ファイルを保存するたびにfetchTodosAsyncが走るため、
    // 保存のたびにtodosが更新されるのを止めたい場合は、
    // ここのdispatchをコメントアウトする
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

  const restoreTodo = (payload: TodoId) => {
    dispatch(restore(payload));
  };

  return {
    todos,
    todoInput,
    displayFlag,
    isLoading,
    setTodoInput,
    setDisplayFlag,
    addTodo,
    updateTodo,
    removeTodo,
    restoreTodo,
  };
};

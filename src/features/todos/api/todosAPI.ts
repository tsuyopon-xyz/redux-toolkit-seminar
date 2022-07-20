import { TodoEntityType, createTodoEntity } from '../todo.entity';
import { getTodos } from '../localStorage/todosLocalStorage';

type Response = {
  data: TodoEntityType[];
};

export const fetchTodos = async (): Promise<Response> => {
  return new Promise((resolve) => {
    // ローカルストレージからデータを取得しているが、
    // バックエンドでDBを用意してAPIを通して取得するパターンも可
    const entities: TodoEntityType[] = getTodos();

    setTimeout(() => resolve({ data: entities }), 1000);
  });
};

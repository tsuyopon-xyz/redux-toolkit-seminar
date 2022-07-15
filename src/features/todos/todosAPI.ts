import { TodoEntityType, createTodoEntity } from './todo.entity';

type Response = {
  data: TodoEntityType[];
};

export const fetchTodos = async (): Promise<Response> => {
  return new Promise((resolve) => {
    // ダミーとして3件のTodoEntitiesを返しているが、
    // 実際にはサーバーにリクエストを投げてTodo情報を取得すること想定している
    const entities: TodoEntityType[] = Array.from({ length: 3 }).map(
      (_, index) => {
        return createTodoEntity({
          title: 'title' + index,
          body: 'body' + index,
        });
      }
    );

    setTimeout(() => resolve({ data: entities }), 1000);
  });
};

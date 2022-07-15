import { FC, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/app/hooks';
import {
  add,
  update,
  remove,
  selectTodos,
  TodoUpdatePayload,
} from './todosSlice';
import type { TodoInput, TodoId } from './todo.entity';

export const TodoList: FC = () => {
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: '',
    body: '',
  });
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodoInput({
      ...todoInput,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(
      add({
        title: todoInput.title,
        body: todoInput.body,
      })
    );
  };

  const updateTodo = (payload: TodoUpdatePayload) => {
    dispatch(update(payload));
  };

  const removeTodo = (payload: TodoId) => {
    dispatch(remove(payload));
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>
            タイトル :{' '}
            <input
              onChange={onChangeHandler}
              type="text"
              name="title"
              value={todoInput.title}
            />
          </label>
        </div>
        <div>
          <label>
            本文 :{' '}
            <input
              onChange={onChangeHandler}
              type="text"
              name="body"
              value={todoInput.body}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="作成" />
        </div>
      </form>
      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>タイトル</th>
            <th>本文</th>
            <th>ステータス</th>
            <th>作成日時</th>
            <th>更新日時</th>
            <th>更新ボタン</th>
            <th>削除ボタン</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.body}</td>
                <td>{todo.status}</td>
                <td>{todo.createdAt}</td>
                <td>{todo.updatedAt ?? '無し'}</td>
                <td>
                  <button
                    onClick={() => {
                      updateTodo({
                        id: todo.id,
                        input: {
                          title: '更新したタイトル',
                        },
                      });
                    }}
                  >
                    更新
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      removeTodo(todo.id);
                    }}
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

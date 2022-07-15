import { FC, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/app/hooks';
import {
  add,
  update,
  remove,
  selectTodos,
  selectUpdatedTodos,
  selectDeletedTodos,
  TodoUpdatePayload,
  TodosSelectorType,
} from './todosSlice';
import type { TodoInput, TodoId } from './todo.entity';

const displayFlagMap = {
  all: '全て（削除済みは除く）',
  updated: '更新済み（削除済みは除く）',
  deleted: '削除済み',
};
type DisplayFlagType = keyof typeof displayFlagMap;

const selectSelectorByDisplayFlag = (
  flag: DisplayFlagType
): TodosSelectorType => {
  if (flag === 'updated') return selectUpdatedTodos;
  if (flag === 'deleted') return selectDeletedTodos;

  return selectTodos;
};

export const TodoList: FC = () => {
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: '',
    body: '',
  });
  const [displayFlag, setDisplayFlag] = useState<DisplayFlagType>('all');
  const todos = useAppSelector(selectSelectorByDisplayFlag(displayFlag));
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
      <div>
        閲覧フラグ
        <select
          value={displayFlag}
          onChange={(e) => setDisplayFlag(e.target.value as DisplayFlagType)}
        >
          {Object.entries(displayFlagMap).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
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
            <th>削除日時</th>
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
                <td>{todo.deletedAt ?? '無し'}</td>
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

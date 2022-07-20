import { FC } from 'react';
import { useTodos, DISPLAY_FLAG_MAP, DisplayFlagType } from './useTodos';
import { useDeleteModal } from './DeleteModal/useDeleteModal';

export const TodoList: FC = () => {
  const {
    todos,
    todoInput,
    displayFlag,
    setTodoInput,
    setDisplayFlag,
    addTodo,
    updateTodo,
    removeTodo,
    restoreTodo,
  } = useTodos();
  const { open, DeleteModalWrapper } = useDeleteModal();

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodoInput({
      ...todoInput,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addTodo({
      title: todoInput.title,
      body: todoInput.body,
    });
  };

  return (
    <div>
      {/* <DeleteModal onDelete={() => {}} onCancel={() => {}} /> */}
      <DeleteModalWrapper />
      <div>
        閲覧フラグ
        <select
          value={displayFlag}
          onChange={(e) => setDisplayFlag(e.target.value as DisplayFlagType)}
        >
          {Object.entries(DISPLAY_FLAG_MAP).map(([key, value]) => {
            return (
              <option key={key} value={key}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      <form onSubmit={onSubmitHandler} method="post">
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
            <th>
              {displayFlag === 'deleted' ? '削除取り消しボタン' : '削除ボタン'}
            </th>
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
                    disabled={displayFlag === 'deleted'}
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
                  {displayFlag === 'deleted' ? (
                    <button
                      onClick={() => {
                        console.log('削除取り消し機能の実装');
                        restoreTodo(todo.id);
                      }}
                    >
                      削除取り消し
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        open(() => removeTodo(todo.id));
                      }}
                    >
                      削除
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

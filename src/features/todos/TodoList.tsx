import { FC } from 'react';
import { useTodos, DISPLAY_FLAG_MAP, DisplayFlagType } from './useTodos';
import { useConfirmModal } from './modals/ConfirmModal/useConfirmModal';
import { useUpdateTodoModal } from './modals/UpdateTodoModal/useUpdateTodoModal';
import { translateStatus } from './utils/todo-converter';
import { TodoForm } from './TodoForm';

export const TodoList: FC = () => {
  const {
    todos,
    displayFlag,
    isLoading,
    setDisplayFlag,
    addTodo,
    updateTodo,
    removeTodo,
    restoreTodo,
  } = useTodos();
  const {
    open: openConfirmModal,
    setMessage,
    ConfirmModalWrapper,
  } = useConfirmModal();
  const {
    open: openUpdateTodoModal,
    setTodoInput: setTodoInputForUpdateTodoModal,
    UpdateTodoModalWrapper,
  } = useUpdateTodoModal();

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div>
      <ConfirmModalWrapper />
      <UpdateTodoModalWrapper />
      <TodoForm onSubmit={(input) => addTodo(input)} />
      <hr />
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
          {todos.length === 0 ? (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center' }}>
                データなし
              </td>
            </tr>
          ) : (
            todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.body}</td>
                  <td>{translateStatus(todo.status)}</td>
                  <td>{todo.createdAt}</td>
                  <td>{todo.updatedAt ?? '無し'}</td>
                  <td>{todo.deletedAt ?? '無し'}</td>
                  <td>
                    <button
                      disabled={displayFlag === 'deleted'}
                      onClick={() => {
                        setTodoInputForUpdateTodoModal(todo);
                        openUpdateTodoModal((newTodoInput) => {
                          updateTodo({
                            id: newTodoInput.id!,
                            input: newTodoInput,
                          });
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
                          setMessage('削除を取り消しますか？');
                          openConfirmModal(() => restoreTodo(todo.id));
                        }}
                      >
                        削除取り消し
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMessage('本当に削除しますか？');
                          openConfirmModal(() => removeTodo(todo.id));
                        }}
                      >
                        削除
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

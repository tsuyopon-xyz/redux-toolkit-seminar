import type { FC } from 'react';
import type { TodoEntityType, TodoId, TodoInput } from '../todo.entity';
import type { DisplayFlagType } from '../hooks/useTodos';
import { translateStatus } from '../utils/todo-converter';
import { useConfirmModal } from './modals/ConfirmModal/useConfirmModal';
import { useUpdateTodoModal } from './modals/UpdateTodoModal/useUpdateTodoModal';

type Props = {
  todos: TodoEntityType[];
  displayFlag: DisplayFlagType;
  onUpdate: (input: TodoInput) => void;
  onRemove: (id: TodoId) => void;
  onRestore: (id: TodoId) => void;
};

export const TodoTable: FC<Props> = ({
  todos,
  displayFlag,
  onUpdate,
  onRemove,
  onRestore,
}) => {
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

  return (
    <>
      <ConfirmModalWrapper />
      <UpdateTodoModalWrapper />
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
                          onUpdate(newTodoInput);
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
                          openConfirmModal(() => onRestore(todo.id));
                        }}
                      >
                        削除取り消し
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMessage('本当に削除しますか？');
                          openConfirmModal(() => onRemove(todo.id));
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
    </>
  );
};

export default TodoTable;

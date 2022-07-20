import { FC, useState } from 'react';
import { Modal } from '@/src/components/shared/Modal';
import styles from './index.module.css';
import { TODO_STATUSES, TodoInput, TodoStatus } from '../../todo.entity';

export type OnOKHandlerType = (newInput: TodoInput) => void;

type Props = {
  isOpen: boolean;
  input: TodoInput;
  onClickCancel?: () => void;
  onClickOK: OnOKHandlerType;
};

export const UpdateTodoModal: FC<Props> = ({
  onClickCancel,
  onClickOK,
  isOpen,
  input,
}) => {
  const [newInput, setNewInput] = useState<TodoInput>({
    id: input.id,
    title: input.title,
    body: input.body,
    status: input.status,
  });

  const onChangeTextHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setNewInput({
      ...newInput,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const newStatus = e.target.value as TodoStatus;
    setNewInput({
      ...newInput,
      status: newStatus,
    });
  };

  return (
    <Modal isOpen={isOpen}>
      <p className={styles.message}>Todoの更新</p>
      <div>
        <label>
          <input
            type="text"
            name="title"
            value={newInput.title}
            onChange={onChangeTextHandler}
          />
        </label>
        <label>
          <input
            type="text"
            name="body"
            value={newInput.body}
            onChange={onChangeTextHandler}
          />
        </label>
        <label>
          <select value={newInput.status} onChange={onChangeSelectHandler}>
            {TODO_STATUSES.map((status) => {
              return (
                <option key={status} value={status}>
                  {status}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button}`}
          onClick={(e) => {
            (e.target as HTMLInputElement).blur();
            if (!onClickCancel) return;

            onClickCancel();
          }}
        >
          キャンセル
        </button>
        <button
          className={`${styles.button} ${styles.okButton}`}
          onClick={(e) => {
            (e.target as HTMLInputElement).blur();

            onClickOK(newInput);
          }}
        >
          更新する
        </button>
      </div>
    </Modal>
  );
};

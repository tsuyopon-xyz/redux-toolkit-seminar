import { FC } from 'react';
import { Modal } from '@/src/components/shared/Modal';
import styles from './index.module.css';

type Props = {
  isOpen: boolean;
  onClickCancel?: () => void;
  onClickDelete: () => void;
};

export const DeleteModal: FC<Props> = ({
  onClickCancel,
  onClickDelete,
  isOpen,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <p className={styles.title}>本当に削除しますか？</p>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button}`}
          onClick={(e) => {
            console.log('キャンセル処理をする');
            (e.target as HTMLInputElement).blur();
            if (!onClickCancel) return;

            onClickCancel();
          }}
        >
          キャンセル
        </button>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={(e) => {
            console.log('削除処理をする');
            (e.target as HTMLInputElement).blur();

            onClickDelete();
          }}
        >
          削除する
        </button>
      </div>
    </Modal>
  );
};

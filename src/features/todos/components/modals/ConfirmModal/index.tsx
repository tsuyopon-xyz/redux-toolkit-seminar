import { FC } from 'react';
import { Modal } from '@/src/components/shared/Modal';
import styles from './index.module.css';

type Props = {
  isOpen: boolean;
  message?: string;
  onClickCancel?: () => void;
  onClickOK: () => void;
};

export const ConfirmModal: FC<Props> = ({
  onClickCancel,
  onClickOK,
  isOpen,
  message,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button}`}
          onClick={(e) => {
            (e.target as HTMLInputElement).blur();
            if (!onClickCancel) return;

            onClickCancel();
          }}
        >
          いいえ
        </button>
        <button
          className={`${styles.button} ${styles.okButton}`}
          onClick={(e) => {
            (e.target as HTMLInputElement).blur();

            onClickOK();
          }}
        >
          はい
        </button>
      </div>
    </Modal>
  );
};

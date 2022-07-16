// 参考にしたコード: https://github.com/microcmsio/react-hooks-use-modal/blob/master/src/index.tsx
import { useState, useCallback } from 'react';
import { DeleteModal } from './index';

type OnDeleteHandlerType = Function | undefined;

export const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onDeleteHandler, setOnDeleteHandler] = useState<OnDeleteHandlerType>();

  const open = useCallback(
    (callback: OnDeleteHandlerType) => {
      setIsOpen(true);
      setOnDeleteHandler(() => {
        return callback;
      });
    },
    [setIsOpen, setOnDeleteHandler]
  );
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const DeleteModalWrapper = useCallback(() => {
    return (
      <DeleteModal
        isOpen={isOpen}
        onClickDelete={() => {
          if (onDeleteHandler) onDeleteHandler();
          close();
        }}
        onClickCancel={() => {
          close();
        }}
      />
    );
  }, [isOpen, onDeleteHandler]);

  return { isOpen, open, close, DeleteModalWrapper };
};

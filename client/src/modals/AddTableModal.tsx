import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { Button } from '../components/Button';
import { InputBox } from '../components/InputBox';
import { AlertModal } from './AlertModal';

interface AddTableModalProps {
  open?: boolean;
  onClose?: () => void;
  onSelect?: (table: { rows: string[] }[]) => void;
}

export const AddTableModal: FC<AddTableModalProps> = ({
  onClose,
  open,
  onSelect,
}) => {
  const [row, setRow] = useState('');
  const [column, setColumn] = useState('');
  const [modal, setModal] = useState({ show: false, message: '' });
  const showModal = (message: string) => {
    setModal({
      show: true,
      message,
    });
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  const handleClose = () => {
    setRow('');
    setColumn('');
    onClose?.();
  };

  const handleValidate = (
    row: string,
    column: string
  ): [boolean, { num_row: number; num_column: number } | null] => {
    if (/[0-9]/gi.test(row) === false || /[0-9]/gi.test(column) === false) {
      showModal('정수 값만 입력해 주세요.');
      return [false, null];
    }

    if (row.length > 1 || column.length > 1) {
      showModal('최대 6까지 입력 가능합니다.');
      return [false, null];
    }
    const num_row = parseInt(row);
    const num_column = parseInt(column);
    if (num_row > 6 || num_column > 6) {
      showModal('최대 6까지 입력 가능합니다.');
    }

    return [true, { num_row, num_column }];
  };

  const handleSubmit = () => {
    const [va, data] = handleValidate(row, column);
    if (va === false || data === null) {
      return;
    }
    const table = Array(data.num_column)
      .fill('')
      .map(() => ({
        rows: Array(data.num_row)
          .fill('')
          .map(() => ''),
      }));

    onSelect?.(table);
    handleClose();
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-modal" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[408px] transform overflow-hidden rounded bg-white p-10 text-left align-middle shadow-1 transition-all">
                  <InputBox
                    placeholder="(필수) 행 개수 "
                    className="w-full mb-2.5"
                    value={row}
                    onChange={(e) => setRow(e.target.value)}
                  />
                  <InputBox
                    placeholder="(필수) 열 개수 "
                    className="w-full mb-5"
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                  />
                  <Button
                    className="w-full block"
                    type="button"
                    onClick={handleSubmit}
                  >
                    생성하기
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <AlertModal
        title="알림"
        message={modal.message}
        open={modal.show}
        onClose={hideModal}
      />
    </>
  );
};

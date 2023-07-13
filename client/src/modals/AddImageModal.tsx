import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState, ChangeEventHandler, useId } from 'react';
import { AlertModal } from './AlertModal';

interface AddImageModalProps {
  open?: boolean;
  onClose?: () => void;
  onSelect?: (file: File & { url: string }) => void;
}

const FILE_ACCEPT = 'image/png,image/jpeg,image/jpg';

export const AddImageModal: FC<AddImageModalProps> = ({
  onClose,
  open,
  onSelect,
}) => {
  const id = useId();
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
    onClose?.();
  };

  const handleFiles = (files?: FileList) => {
    if (files) {
      return files.item(0);
    }
    return null;
  };

  const verifyMIME = (file: File) => {
    return FILE_ACCEPT.split(',').includes(file.type);
  };

  const updateFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const _file: File & { url: string } = Object.assign(file, { url });
    // dispatch.updateColumn(section, column, { image: _file });
    onSelect?.(_file);
  };

  const handleChangeInputBox: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    const file = handleFiles(files || undefined);
    if (file === null) {
      showModal('파일이 존재하지 않습니다.');
      return;
    }
    const isVerifyMIME = verifyMIME(file);
    if (isVerifyMIME === false) {
      showModal('파일 형식이 올바르지 않습니다.');
      return;
    }
    updateFile(file);
    onClose?.();
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
                  <label className="btn block cursor-pointer mb-5" htmlFor={id}>
                    이미지 업로드
                  </label>
                  <input
                    id={id}
                    value=""
                    hidden
                    type="file"
                    accept={FILE_ACCEPT}
                    onChange={handleChangeInputBox}
                  />
                  <p className="text-center text-b3 text-gray800">
                    gif, png, jpg
                  </p>
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

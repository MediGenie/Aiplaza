import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, ReactNode } from 'react';
import { Button } from '../components/Button';

interface AlertModalProps {
  title: string;
  message: string | ReactNode;
  open?: boolean;
  onClose?: () => void;
  closeText?: string;
  confirmFunc?: () => void;
  confirmText?: string;
}

export const AlertModal: FC<AlertModalProps> = ({
  message,
  title,
  onClose,
  open,
  closeText = '닫기',
  confirmFunc,
  confirmText = '확인',
}) => {
  const handleClose = () => {
    onClose?.();
  };
  return (
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-1 transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-b1 font-medium text-center"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  {typeof message === 'string' ? (
                    <p className="text-b2 whitespace-pre-wrap">{message}</p>
                  ) : (
                    message
                  )}
                </div>
                {confirmFunc ? (
                  <div className="flex flex-1 mt-4">
                    <div className="w-full mr-6">
                      <Button
                        type="button"
                        className="w-full"
                        onClick={handleClose}
                      >
                        {closeText}
                      </Button>
                    </div>
                    <div className="w-full">
                      <Button
                        type="button"
                        className="w-full"
                        onClick={confirmFunc}
                      >
                        {confirmText}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 px-6">
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleClose}
                    >
                      {closeText}
                    </Button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

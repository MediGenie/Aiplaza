import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { Button } from '../components/Button';

interface RefundModalProps {
  open?: boolean;
  onClose?: () => void;
  func?: (refundReason: string) => void;
}

export const RefundModal: FC<RefundModalProps> = ({ onClose, open, func }) => {
  const [refundReason, setRefundReason] = useState('');
  const handleClose = () => {
    onClose?.();
  };
  const handleFunc = () => {
    func?.(refundReason);
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
                  환불하시겠습니까?
                </Dialog.Title>
                {/* <div className="mt-2 px-6">
                  <p className="text-b2 whitespace-pre-wrap">
                    환불하시겠습니까?
                  </p>
                </div> */}
                <div className="px-6">
                  <input
                    className="mt-[10px] px-[15px] py-3 w-full border border-gray300 rounded-[5px] placeholder:text-gray400 placeholder:text-b3"
                    placeholder="환불사유를 작성해주세요."
                    value={refundReason}
                    onChange={(e) => {
                      setRefundReason(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mt-4 px-6">
                  <Button type="button" className="w-full" onClick={handleFunc}>
                    환불신청
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

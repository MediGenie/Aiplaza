import { Dialog, Transition } from "@headlessui/react";
import { Form, FormikProvider, useFormik } from "formik";
import { FC, Fragment, ReactNode, useState } from "react";
import { ApiError } from "../apis/api-error";
import { authApis } from "../apis/auth";
import { consumerServiceApis } from "../apis/service";
import { Button } from "../components/Button";
import { FormikInputBox } from "../components/FormikComponent";
import { FormikInputArea } from "../components/FormikComponent";
import { FormRow } from "../components/FormRow";
import { useModalState } from "../hooks/useModalState";
import { InquireYup } from "../yups/inquire-yup";
import { AlertModal } from "./AlertModal";

interface InquireModalProps {
  email: string;
  serviceTitle: string;
  open?: boolean;
  onClose?: () => void;
  closeText?: string;
  confirmFunc?: () => void;
  confirmText?: string;
}

export const InquireModal: FC<InquireModalProps> = ({
  email,
  onClose,
  open,
  serviceTitle,
}) => {
  const { props: modalProps, showModal } = useModalState();
  const handleClose = () => {
    onClose?.();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      inquire: "",
    },
    onSubmit: async (values, helper) => {
      if (values.email === "" || typeof values.email === "undefined") {
        helper.setSubmitting(false);
        return helper.setFieldError("email", "이메일을 입력해 주세요.");
      }
      if (values.inquire === "" || typeof values.inquire === "undefined") {
        helper.setSubmitting(false);
        return helper.setFieldError("inquire", "문의내용을 입력해 주세요.");
      }
      await consumerServiceApis
        .sendInQuire(email, values.email, values.inquire, serviceTitle)
        .then(() => {
          onClose?.();
        })
        .catch((e: ApiError) => {
          showModal(e.message);
        });
    },
    validationSchema: InquireYup,
  });

  return (
    <>
      <AlertModal title="알림" {...modalProps} />
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-8 text-left align-middle shadow-1 transition-all">
                  <FormikProvider value={formik}>
                    <Form>
                      <FormRow label="이메일 주소" required>
                        <FormikInputBox
                          name="email"
                          placeholder="회신받으실 메일주소를 입력해 주세요."
                          className="w-full"
                        />
                      </FormRow>

                      <div className="mt-5">
                        <FormRow label="문의내용" required>
                          <FormikInputArea
                            name="inquire"
                            placeholder="문의내용을 입력해 주세요."
                            className="min-h-[240px]"
                          />
                        </FormRow>
                      </div>
                      <Button type="submit" className="w-full mt-8">
                        문의하기
                      </Button>
                    </Form>
                  </FormikProvider>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

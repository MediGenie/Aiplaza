import { Form, FormikProvider, useFormik } from 'formik';
import { FC } from 'react';
import { ApiError } from '../../../../apis/api-error';
import { mypageApis } from '../../../../apis/mypage';
import { Button } from '../../../../components/Button';
import { FormikInputBox } from '../../../../components/FormikComponent';
import { FormRow } from '../../../../components/FormRow';
import { useState } from 'react';
import { MyPasswordYup } from '../../../../yups/my-password.yup';
import { AlertModal } from '../../../../modals';

interface ChangePasswordProps {}

const ChangePassword: FC<ChangePasswordProps> = () => {
  const [errorModal, setErrorModal] = useState({ message: '', show: false });
  const [modal, setModal] = useState({ show: false, message: '' });
  const handleErrorModalClose = () => {
    setErrorModal((prev) => ({ ...prev, show: false }));
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async (values, helper) => {
      try {
        await mypageApis.changePassword({
          password: values.password,
        });
        setModal({ show: true, message: '비밀번호가 변경되었습니다' });
        helper.setSubmitting(false);
      } catch (e: any) {
        const error = e as ApiError;
        if (error.type === 'NORMAL') {
          setErrorModal({ message: error.message, show: true });
        }
        helper.setSubmitting(false);
      }
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: MyPasswordYup,
  });

  return (
    <div>
      <p className="mb-5 font-bold text-b1">비밀번호</p>
      <FormikProvider value={formik}>
        <Form className="space-y-10">
          <div className="lg:w-[730px] rounded border border-gray100 bg-white p-10 shadow-1 space-y-5">
            <FormRow label="비밀번호">
              <FormikInputBox
                name="password"
                className="block w-full"
                secure={true}
                placeholder="비밀번호를 입력해 주세요."
              />
            </FormRow>
            <FormRow label="비밀번호 확인">
              <FormikInputBox
                name="passwordConfirm"
                className="block w-full"
                secure={true}
                placeholder="비밀번호를 입력해 주세요."
              />
            </FormRow>
            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              비밀번호 변경하기
            </Button>
          </div>
        </Form>
      </FormikProvider>
      <AlertModal
        title="오류"
        message={errorModal.message}
        open={errorModal.show}
        onClose={handleErrorModalClose}
      />
      <AlertModal
        title="알림"
        message={modal.message}
        open={modal.show}
        onClose={hideModal}
      />
    </div>
  );
};

ChangePassword.defaultProps = {} as Partial<ChangePasswordProps>;

export default ChangePassword;

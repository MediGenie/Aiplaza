import { FormikProvider, useFormik, Form } from 'formik';
import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ApiError } from '../apis/api-error';
import { authApis } from '../apis/auth';
import { FindPwIlust } from '../assets';
import { UserType } from '../auth/type';
import { Button } from '../components/Button';
import { FormikInputBox } from '../components/FormikComponent';
import { useModalState } from '../hooks/useModalState';
import { useRouteState } from '../hooks/useRouteState';
import { AlertModal } from '../modals';
import { FindPwYup } from '../yups/find-pw.yup';

interface FidnPwProps {}

interface RouteState {
  type: UserType;
}

const FidnPw: FC<FidnPwProps> = () => {
  const routeState = useRouteState<RouteState>();
  const { props: modalProps, showModal } = useModalState();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values, helper) => {
      if (routeState?.type === undefined) {
        return helper.setSubmitting(false);
      }
      await authApis
        .resetPassword({
          email: values.email,
          type: routeState.type,
        })
        .then(() => {
          navigate('/find-pw/done', {
            state: {
              email: values.email,
            },
          });
        })
        .catch((e: ApiError) => {
          showModal(e.message);
        });
    },
    validationSchema: FindPwYup,
  });

  if (routeState?.type === undefined) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="py-20" style={{ minHeight: 792 }}>
      <AlertModal title="알림" {...modalProps} />
      <div className="container">
        <div
          className="mx-auto rounded bg-white p-10"
          style={{
            boxShadow: '0px 5px 18px 2px rgba(72, 72, 74, 0.1)',
            maxWidth: 408,
          }}
        >
          <img
            src={FindPwIlust}
            style={{ width: 120, height: 120 }}
            alt="비밀번호 찾기"
            className="mx-auto mb-5"
          />
          <div className="mb-10">
            <h1 className="mb-2.5 font-bold text-h2 text-center">
              비밀번호 찾기
            </h1>
            <p className="text-b3 text-gray800 text-center">
              입력하신 이메일 주소로 임시비밀번호가 발송됩니다.
            </p>
          </div>
          <FormikProvider value={formik}>
            <Form className="space-y-5">
              <FormikInputBox
                name="email"
                className="w-full"
                placeholder="아이디(이메일)을 입력해 주세요."
              />
              <Button
                className="w-full"
                type="submit"
                disabled={formik.isSubmitting || formik.dirty === false}
              >
                완료
              </Button>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default FidnPw;

import Axios from 'axios';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { authActionCreator } from '../../../@core/store/actions/authActions';
import { useAuthContext } from '../../../@core/store/hooks/useAuthContext';

const emailValidationSchema = yup.object().shape({
  email: yup.string().required('아이디를 다시 확인해주세요.'),
  password: yup.string().required('비밀번호를 다시 확인해주세요.'),
});

export default function useLoginHooks() {
  const [, authDispatch] = useAuthContext();
  const [modal, setModal] = useState({ show: false, message: '' });
  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, show: false }));
  }, []);

  const onSubmit = useCallback(async (values, helper) => {
    const { email, password } = values;
    try {
      const { data } = await Axios.post('/auth/login', {
        username: email,
        password,
      });
      authDispatch(authActionCreator.Login(data));
    } catch (e) {
      if (e.response) {
        if (e.response.data.type === 'username') {
          helper.setErrors({
            email: e.response.data.message,
          });
        } else if (e.response.data.type === 'password') {
          helper.setErrors({
            password: e.response.data.message,
          });
        } else {
          setModal({
            modal: true,
            message: e.response.data.message,
          });
        }
      } else {
        setModal({
          modal: true,
          message:
            '네트워크 통신에 문제가 발생하였습니다.\n잠시후에 다시 시도해주세요.',
        });
        // helper.setErrors({
        //   email:
        //     '네트워크 통신에 문제가 발생하였습니다.\n잠시후에 다시 시도해주세요.',
        // });
      }
    }
  }, []);
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: onSubmit,
    validationSchema: emailValidationSchema,
  });
  return { formik, modal, closeModal };
}

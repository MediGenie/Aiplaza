import * as yup from 'yup';
// import { passwordyup } from './sub/password.yup';

export const MyPasswordYup = yup.object().shape({
  password: yup.string().required('비밀번호를 입력해 주세요.'),
  // password: passwordyup,
  passwordConfirm: yup
    .string()
    .required('비밀번호를 입력해 주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
});

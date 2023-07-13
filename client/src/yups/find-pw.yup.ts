import * as yup from 'yup';

export const FindPwYup = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 입력해 주세요.')
    .required('아이디를 입력해 주세요.'),
});

import * as yup from 'yup';

export const InquireYup = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 입력해 주세요.')
    .required('이메일을 입력해 주세요.'),
    inquire: yup.string().required('문의내용을 작성해주세요')
});

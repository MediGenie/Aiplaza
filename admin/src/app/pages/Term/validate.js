import * as yup from 'yup';

export const termYup = yup.object().shape({
  content: yup.string().required('약관 내용을 입력해주세요.'),
});

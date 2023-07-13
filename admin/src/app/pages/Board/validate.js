import * as yup from 'yup';

const yupSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해 주세요'),
  content: yup.mixed().required('본문을 입력해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};
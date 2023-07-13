import * as yup from 'yup';

const yupSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해 주세요.'),
  category: yup.string().required('분야를 입력해 주세요.'),
  content: yup.string().required('내용을 입력해 주세요.'),
});

const updateSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해 주세요.'),
  category: yup.string().required('분야를 입력해 주세요.'),
  content: yup.string().required('내용을 입력해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: updateSchema,
};

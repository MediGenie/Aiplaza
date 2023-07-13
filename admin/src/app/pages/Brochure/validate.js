import * as yup from 'yup';

const yupSchema = yup.object().shape({
  title: yup.string().required('자료명을 입력해 주세요.'),
  file: yup.mixed().required('파일을 첨부해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

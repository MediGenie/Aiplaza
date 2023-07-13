import * as yup from 'yup';

const yupSchema = yup.object().shape({
  name: yup.string().required('사례명을 입력해주세요.'),
  file: yup.mixed().required('파일을 업로드해주세요. '),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

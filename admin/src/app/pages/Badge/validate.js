import * as yup from 'yup';

const yupSchema = yup.object().shape({
  name: yup.string().required('배지명을 입력해 주세요.'),
  image: yup.mixed().required('이미지를 추가해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

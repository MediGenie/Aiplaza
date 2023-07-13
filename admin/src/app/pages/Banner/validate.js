import * as yup from 'yup';

const yupSchema = yup.object().shape({
  image: yup.mixed().required('이미지를 추가해 주세요.'),
  mobile_image: yup.mixed().required('이미지를 추가해 주세요.'),
  badge: yup.mixed(),
  link: yup.string().url('URL형식으로 입력해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

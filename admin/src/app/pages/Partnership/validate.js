import * as yup from 'yup';

const yupSchema = yup.object().shape({
  name: yup.string().required('파트너명을 입력해 주세요.'),
  image: yup.mixed().required('이미지를 추가해 주세요.'),
  link: yup
    .string()
    .url('URL형식에 맞추어 입력해 주세요.')
    .required('연결 URL을 입력해 주세요.'),
  description: yup.string().required('소개를 입력해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

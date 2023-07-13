import * as yup from 'yup';

const yupSchema = yup.object().shape({
  title: yup.string().required('영상명을 입력해 주세요.'),
  thumbnail: yup.mixed().required('썸네일을 추가해 주세요.'),
  link: yup
    .string()
    .url('올바른 URL을 입력해 주세요.')
    .required('연결 URL을 입력해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

import * as yup from 'yup';

const youtubeYup = yup.object().shape({
  name: yup.string().required('영상명을 입력해 주세요.'),
  link: yup
    .string()
    .url('URL 형식으로 입력해 주세요.')
    .required('링크를 입력해 주세요.'),
});

export const validate = {
  create: youtubeYup,
  update: youtubeYup,
};

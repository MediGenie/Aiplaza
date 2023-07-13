import * as yup from 'yup';

const youtubeYup = yup.object().shape({
  name: yup.string().required('분야명을 입력해 주세요.'),
});

export const validate = {
  create: youtubeYup,
  update: youtubeYup,
};

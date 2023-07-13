import * as yup from 'yup';

const youtubeYup = yup.object().shape({
  name: yup.string().required('프로모션명을 입력해 주세요.'),

  start_at: yup.mixed().required('시작일을 선택해 주세요.'),
  end_at: yup.mixed().required('마감일을 선택해 주세요.'),
  type: yup.string().oneOf(['URL', 'MANUAL']).required('타입를 입력해 주세요.'),

  content: yup
    .string()
    .nullable()
    .when('type', {
      is: (type) => type === 'MANUAL',
      then: yup.string().required('내용을 입력해 주세요.'),
    }),
  link: yup
    .string()
    .nullable()
    .when('type', {
      is: (type) => type === 'URL',
      then: yup
        .string()
        .url('URL 형식으로 입력해 주세요.')
        .required('URL을 입력해 주세요.'),
    }),
});

export const validate = {
  create: youtubeYup,
  update: youtubeYup,
};

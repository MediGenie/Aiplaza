import * as yup from 'yup';

const schema = yup.object().shape(
  {
    title: yup
      .string()
      .max(50, '50자 이내의 공고명을 입력해 주세요.')
      .required('제목을 입력해 주세요.'),
    category: yup.string().required('분야를 입력해 주세요.'),
    link: yup
      .string()
      .url('올바른 URL을 입력해 주세요.')
      .required('채용공고 URL을 입력해 주세요.'),
    start_at: yup
      .date()
      .nullable()
      .when(['end_at'], {
        is: (end_at) => end_at instanceof Date,
        then: () =>
          yup
            .date()
            .nullable()
            .max(yup.ref('end_at'), '마감일 이전의 시작일을 선택해주세요.')
            .required('시작일을 선택해 주세요.'),
      })
      .required('시작일을 선택해 주세요.'),
    end_at: yup
      .date()
      .nullable()
      .when(['start_at'], {
        is: (start_at) => start_at instanceof Date,
        then: () =>
          yup
            .date()
            .nullable()
            .min(yup.ref('start_at'), '시작일 이후의 마감일을 선택해주세요.')
            .required('마감일을 선택해 주세요.'),
      })
      .required('마감일을 선택해 주세요.'),
  },
  ['start_at', 'end_at']
);

export const validate = {
  create: schema,
  update: schema,
};

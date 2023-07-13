import * as yup from 'yup';

const yupSchema = yup.object().shape({
  title: yup.string().required('기사제목을 입력해 주세요.'),
  written_at: yup.string().nullable().required('날짜를 선택해 주세요.'),
  link: yup
    .string()
    .url('올바른 URL을 입력해 주세요')
    .required('원문 URL을 입력해 주세요.'),
  company: yup.string().required('언론사를 입력해 주세요.'),
  writer: yup.string().required('기자명을 입력해 주세요.'),
  image: yup.mixed().required('이미지를 추가해 주세요.'),
  content: yup.string().required('내용을 입력해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

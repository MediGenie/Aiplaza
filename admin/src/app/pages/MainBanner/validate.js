import * as yup from 'yup';

const yupSchema = yup.object().shape({
  title: yup.string().required('배너명을 입력해주세요.'),
  image: yup.mixed().required('이미지를 추가해 주세요.'),
  mobile_image: yup.mixed().required('이미지를 추가해 주세요.'),
  link: yup.string().url('URL 형식에 맞추어 입력해주세요.'),
  main_text: yup.string(),
  sub_text: yup.string(),
});

export const validate = {
  create: yupSchema,
  update: yupSchema,
};

// 구글 네이버 다음 검색엔진
// 강다솜
// 배포는 다음주
// 로봇 파일 요청

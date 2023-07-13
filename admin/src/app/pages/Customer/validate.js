import * as yup from 'yup';

const yupSchema = yup.object().shape({});

const updateSchema = yup.object().shape({
  name: yup.string().required('필수 입력사항입니다.'),
  tel: yup
    .string()
    .matches(/[0-9]/g, '올바른 전화번호를 숫자만 입력해 주세요.')
    .required('올바른 전화번호를 숫자만 입력해 주세요.'),
  country: yup.string().required('필수 입력사항입니다.'),
  research_field: yup.string().required('필수 입력사항입니다.'),
  analysis_field: yup.string().required('필수 입력사항입니다.'),
  address: yup.string().required('필수 입력사항입니다.'),
  address_detail: yup.string().required('필수 입력사항입니다.'),
  interest_disease: yup.string().required('필수 입력사항입니다.'),
  interest_field: yup.string().required('필수 입력사항입니다.'),
  interest_video_mobility: yup.string().required('필수 입력사항입니다.'),
  interest_grade: yup.string().required('필수 입력사항입니다.'),
  biz_name: yup.string().required('필수 입력사항입니다.'),
  forecasts_number_per_month: yup.string().required('필수 입력사항입니다.'),
});

export const validate = {
  create: yupSchema,
  update: updateSchema,
};

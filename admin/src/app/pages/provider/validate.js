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
  info_type: yup.string().required('필수 입력사항입니다.'),
  domain_field: yup.string().required('필수 입력사항입니다.'),
  biz_type: yup.string().required('필수 입력사항입니다.'),
  service_type: yup.string().required('필수 입력사항입니다.'),
  service_subject: yup.string().required('필수 입력사항입니다.'),
  service_range: yup.string().required('필수 입력사항입니다.'),
  model_type: yup.string().required('필수 입력사항입니다.'),
  algorithm_program_type: yup.string().required('필수 입력사항입니다.'),
});

export const validate = {
  create: yupSchema,
  update: updateSchema,
};

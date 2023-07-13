import * as yup from 'yup';

export const i18nTextValidation = yup
  .object({
    eng: yup.string().min(1).required('필수 입력 항목 입니다.'),
    jap: yup.string().min(1).required('필수 입력 항목 입니다.'),
  })
  .required('필수');

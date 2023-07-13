import * as yup from 'yup';

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식에 맞게 입력해 주세요.')
    .required('필수 입력사항입니다.'),
  previous_amount: yup
    .number()
    .typeError('숫자를 입력해주세요.')
    .required('서비스 제공자 아이디를 검색해주세요.'),
  next_amount: yup
    .number()
    .typeError('숫자를 입력해주세요.')
    .required('변동 금액을 입력하고 완료를 눌러주세요.'),
  diff_amount: yup
    .number()
    .typeError('숫자를 입력해주세요.')
    .max(
      yup.ref('previous_amount'),
      '변동 금액은 변동 전 금액보다 작아야 합니다.',
    ),
  // note: yup.string().required('기타를 입력해 주세요.'),
});

const updateSchema = yup.object().shape({
  // note: yup.string().required('기타를 입력해 주세요.'),
});

export const validate = {
  create: yupSchema,
  update: updateSchema,
};

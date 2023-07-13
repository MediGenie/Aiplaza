import * as yup from 'yup';

const yupSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식에 맞게 입력해 주세요.')
    .required('필수 입력사항입니다.'),
  name: yup
    .string()
    .max(20, '관리자명은 20자를 초과할 수 없습니다.')
    .required('필수 입력사항입니다.'),
  // password: yup
  //   .string()
  //   .matches(
  //     /^(?=.*\d)(?=.*[!@*])([^\s]){6,20}$|^(?=.*\d)(?=.*[a-zA-Z])([^\s]){6,20}$|^(?=.*[a-zA-Z])(?=.*[!@*])([^\s]){6,20}$/,
  //     '비밀번호는 숫자와 영문자, 특수문자 중 2개 이상의 조합으로 6~20자를 입력해 주세요.'
  //   )
  //   .required(
  //     '비밀번호는 숫자와 영문자, 특수문자 중 2개 이상의 조합으로 6~20자를 입력해 주세요.'
  //   ),
  // password_check: yup
  //   .string()
  //   .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
  //   .required('비밀번호가 일치하지 않습니다.'),
});

const updateSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식에 맞게 입력해 주세요.')
    .required('필수 입력사항입니다.'),
  name: yup
    .string()
    .max(20, '관리자명은 20자를 초과할 수 없습니다.')
    .required('필수 입력사항입니다.'),
});

export const validate = {
  create: yupSchema,
  update: updateSchema,
};

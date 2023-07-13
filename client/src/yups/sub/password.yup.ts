import * as yup from 'yup';
import { PwRegExp } from '../yup-regexp';

export const passwordyup = yup
  .string()
  .matches(
    PwRegExp,
    '영문 및 숫자, 특수문자(!@#$^&+=)를 최소 1개씩 포함해야합니다.'
  )
  .min(8, '비밀번호는 8자 이상 입력해주세요.')
  .max(15, '비밀번호는 15자 이하로 입력해주세요.')
  .required('올바른 비밀번호를 입력해 주세요.');

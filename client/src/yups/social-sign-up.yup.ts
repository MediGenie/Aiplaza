import * as yup from "yup";

export const SocialSignUpYup = yup.object().shape({
  user_type: yup
    .string()
    .oneOf(["개인", "법인", "단체"])
    .required("유형을 선택해 주세요."),
  name: yup.string().required("이름을 입력해 주세요."),
  tel: yup
    .string()
    .matches(
      /^\d{2,3}-\d{3,4}-\d{4}$/,
      "전화번호 형식을 지켜주세요. 예) 000-0000-0000"
    )
    .required("전화번호를 입력해 주세요."),
  country: yup.string().required("국가를 입력해 주세요."),
  research_field: yup.string().required("연구분야를 선택해 주세요."),
  analysis_field: yup.string().required("분석분야를 선택해 주세요."),
  biz_cert: yup
    .mixed()

    .required("사업자 등록증을 업로드해 주세요.")
    .test("type", "파일이 pdf 형식이 아닙니다.", (value: File) => {
      return value?.type === "application/pdf";
    }),
  address: yup.string().required("주소를 입력해 주세요."),
  address_detail: yup.string().required("상세 주소를 입력해 주세요."),
  private_term: yup.boolean().isTrue("개인정보 처리방침에 동의해 주세요."),
  service_term: yup.boolean().isTrue("서비스 이용약관에 동의해 주세요."),
});

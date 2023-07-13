import { FC, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { Button } from "../components/Button";
import { FormRow } from "../components/FormRow";
import { useRouteState } from "../hooks/useRouteState";
import { FormikDropdown, FormikInputBox } from "../components/FormikComponent";
import { LogoBlue } from "../icons";
import { CheckBox } from "../components/CheckBox";
import { Radio } from "../components/Radio";
import { FileUpload } from "../components/FileUpload";
import { AddressInput } from "../components/AddressInput";
import { SignUpYup } from "../yups/sign-up.yup";
import { authApis } from "../apis/auth";
import { ApiError } from "../apis/api-error";
import { AlertModal } from "../modals";
import { UserType as AccountUserType } from "../auth/type";
import { useLocation, useNavigate } from "react-router-dom";
import { SocialType } from "../types/social.type";
import { SocialSignUpYup } from "../yups/social-sign-up.yup";

interface SignUpProps {}

type RouteState =
  | {
      method: "email";
      type: AccountUserType;
    }
  | {
      method: SocialType;
      type: AccountUserType;
      social_key: string;
    };

enum UserType {
  PERSONAL = "개인",
  BIZ = "법인",
  GROUP = "단체",
}

const researchField: Array<{ label: string; value: string }> = [
  { label: "생명공학", value: "생명공학" },
];
const analysisField: Array<{ label: string; value: string }> = [
  { label: "뇌분석", value: "뇌분석" },
];

interface Values {
  name: string;
  email?: string;
  password?: string;
  user_type: UserType | "";
  tel: string;
  country: string;
  private_term: boolean;
  service_term: boolean;
  biz_cert: File | null;
  address: string;
  address_detail: string;
  research_field: string;
  analysis_field: string;
}

const SignUpCore: FC<RouteState> = (routeState) => {
  const location = useLocation();
  const [errorModal, setErrorModal] = useState({ message: "", show: false });
  const navigate = useNavigate();
  const handleErrorModalClose = () => {
    setErrorModal((prev) => ({ ...prev, show: false }));
  };
  const formik = useFormik<Values>({
    initialValues: Object.assign(
      {
        country: "",
        name: "",
        tel: "",
        private_term: false,
        service_term: false,
        user_type: "",
        biz_cert: null,
        address: "",
        address_detail: "",
      } as Values,
      routeState.method === "email" ? { password: "", email: "" } : {}
    ) as Values,
    onSubmit: async (values, helper) => {
      if (routeState.method === "email") {
        if (values.biz_cert === null) {
          helper.setSubmitting(false);
          return helper.setFieldError(
            "biz_cert",
            "사업자 등록증을 업로드해 주세요."
          );
        }
        if (values.email === "" || typeof values.email === "undefined") {
          helper.setSubmitting(false);
          return helper.setFieldError("email", "이메일을 입력해 주세요.");
        }
        if (values.password === "" || typeof values.password === "undefined") {
          helper.setSubmitting(false);
          return helper.setFieldError("password", "비밀번호를 입력해 주세요.");
        }
        if (
          values.user_type === "" ||
          typeof values.user_type === "undefined"
        ) {
          helper.setSubmitting(false);
          return helper.setFieldError("user_type", "유형을 선택해 주세요.");
        }
        console.log(routeState.type);
        try {
          await authApis.signUpCredential({
            name: values.name,
            address: values.address,
            address_detail: values.address_detail,
            analysis_field: values.analysis_field,
            biz_cert: values.biz_cert,
            country: values.country,
            email: values.email,
            password: values.password,
            private_term: values.private_term,
            research_field: values.research_field,
            service_term: values.service_term,
            tel: values.tel,
            user_type: values.user_type,
            type: routeState.type,
          });
          helper.setSubmitting(false);
          navigate("/sign-up/done", {
            state: {
              type: routeState.type,
            },
            replace: true,
          });
        } catch (e: any) {
          const error = e as ApiError;
          if (error.type === "NORMAL") {
            setErrorModal({ message: error.message, show: true });
          }
          helper.setSubmitting(false);
        }
      } else {
        if (values.biz_cert === null) {
          helper.setSubmitting(false);
          return helper.setFieldError(
            "biz_cert",
            "사업자 등록증을 업로드해 주세요."
          );
        }
        if (
          values.user_type === "" ||
          typeof values.user_type === "undefined"
        ) {
          helper.setSubmitting(false);
          return helper.setFieldError("user_type", "유형을 선택해 주세요.");
        }
        console.log(routeState.type);
        try {
          await authApis.socialSignUpCredential({
            social_method: location.state.method,
            social_key: location.state.social_key,
            email: location.state.email,
            name: values.name,
            address: values.address,
            address_detail: values.address_detail,
            analysis_field: values.analysis_field,
            biz_cert: values.biz_cert,
            country: values.country,
            private_term: values.private_term,
            research_field: values.research_field,
            service_term: values.service_term,
            tel: values.tel,
            user_type: values.user_type,
            type: routeState.type,
          });
          helper.setSubmitting(false);
          navigate("/sign-up/done", {
            state: {
              type: routeState.type,
            },
            replace: true,
          });
        } catch (e: any) {
          const error = e as ApiError;
          if (error.type === "NORMAL") {
            setErrorModal({ message: error.message, show: true });
          }
          helper.setSubmitting(false);
        }
      }
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema:
      routeState.method === "email" ? SignUpYup : SocialSignUpYup,
  });
  const handleAllTerm = (next: boolean) => {
    formik.setValues({
      ...formik.values,
      private_term: next,
      service_term: next,
    });
  };
  const handlePrivateTerm = (next: boolean) => {
    formik.setFieldValue("private_term", next);
  };
  const handleServiceTerm = (next: boolean) => {
    formik.setFieldValue("service_term", next);
  };

  return (
    <div className="container-sm py-20">
      <img src={LogoBlue} className="h-10 mx-auto mb-5" alt="" />
      <h1 className="font-bold text-h2 text-center mb-10">회원가입</h1>
      <FormikProvider value={formik}>
        <Form className="space-y-10">
          <div className="rounded border border-gray100 bg-white p-10 shadow-1">
            <FormRow label="유형을 선택해 주세요." required>
              <Radio
                className="pt-2.5"
                value={formik.values.user_type}
                data={[
                  { label: UserType.PERSONAL, value: UserType.PERSONAL },
                  { label: UserType.BIZ, value: UserType.BIZ },
                  { label: UserType.GROUP, value: UserType.GROUP },
                ]}
                onChange={(next) => {
                  formik.setFieldValue("user_type", next);
                }}
              />
              {formik.errors.user_type && (
                <p className="error-msg mt-1.5">{formik.errors.user_type}</p>
              )}
            </FormRow>
          </div>
          <div className="rounded border border-gray100 bg-white p-10 shadow-1 space-y-5">
            <FormRow label="이름" required>
              <FormikInputBox
                name="name"
                className="block w-full"
                placeholder="이름을 입력해 주세요."
              />
            </FormRow>
            {routeState.method === "email" && (
              <>
                <FormRow label="아이디" required>
                  <FormikInputBox
                    name="email"
                    className="block w-full"
                    placeholder="아이디(이메일)을 입력해 주세요."
                  />
                </FormRow>
                <FormRow label="비밀번호" required>
                  <FormikInputBox
                    name="password"
                    className="block w-full"
                    placeholder="비밀번호를 입력해 주세요."
                    secure
                  />
                </FormRow>
              </>
            )}
            <FormRow label="전화번호" required>
              <FormikInputBox
                className="block w-full"
                placeholder="전화번호를 입력해 주세요."
                name="tel"
              />
            </FormRow>
            <FormRow label="국가" required>
              <FormikInputBox
                className="block w-full"
                placeholder="국가를 입력해 주세요."
                name="country"
              />
            </FormRow>
            <FormRow label="연구/분석분야" required>
              <div className="mb-[5px]">
                <FormikDropdown
                  data={researchField}
                  className="w-full"
                  placeholder="연구분야를 선택해 주세요."
                  name="research_field"
                />
              </div>
              <FormikDropdown
                data={analysisField}
                className="w-full"
                placeholder="분석분야를 선택해 주세요."
                name="analysis_field"
              />
            </FormRow>
            <FormRow label="사업자 등록증" required>
              <FileUpload
                accept="application/pdf"
                onChange={(file) => formik.setFieldValue("biz_cert", file)}
                selected_file={formik.values.biz_cert}
              />
              {formik.errors.biz_cert && (
                <p className="error-msg">{formik.errors.biz_cert}</p>
              )}
            </FormRow>
            <FormRow label="주소" required className="pb-5">
              <AddressInput
                address={formik.values.address}
                address_detail={formik.values.address_detail}
                onChangeAddress={(next: string) =>
                  formik.setFieldValue("address", next)
                }
                address_error={formik.errors.address}
                address_detail_error={formik.errors.address_detail}
                onChangeAddressDetail={(next: string) =>
                  formik.setFieldValue("address_detail", next)
                }
              />
            </FormRow>
            <div className="pb-5">
              <div className="flex items-center space-x-2.5 mb-5">
                <CheckBox
                  value={
                    formik.values.private_term && formik.values.service_term
                  }
                  onChange={handleAllTerm}
                />
                <p className="font-bold text-b2">모든 이용약관에 동의합니다.</p>
              </div>
              <li className="list-none ml-8 mb-2.5">
                <div className="flex items-center space-x-2.5">
                  <CheckBox
                    value={formik.values.private_term}
                    onChange={handlePrivateTerm}
                  />
                  <p className="text-gray800 text-b2">
                    개인정보 처리방침에 동의합니다.
                    <span className="text-blue500">*</span>
                  </p>
                </div>
                {formik.errors.private_term && (
                  <p className="error-msg">{formik.errors.private_term}</p>
                )}
              </li>
              <li className="list-none ml-8">
                <div className="flex items-center space-x-2.5">
                  <CheckBox
                    value={formik.values.service_term}
                    onChange={handleServiceTerm}
                  />
                  <p className="text-gray800 text-b2">
                    서비스 이용약관에 동의합니다.
                    <span className="text-blue500">*</span>
                  </p>
                </div>
                {formik.errors.service_term && (
                  <p className="error-msg">{formik.errors.service_term}</p>
                )}
              </li>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              회원가입
            </Button>
          </div>
        </Form>
      </FormikProvider>

      <AlertModal
        title="오류"
        message={errorModal.message}
        open={errorModal.show}
        onClose={handleErrorModalClose}
      />
    </div>
  );
};

const SignUp: FC<SignUpProps> = () => {
  const routeState = useRouteState<RouteState>();

  return <SignUpCore {...routeState} key={JSON.stringify(routeState)} />;
};

export default SignUp;

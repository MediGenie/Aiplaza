import { Form, FormikProvider, useFormik } from "formik";
import { FC, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../../../apis/api-error";
import { authApis } from "../../../apis/auth";
import { mypageApis } from "../../../apis/mypage";
import { useAuthDispatch, useAuthValue } from "../../../auth/hooks";
import { AddressInput } from "../../../components/AddressInput";
import { Button } from "../../../components/Button";
import {
  FormikDropdown,
  FormikInputBox,
} from "../../../components/FormikComponent";
import { FormRow } from "../../../components/FormRow";
import { Radio } from "../../../components/Radio";
import { AlertModal } from "../../../modals";
import { MyInfoYup } from "../../../yups/my-info.yup";
import ChangePassword from "./component/ChangePassword";
import ServiceInfo from "./component/ServiceInfo";

interface MyinfoProps {}

const researchField: Array<{ label: string; value: string }> = [
  { label: "생명공학", value: "생명공학" },
];
const analysisField: Array<{ label: string; value: string }> = [
  { label: "뇌분석", value: "뇌분석" },
];

interface Values {
  user_type: string;
  name: string;
  tel: string;
  country: string;
  research_field: string;
  analysis_field: string;
  address: string;
  address_detail: string;
}

enum UserType {
  PERSONAL = "개인",
  BIZ = "법인",
  GROUP = "단체",
}

const Myinfo: FC<MyinfoProps> = () => {
  const [errorModal, setErrorModal] = useState({ message: "", show: false });
  const [withdrawlModal, setWithdrawlModal] = useState({
    show: false,
    message: "",
  });
  const [modal, setModal] = useState({ show: false, message: "" });
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const dispatch = useAuthDispatch();
  const handleErrorModalClose = () => {
    setErrorModal((prev) => ({ ...prev, show: false }));
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  const hideWithdrawlModal = () => {
    setWithdrawlModal((prev) => ({ ...prev, show: false }));
  };
  const handleWithdrawl = async () => {
    try {
      await authApis.withdrawl().then(() => {
        window.location.reload();
      });
    } catch (e: any) {
      const error = e as ApiError;
      if (error.type === "NORMAL") {
        setErrorModal({ message: error.message, show: true });
      }
    }
    setWithdrawlModal((prev) => ({ ...prev, show: false }));
  };
  const formik = useFormik<Values>({
    initialValues: {
      user_type: "개인",
      name: "",
      tel: "",
      country: "",
      research_field: "",
      analysis_field: "",
      address: "",
      address_detail: "",
    },
    onSubmit: async (values, helper) => {
      try {
        await mypageApis.patchMyInfo({
          user_type: values.user_type,
          name: values.name,
          tel: values.tel,
          country: values.country,
          research_field: values.research_field,
          analysis_field: values.analysis_field,
          address: values.address,
          address_detail: values.address_detail,
        });
        helper.setSubmitting(false);
        setModal({ show: true, message: "계정정보가 수정되었습니다" });
      } catch (e: any) {
        const error = e as ApiError;
        if (error.type === "NORMAL") {
          setErrorModal({ message: error.message, show: true });
        }
        helper.setSubmitting(false);
      }
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: MyInfoYup,
  });

  useLayoutEffect(() => {
    let mounted = true;
    if (user?._id) {
      mypageApis
        .getMyInfo()
        .then((res) => {
          if (mounted) {
            formik.resetForm({
              values: res,
            });
          }
        })
        .catch((e: ApiError) => {
          if (mounted) {
            setErrorModal({ message: e.message, show: true });
          }
        });
    } else {
      setErrorModal({ message: "정상적인 접근이 아닙니다.", show: true });
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  return (
    <div className="container-sm py-20 space-y-10">
      <div>
        <p className="mb-5 font-bold text-b1">계정정보</p>
        <FormikProvider value={formik}>
          <Form className="space-y-10">
            <div className="lg:w-[730px] rounded border border-gray100 bg-white p-10 shadow-1 space-y-5">
              <FormRow label="유형">
                <Radio
                  className="mt-[-3px] w-full"
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
              <FormRow label="이름">
                <FormikInputBox
                  name="name"
                  className="block w-full"
                  placeholder="이름을 입력해 주세요."
                />
              </FormRow>
              <FormRow label="전화번호">
                <FormikInputBox
                  className="block w-full"
                  placeholder="전화번호를 입력해 주세요."
                  name="tel"
                />
              </FormRow>
              <FormRow label="국가">
                <FormikInputBox
                  className="block w-full"
                  placeholder="국가를 입력해 주세요."
                  name="country"
                />
              </FormRow>
              <FormRow label="연구/분석분야">
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
              <FormRow label="주소" className="pb-5">
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
              <Button
                type="submit"
                className="w-full"
                disabled={formik.isSubmitting}
              >
                수정하기
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <ChangePassword />
      <ServiceInfo />
      <div className="flex">
        <button
          className="ml-auto"
          onClick={() => setWithdrawlModal({ show: true, message: "탈퇴" })}
        >
          <p className="text-b2 text-gray600">회원탈퇴</p>
        </button>
      </div>
      <AlertModal
        title="오류"
        message={errorModal.message}
        open={errorModal.show}
        onClose={handleErrorModalClose}
      />
      <AlertModal
        title="알림"
        message={modal.message}
        open={modal.show}
        onClose={hideModal}
      />
      <AlertModal
        title="회원탈퇴"
        message={
          <>
            <p>탈퇴하시겠습니까?</p>
            <p>탈퇴 시 모든 정보는 복구되지 않습니다.</p>
          </>
        }
        open={withdrawlModal.show}
        confirmFunc={handleWithdrawl}
        onClose={hideWithdrawlModal}
        confirmText="탈퇴"
      />
    </div>
  );
};

Myinfo.defaultProps = {} as Partial<MyinfoProps>;

export default Myinfo;

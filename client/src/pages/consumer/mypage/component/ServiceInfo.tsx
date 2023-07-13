import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useLayoutEffect } from 'react';
import { ApiError } from '../../../../apis/api-error';
import { mypageApis } from '../../../../apis/mypage';
import { Button } from '../../../../components/Button';
import { FormikInputBox } from '../../../../components/FormikComponent';
import { FormRow } from '../../../../components/FormRow';
import { useState } from 'react';
import { MyPasswordYup } from '../../../../yups/my-password.yup';
import { AlertModal } from '../../../../modals';
import { FileUpload } from '../../../../components/FileUpload';
import { useAuthValue } from '../../../../auth/hooks';

interface Values {
  biz_regist_cert_file: File | null;
  interest_disease: string;
  interest_field: string;
  interest_video_mobility: string;
  interest_grade: string;
  biz_name: string;
  forecasts_number_per_month: string;
}

interface ServiceInfoProps {}

const ServiceInfo: FC<ServiceInfoProps> = () => {
  const { user } = useAuthValue();
  const [edit, setEdit] = useState(false);
  const [errorModal, setErrorModal] = useState({ message: '', show: false });
  const [modal, setModal] = useState({ show: false, message: '' });
  const handleErrorModalClose = () => {
    setErrorModal((prev) => ({ ...prev, show: false }));
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  const formik = useFormik<Values>({
    initialValues: {
      interest_disease: '',
      interest_field: '',
      interest_video_mobility: '',
      interest_grade: '',
      biz_name: '',
      biz_regist_cert_file: null,
      forecasts_number_per_month: '',
    } as Values,
    onSubmit: async (values, helper) => {
      try {
        if (values.biz_regist_cert_file !== null) {
          await mypageApis.changeServiceInfo({
            interest_disease: values.interest_disease,
            interest_field: values.interest_field,
            interest_video_mobility: values.interest_video_mobility,
            interest_grade: values.interest_grade,
            biz_name: values.biz_name,
            biz_regist_cert_file:
              values.biz_regist_cert_file instanceof File
                ? values.biz_regist_cert_file
                : null,
            forecasts_number_per_month: values.forecasts_number_per_month,
          });
        }
        setModal({ show: true, message: '서비스 정보가 변경되었습니다' });
        setEdit(false);
        helper.setSubmitting(false);
      } catch (e: any) {
        const error = e as ApiError;
        if (error.type === 'NORMAL') {
          setErrorModal({ message: error.message, show: true });
        }
        helper.setSubmitting(false);
      }
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    // validationSchema: MyPasswordYup,
  });

  useLayoutEffect(() => {
    let mounted = true;
    if (user?._id) {
      mypageApis
        .getServiceInfo()
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
      setErrorModal({ message: '정상적인 접근이 아닙니다.', show: true });
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  return (
    <div>
      <p className="mb-5 font-bold text-b1">서비스 정보</p>
      <FormikProvider value={formik}>
        <Form className="space-y-10">
          <div className="lg:w-[730px] rounded border border-gray100 bg-white p-10 shadow-1 space-y-5">
            <FormRow label="관심질환">
              <FormikInputBox
                name="interest_disease"
                className="block w-full"
                disabled={!edit}
                placeholder="관심질환을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="관심영역">
              <FormikInputBox
                name="interest_field"
                className="block w-full"
                disabled={!edit}
                placeholder="관심영역을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="관심 영상 모빌리티">
              <FormikInputBox
                name="interest_video_mobility"
                className="block w-full"
                disabled={!edit}
                placeholder="관심 영상 모빌리티를 입력해 주세요."
              />
            </FormRow>
            <FormRow label="등급">
              <FormikInputBox
                name="interest_grade"
                className="block w-full"
                disabled={!edit}
                placeholder="등급을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="법인명(사업체명)">
              <FormikInputBox
                name="biz_name"
                className="block w-full"
                disabled={!edit}
                placeholder="법인명(사업체명)을 입력해 주세요."
              />
            </FormRow>
            {edit ? (
              <FormRow label="등록증" required>
                <FileUpload
                  accept="application/pdf"
                  onChange={(file) =>
                    formik.setFieldValue('biz_regist_cert_file', file)
                  }
                  selected_file={formik.values.biz_regist_cert_file}
                />
                {formik.errors.biz_regist_cert_file && (
                  <p className="error-msg">
                    {formik.errors.biz_regist_cert_file}
                  </p>
                )}
              </FormRow>
            ) : (
              <FormRow label="등록증">
                <FormikInputBox
                  name="biz_regist_cert_file.name"
                  className="block w-full"
                  disabled
                />
              </FormRow>
            )}
            <FormRow label="서비스 월 예측건수">
              <FormikInputBox
                name="forecasts_number_per_month"
                className="block w-full"
                disabled={!edit}
                placeholder="서비스 월 예측건수를 입력해 주세요."
              />
            </FormRow>
            {edit && (
              <Button
                type="submit"
                className="w-full"
                disabled={formik.isSubmitting}
              >
                서비스 정보 변경하기
              </Button>
            )}
            {!edit && (
              <Button
                type="button"
                className="w-full"
                onClick={() => setEdit(true)}
                disabled={formik.isSubmitting}
              >
                수정하기
              </Button>
            )}
          </div>
        </Form>
      </FormikProvider>
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
    </div>
  );
};

ServiceInfo.defaultProps = {} as Partial<ServiceInfoProps>;

export default ServiceInfo;

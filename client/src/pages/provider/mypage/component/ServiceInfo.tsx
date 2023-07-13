import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useLayoutEffect } from 'react';
import { ApiError } from '../../../../apis/api-error';
import { mypageApis } from '../../../../apis/mypage';
import { Button } from '../../../../components/Button';
import { FormikInputBox } from '../../../../components/FormikComponent';
import { FormRow } from '../../../../components/FormRow';
import { useState } from 'react';
import { AlertModal } from '../../../../modals';
import { useAuthValue } from '../../../../auth/hooks';

interface Values {
  type: string;
  domain_field: string;
  biz_type: string;
  service_type: string;
  service_subject: string;
  service_range: string;
  model_type: string;
  algorithm_program_type: string;
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
      type: '',
      domain_field: '',
      biz_type: '',
      service_type: '',
      service_subject: '',
      service_range: '',
      model_type: '',
      algorithm_program_type: '',
    } as Values,
    onSubmit: async (values, helper) => {
      try {
        await mypageApis.changeProviderServiceInfo({
          type: values.type,
          domain_field: values.domain_field,
          biz_type: values.biz_type,
          service_type: values.service_type,
          service_subject: values.service_subject,
          service_range: values.service_range,
          model_type: values.model_type,
          algorithm_program_type: values.algorithm_program_type,
        });
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
  });

  useLayoutEffect(() => {
    let mounted = true;
    if (user?._id) {
      mypageApis
        .getProviderServiceInfo()
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
            <FormRow label="기관 유형">
              <FormikInputBox
                name="type"
                className="block w-full"
                disabled={!edit}
                placeholder="기관 유형을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="전문 분야">
              <FormikInputBox
                name="domain_field"
                className="block w-full"
                disabled={!edit}
                placeholder="전문 분야을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="사업체 유형">
              <FormikInputBox
                name="biz_type"
                className="block w-full"
                disabled={!edit}
                placeholder="사업체 유형을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="서비스 유형">
              <FormikInputBox
                name="service_type"
                className="block w-full"
                disabled={!edit}
                placeholder="서비스 유형을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="서비스 대상">
              <FormikInputBox
                name="service_subject"
                className="block w-full"
                disabled={!edit}
                placeholder="서비스 대상을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="서비스 범위">
              <FormikInputBox
                name="service_range"
                className="block w-full"
                disabled={!edit}
                placeholder="서비스 범위를 입력해 주세요."
              />
            </FormRow>
            <FormRow label="모델 유형">
              <FormikInputBox
                name="model_type"
                className="block w-full"
                disabled={!edit}
                placeholder="모델 유형을 입력해 주세요."
              />
            </FormRow>
            <FormRow label="알고리듬 프로그램 유형">
              <FormikInputBox
                name="algorithm_program_type"
                className="block w-full"
                disabled={!edit}
                placeholder="알고리듬 프로그램 유형을 입력해 주세요."
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

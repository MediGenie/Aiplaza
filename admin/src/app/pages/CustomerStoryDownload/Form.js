import React, { useCallback, useState } from 'react';
import { Form, useFormik, FormikProvider } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import { FormikTextInput, TextInput } from '../components/form/TextInput';
import { useCoreContext } from '../../../@core/CMS/useCoreContext';
import { VerifyOtpModal } from '../../Otp/VerifyOtpModal';
import { useRouteMatch } from 'react-router-dom';
import DefaultModal from '../../../@core/components/Modals';
import { IndustryEnumToStr } from '../Inquiry/enumToStr';

const initDataPropTypes = PropTypes.shape({});
const initData = {};

function FormComponent({ initialData, validate }) {
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openError, setOpenError] = useState(false);
  const service = useCoreContext();
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: () => {
      // NOTHING
    },
    validationSchema: validate,
  });

  const route = useRouteMatch();

  const handleCloseOtp = useCallback(() => {
    setOpenOtp(false);
  }, []);
  const handleOpenOtp = useCallback(() => {
    setOpenOtp(true);
  }, []);
  const handleSubmit = useCallback(
    async (otp_token) => {
      try {
        const response = await service.getOne(route.params._id, otp_token);
        // 성공처리
        await formik.setValues(response);
        setOpenOtp(false);
        setVerifyOtp(true);
      } catch (e) {
        // 실패처리
        setOpenError(true);
      }
    },
    [formik, route.params._id, service]
  );

  return (
    <>
      {verifyOtp === false && (
        <div className="text-right">
          <Button color="primary" type="button" onClick={handleOpenOtp}>
            마스킹 해제하기
          </Button>
          <VerifyOtpModal
            open={openOtp}
            onClose={handleCloseOtp}
            onSubmit={handleSubmit}
          />
          <DefaultModal
            headerMessage="오류"
            bodyMessage="인증에 실패하였습니다."
            ButtonMessage="닫기"
            isOpen={openError}
            closeFunc={() => setOpenError(false)}
          />
        </div>
      )}
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextInput label="사례명" name="title" disabled />
              <FormikTextInput label="다운로드일" name="created_at" disabled />
              <FormikTextInput label="성명" name="name" disabled />
              <FormikTextInput label="회사명" name="company" disabled />
              <TextInput
                label="업종"
                name="industry"
                value={IndustryEnumToStr[formik.values.industry] || '알수없음'}
                disabled
              />
              <FormikTextInput label="부서" name="department" disabled />
              <FormikTextInput label="이메일" name="email" disabled />
              <FormikTextInput label="연락처" name="phone" disabled />
              <FormikTextInput
                label="마케팅 활용에 대한 수집 · 이용 동의"
                name="marketting_agree"
                disabled
              />
            </Form>
          </FormikProvider>
        </CardBody>
      </Card>
    </>
  );
}

FormComponent.propTypes = {
  formType: PropTypes.string,
  initialData: initDataPropTypes,
  onSubmit: PropTypes.func,
  disableEdit: PropTypes.bool,
  validate: PropTypes.any,
};

FormComponent.defaultProps = {
  formType: 'detail',
  initialData: initData,
  onSubmit: () => {},
  disableEdit: false,
};

export default FormComponent;

import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import FormikTextInput from '../components/form/TextInput/FormikTextInput';
import FormikFileDownloaderWithFileName from '../components/form/FileDownload/FormikFileDownloaderWithFilleName';
import { statusListData } from './status.category';
import { FormikDropdown } from '../components/form/Dropdown';
import { userTypeListData } from './user.type.category';
import FormikFileInput from '../components/form/FileInput/FormikFileInput';

const initDataPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  status: PropTypes.boolean,
  type: PropTypes.string,
  name: PropTypes.string,
  user_type: PropTypes.string,
  email: PropTypes.string,
  tel: PropTypes.string,
  country: PropTypes.string,
  research_field: PropTypes.string,
  analysis_field: PropTypes.string,
  biz_regist_cert_file: PropTypes.array,
  address: PropTypes.string,
  address_detail: PropTypes.string,
  created_at: PropTypes.string,
  info_type: PropTypes.string,
  domain_field: PropTypes.string,
  biz_type: PropTypes.string,
  service_type: PropTypes.string,
  service_subject: PropTypes.string,
  service_range: PropTypes.string,
  model_type: PropTypes.string,
  algorithm_program_type: PropTypes.string,
  total_revenue: PropTypes.string,
  total_withdrawer: PropTypes.string,
  rest_revenue: PropTypes.string,
});
const initData = {
  _id: '',
  status: false,
  type: '',
  name: '',
  user_type: '',
  email: '',
  tel: '',
  country: '',
  research_field: '',
  analysis_field: '',
  biz_regist_cert_file: [],
  address: '',
  address_detail: '',
  created_at: '',
  number_of_service: '',
  info_type: '',
  domain_field: '',
  biz_type: '',
  service_type: '',
  service_subject: '',
  service_range: '',
  model_type: '',
  algorithm_program_type: '',
  total_revenue: '',
  total_withdrawer: '',
  rest_revenue: '',
};

function FormComponent({
  formType,
  initialData,
  onSubmit,
  disableEdit,
  validate,
}) {
  const match = useRouteMatch();
  const history = useHistory();
  const editUrl = useMemo(() => {
    return `${match.url}/edit`;
  }, [match]);
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const submitToServer = useCallback(
    (values) => {
      const formdata = new FormData();
      formdata.append('status', values.status);
      formdata.append('name', values.name);
      formdata.append('user_type', values.user_type);
      formdata.append('tel', values.tel);
      formdata.append('country', values.country);
      formdata.append('research_field', values.research_field);
      formdata.append('analysis_field', values.analysis_field);
      if (values.biz_regist_cert_file instanceof File) {
        formdata.append('biz_regist_cert_file', values.biz_regist_cert_file);
      }
      formdata.append('address', values.address);
      formdata.append('address_detail', values.address_detail);
      formdata.append('info_type', values.info_type);
      formdata.append('domain_field', values.domain_field);
      formdata.append('biz_type', values.biz_type);
      formdata.append('service_type', values.service_type);
      formdata.append('service_subject', values.service_subject);
      formdata.append('service_range', values.service_range);
      formdata.append('model_type', values.model_type);
      formdata.append('algorithm_program_type', values.algorithm_program_type);

      onSubmit(formdata);
    },
    [onSubmit],
  );
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: submitToServer,
    validationSchema: validate,
  });

  return (
    <>
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextInput label="회원분류" name="type" disabled />
              <FormikDropdown
                label="상태"
                name="status"
                list={statusListData}
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="이름"
                name="name"
                disabled={formType !== 'edit'}
              />
              <FormikDropdown
                label="분류"
                name="user_type"
                list={userTypeListData}
                disabled={formType !== 'edit'}
              />
              <FormikTextInput label="아이디(이메일)" name="email" disabled />
              <FormikTextInput
                label="전화번호"
                name="tel"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="국가"
                name="country"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="연구분야"
                name="research_field"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="분석분야"
                name="analysis_field"
                disabled={formType !== 'edit'}
              />
              {formType !== 'edit' ? (
                <FormikFileDownloaderWithFileName
                  label="사업자등록증"
                  name="biz_regist_cert_file"
                />
              ) : (
                <FormikFileInput
                  label="사업자등록증"
                  name="biz_regist_cert_file"
                  disabled={formType !== 'edit'}
                  accept="application/pdf"
                />
              )}
              <FormikTextInput
                label="주소"
                name="address"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="상세주소"
                name="address_detail"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput label="회원가입일" name="created_at" disabled />
              <FormikTextInput
                label="기관 유형"
                name="info_type"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="전문 분야"
                name="domain_field"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="사업체 유형"
                name="biz_type"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="서비스 유형"
                name="service_type"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="서비스 대상"
                name="service_subject"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="서비스 범위"
                name="service_range"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="모델 유형"
                name="model_type"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="알고리듬 프로그램 유형"
                name="algorithm_program_type"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="등록한 서비스 개수"
                name="number_of_service"
                disabled
              />
              <FormikTextInput label="총 수익" name="total_revenue" disabled />
              <FormikTextInput
                label="총 인출액"
                name="total_withdrawer"
                disabled
              />
              <FormikTextInput label="잔액" name="rest_revenue" disabled />

              <button type="submit" id="form-submit-btn" hidden>
                submit
              </button>
            </Form>
          </FormikProvider>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end mt-3">
        {formType === 'detail' && (
          <>
            {disableEdit === false && (
              <Link to={editUrl}>
                <Button
                  style={{ fontSize: '1.15em' }}
                  color="windows"
                  className="mr-2"
                >
                  수정
                </Button>
              </Link>
            )}
          </>
        )}
        {formType !== 'detail' && (
          <>
            <label
              style={{ fontSize: '1.15em', height: 37 }}
              color="windows"
              className="btn btn-windows mr-2"
              htmlFor="form-submit-btn"
            >
              {formType === 'edit' ? '저장' : '등록'}
            </label>
            <button
              onClick={onCancel}
              style={{ fontSize: '1.15em', height: 37 }}
              className="btn btn-secondary mr-2"
            >
              취소
            </button>
          </>
        )}
      </div>
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

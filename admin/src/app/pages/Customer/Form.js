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
  interest_disease: PropTypes.string,
  interest_field: PropTypes.string,
  interest_video_mobility: PropTypes.string,
  interest_grade: PropTypes.string,
  biz_name: PropTypes.string,
  forecasts_number_per_month: PropTypes.string,
  total_payment: PropTypes.string,
  total_pay_service: PropTypes.string,
  total_use_service: PropTypes.string,
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
  interest_disease: '',
  interest_field: '',
  interest_video_mobility: '',
  interest_grade: '',
  biz_name: '',
  forecasts_number_per_month: '',
  total_payment: '',
  total_pay_service: '',
  total_use_service: '',
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
      formdata.append('interest_disease', values.interest_disease);
      formdata.append('interest_field', values.interest_field);
      formdata.append(
        'interest_video_mobility',
        values.interest_video_mobility,
      );
      formdata.append('interest_grade', values.interest_grade);
      formdata.append('biz_name', values.biz_name);
      formdata.append(
        'forecasts_number_per_month',
        values.forecasts_number_per_month,
      );

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
                label="관심 질환"
                name="interest_disease"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="관심 영역"
                name="interest_field"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="관심 영상 모딜리티"
                name="interest_video_mobility"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="등급"
                name="interest_grade"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="법인명(사업체명)"
                name="biz_name"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="서비스 월 예측건수"
                name="forecasts_number_per_month"
                disabled={formType !== 'edit'}
              />
              <FormikTextInput
                label="구매 서비스 개수"
                name="total_payment"
                disabled
              />
              <FormikTextInput
                label="이용 서비스 개수"
                name="total_pay_service"
                disabled
              />
              <FormikTextInput
                label="총 결제액"
                name="total_use_service"
                disabled
              />
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

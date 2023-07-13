import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import FormikTextInput from '../components/form/TextInput/FormikTextInput';
import Axios from 'axios';
import FormikFileDownloaderWithFileName from '../components/form/FileDownload/FormikFileDownloaderWithFilleName';

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
};

function FormComponent({ initialData, onSubmit, validate }) {
  const history = useHistory();
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const submitToServer = useCallback(
    (values) => {
      const data = {
        email: values.email,
        name: values.name,
      };
      onSubmit(data);
    },
    [onSubmit],
  );
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: submitToServer,
    validationSchema: validate,
  });

  const permissionHandler = async (permission) => {
    const blockURl = `/permission`;
    await Axios.patch(blockURl, { _ids: [formik.values._id], permission });
    location.reload();
  };

  return (
    <>
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextInput label="회원분류" name="type" disabled />
              <FormikTextInput label="이름" name="name" disabled />
              <FormikTextInput label="분류" name="user_type" disabled />
              <FormikTextInput label="아이디(이메일)" name="email" disabled />
              <FormikTextInput label="전화번호" name="tel" disabled />
              <FormikTextInput label="국가" name="country" disabled />
              <FormikTextInput
                label="연구분야"
                name="research_field"
                disabled
              />
              <FormikTextInput
                label="분석분야"
                name="analysis_field"
                disabled
              />
              <FormikFileDownloaderWithFileName
                label="사업자등록증"
                name="biz_regist_cert_file"
              />
              <FormikTextInput label="주소" name="address" disabled />
              <button type="submit" id="form-submit-btn" hidden>
                submit
              </button>
            </Form>
          </FormikProvider>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end mt-3">
        <>
          {formik.values.status === '승인대기' && (
            <>
              <Button
                className="mx-1 cell-button mr-1"
                color="primary"
                onClick={() => permissionHandler(true)}
              >
                승인
              </Button>
              <Button
                className="mx-1 cell-button mr-1"
                color="danger"
                onClick={() => permissionHandler(false)}
              >
                거절
              </Button>
            </>
          )}
          <button
            onClick={onCancel}
            style={{ fontSize: '1.15em', height: 37 }}
            className="btn btn-secondary mr-2"
          >
            취소
          </button>
        </>
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

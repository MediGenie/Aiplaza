import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import { FormikImageUpload } from '../components/form/ImageUpload';
import { FormikTextInput } from '../components/form/TextInput';
import FormikTextArea from '../components/form/TextArea/FormikTextArea';

const initDataPropTypes = PropTypes.shape({
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.any,
  mobile_image: PropTypes.any,
  main_text: PropTypes.string,
  sub_text: PropTypes.string,
});
const initData = {
  title: '',
  link: '',
  image: null,
  mobile_image: null,
  main_text: '',
  sub_text: '',
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
  const disabled = useMemo(() => {
    return formType === 'detail';
  }, [formType]);

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const submitToServer = useCallback(
    (values) => {
      const formdata = new FormData();
      if (values.image instanceof File) {
        formdata.append('image', values.image);
        formdata.append('width', values.image.width);
        formdata.append('height', values.image.height);
      }
      if (values.mobile_image instanceof File) {
        formdata.append('mobile_image', values.mobile_image);
        formdata.append('mobile_width', values.mobile_image.width);
        formdata.append('mobile_height', values.mobile_image.height);
      }
      formdata.append('title', values.title);
      formdata.append('link', values.link);
      formdata.append('main_text', values.main_text);
      formdata.append('sub_text', values.sub_text);

      onSubmit(formdata);
    },
    [onSubmit]
  );

  return (
    <>
      <Card className="my-3 custom-card">
        <CardBody>
          <Formik
            initialValues={initialData}
            onSubmit={submitToServer}
            validationSchema={validate}
          >
            <Form className="mb-2" autoComplete="off">
              <FormikTextInput
                label="배너명*"
                name="title"
                disabled={disabled}
                placeholder="배너명을 입력하세요."
              />
              <FormikImageUpload
                label="이미지 정보*"
                name="image"
                disabled={disabled}
                description="1920*940 권장"
              />
              <FormikImageUpload
                label="모바일 이미지 정보*"
                name="mobile_image"
                disabled={disabled}
                description="1170*1746 권장"
              />
              <FormikTextInput
                label="연결 URL"
                name="link"
                disabled={disabled}
                placeholder="URL을 입력하세요."
              />
              <FormikTextArea
                label="메인 문구"
                name="main_text"
                disabled={disabled}
                description="#LB#{내용}# 혹은 #YELLOW#{내용}# 형식으로 입력하시면, 색을 부여할 수 있습니다."
                placeholder="메인문구를 입력하세요."
              />
              <FormikTextArea
                label="서브 문구"
                name="sub_text"
                disabled={disabled}
                description="#LB#{내용}# 혹은 #YELLOW#{내용}# 형식으로 입력하시면, 색을 부여할 수 있습니다."
                placeholder="서브문구를 입력하세요."
              />
              <button type="submit" id="form-submit-btn" hidden>
                submit
              </button>
            </Form>
          </Formik>
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

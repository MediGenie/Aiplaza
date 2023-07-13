import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, useFormik, FormikProvider } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import { FormikImageUpload } from '../components/form/ImageUpload';
import FormikTextArea from '../components/form/TextArea/FormikTextArea';

const initDataPropTypes = PropTypes.shape({
  name: PropTypes.string,
  image: PropTypes.any,
});
const initData = {
  name: '',
  image: null,
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

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: (values) => {
      const formdata = new FormData();
      if (values.image instanceof File) {
        formdata.append('image', values.image);
        formdata.append('width', values.image.width);
        formdata.append('height', values.image.height);
      }
      formdata.append('name', values.name);
      onSubmit(formdata);
    },
    validationSchema: validate,
  });

  return (
    <>
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextArea
                label="배지명*"
                name="name"
                disabled={formType === 'detail'}
                placeholder="배지명을 입력해 주세요."
                maxLength={50}
              />
              <FormikImageUpload
                label="이미지 정보*"
                name="image"
                disabled={formType === 'detail'}
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

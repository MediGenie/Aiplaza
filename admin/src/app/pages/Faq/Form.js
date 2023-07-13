import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@core/components';

import { FormikTextInput } from '../components/form/TextInput';
import { FormikRichEditor } from '../components/form/RichTextEditor';

const initDataPropTypes = PropTypes.shape({
  title: PropTypes.string,
  category: PropTypes.string,
  content: PropTypes.string,
});
const initData = {
  title: '',
  category: '',
  content: '',
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
      const { title, category, content } = values;
      onSubmit({ title, category, content });
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
                label="제목*"
                name="title"
                disabled={formType === 'detail'}
                placeholder="제목을 입력해 주세요."
              />
              <FormikTextInput
                label="분야*"
                name="category"
                disabled={formType === 'detail'}
                placeholder="분야를 입력해 주세요."
              />
              <FormikRichEditor
                label="내용*"
                name="content"
                disabled={formType === 'detail'}
              />
              <button type="submit" id="form-submit-btn" hidden></button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end mt-3">
        {formType === 'detail' && (
          <>
            {disableEdit === false && (
              <Link
                to={editUrl}
                style={{ fontSize: '1.15em' }}
                className="btn btn-primary mr-2"
              >
                수정
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

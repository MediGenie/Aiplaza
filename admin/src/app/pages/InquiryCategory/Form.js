import React, { useCallback, useMemo } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Form, useFormik, FormikProvider } from 'formik';
import { FormikTextInput, TextInput } from '../components/form/TextInput';
import { dateFormatter } from '../../../@core/routes/components/fomatters';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import FormRow from '../components/form/FormRow';
import FormikToggleInput from '../components/form/ToggleInput/FormikToggleInput';

const initDataPropTypes = PropTypes.shape({
  name: PropTypes.string,
  isPublish: PropTypes.bool,
  updated_at: PropTypes.string,
});
const initData = {
  name: '',
  isPublish: false,
};

export default function FormComponent({
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
  const updatedAt = useMemo(() => {
    if (initialData.updated_at) {
      return dateFormatter(initialData.updated_at);
    }
    return null;
  }, [initialData.updated_at]);
  const formik = useFormik({
    initialValues: {
      name: initialData.name,
      isPublish: initialData.isPublish,
    },
    onSubmit: async (values, helper) => {
      const data = {
        name: values.name,
        isPublish: values.isPublish,
      };
      await onSubmit(data);
      helper.setSubmitting(false);
    },
    validationSchema: validate,
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <Card>
            <CardBody>
              {typeof formik.values.updated_at !== 'undefined' && (
                <TextInput
                  value={dateFormatter(formik.values.updated_at)}
                  disabled
                  label="수정일"
                />
              )}
              {updatedAt && (
                <FormRow label="수정일">
                  <p>{updatedAt}</p>
                </FormRow>
              )}
              <FormikTextInput
                name="name"
                label="분야명*"
                disabled={formType === 'detail'}
                placeholder="분야명을 입력해 주세요."
              />
              <FormikToggleInput
                name="isPublish"
                label="노출"
                disabled={formType === 'detail'}
              />
            </CardBody>
          </Card>
          <div className="d-flex justify-content-end mt-3">
            {formType === 'detail' && disableEdit === false && (
              <Link to={editUrl} className="btn btn-primary mr-2">
                수정
              </Link>
            )}
            {formType !== 'detail' && (
              <>
                <Button
                  type="submit"
                  color="primary"
                  className="mr-2"
                  style={{ fontSize: '1.15em', height: 37 }}
                  disabled={formik.isSubmitting || !formik.dirty}
                >
                  {formType === 'edit' ? '저장' : '등록'}
                </Button>
                <button
                  onClick={onCancel}
                  style={{ fontSize: '1.15em', height: 37 }}
                  className="btn btn-secondary mr-2"
                  type="button"
                >
                  취소
                </button>
              </>
            )}
          </div>
        </Form>
      </FormikProvider>
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

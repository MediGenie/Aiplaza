import React, { useCallback, useMemo } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Form, useFormik, FormikProvider } from 'formik';
import { FormikTextInput, TextInput } from '../components/form/TextInput';
import { dateFormatter } from '../../../@core/routes/components/fomatters';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

const initDataPropTypes = PropTypes.shape({
  name: PropTypes.string,
  link: PropTypes.string,
});
const initData = {
  name: '',
  link: '',
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
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: async (values, helper) => {
      const data = {
        name: values.name,
        link: values.link,
      };
      await onSubmit(data);
      helper.setSubmitting(false);
    },
    validationSchema: validate,
  });
  console.log('type', formType, disableEdit);

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
              <FormikTextInput
                name="name"
                label="영상명*"
                disabled={formType === 'detail'}
                placeholder="영상명을 입력해 주세요."
              />
              <FormikTextInput
                name="link"
                label="링크*"
                disabled={formType === 'detail'}
                placeholder="링크를 입력해 주세요."
              />
            </CardBody>
          </Card>
          <div className="d-flex justify-content-end mt-3">
            {formType === 'detail' && disableEdit !== true && (
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

import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import { FormikImageUpload } from '../components/form/ImageUpload';
import { FormikTextInput, TextInput } from '../components/form/TextInput';
import { dateFormat } from '../../../@core/utils/dateFormat';

const initDataPropTypes = PropTypes.shape({
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.any,
  created_at: PropTypes.string,
});
const initData = {
  title: '',
  link: '',
  image: null,
  created_at: '',
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
      const data = new FormData();
      data.append('title', values.title);
      if (values.thumbnail instanceof File) {
        data.append('thumbnail', values.thumbnail);
        data.append('width', values.thumbnail.width);
        data.append('height', values.thumbnail.height);
      }
      data.append('link', values.link);
      onSubmit(data);
    },
    [onSubmit]
  );
  const createdAt = useMemo(() => {
    const time = initialData.created_at;
    if (time) {
      return dateFormat(time);
    }
    return '-';
  }, [initialData.created_at]);

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
              {formType === 'detail' && (
                <TextInput label="등록일" value={createdAt} disabled />
              )}
              <FormikTextInput
                label="영상명*"
                name="title"
                disabled={formType === 'detail'}
                placeholder="영상명을 입력해 주세요."
              />
              <FormikImageUpload
                label="이미지 정보*"
                name="thumbnail"
                disabled={formType === 'detail'}
              />
              <FormikTextInput
                label="연결 URL*"
                name="link"
                disabled={formType === 'detail'}
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

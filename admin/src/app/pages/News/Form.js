import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import { FormikImageUpload } from '../components/form/ImageUpload';
import { FormikTextInput } from '../components/form/TextInput';
import FormikTextArea from '../components/form/TextArea/FormikTextArea';
import FormikDateInput from '../components/form/DateInput/FormikDateInput';
import FormikRichEditor from '../components/form/RichTextEditor/FormikRichEditor';

const initDataPropTypes = PropTypes.shape({
  title: PropTypes.string,
  written_at: PropTypes.any,
  link: PropTypes.string,
  company: PropTypes.string,
  writer: PropTypes.string,
  image: PropTypes.any,
  content: PropTypes.string,
});
const initData = {
  title: '',
  written_at: null,
  link: '',
  company: '',
  writer: '',
  image: null,
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
      const formdata = new FormData();
      console.log('contetn', values.content);

      formdata.append('title', values.title);
      formdata.append('written_at', values.written_at);
      formdata.append('link', values.link);
      formdata.append('company', values.company);
      formdata.append('writer', values.writer);
      formdata.append('content', values.content);
      if (values.image instanceof File) {
        formdata.append('image', values.image);
        formdata.append('width', values.image.width);
        formdata.append('height', values.image.height);
      }

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
                label="기사제목*"
                name="title"
                disabled={formType === 'detail'}
                placeholder="기사제목을 입력해 주세요."
              />
              <FormikDateInput
                label="날짜*"
                name="written_at"
                disabled={formType === 'detail'}
              />
              <FormikTextInput
                label="원문 URL*"
                name="link"
                disabled={formType === 'detail'}
                placeholder="원문 URL을 입력해 주세요."
              />
              <FormikTextInput
                label="언론사*"
                name="company"
                disabled={formType === 'detail'}
                placeholder="언론사를 입력해 주세요."
              />
              <FormikTextInput
                label="기자명*"
                name="writer"
                disabled={formType === 'detail'}
                placeholder="기자명을 입력해 주세요."
              />
              <FormikImageUpload
                label="이미지 정보*"
                name="image"
                disabled={formType === 'detail'}
              />
              <FormikRichEditor
                label="기사내용*"
                name="content"
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

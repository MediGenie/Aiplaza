import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@core/components';

import { FormikTextInput } from '../components/form/TextInput';
import { FormikDropdown } from '../components/form/Dropdown';
import { recruitListData } from './recruit.category';
import FormikDateInput from '../components/form/DateInput/FormikDateInput';

const initDataPropTypes = PropTypes.shape({
  title: PropTypes.string,
  category: PropTypes.string,
  link: PropTypes.string,
  start_at: PropTypes.any,
  end_at: PropTypes.any,
});
const initData = {
  title: '',
  category: 'new_recruits',
  link: '',
  start_at: null,
  end_at: null,
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
  const disabeld = useMemo(() => {
    if (formType === 'detail') {
      return true;
    }
    if (formType === 'create') {
      return false;
    }
    if (disableEdit === false && formType !== 'edit') {
      return true;
    }
    return false;
  }, [disableEdit, formType]);
  const editUrl = useMemo(() => {
    return `${match.url}/edit`;
  }, [match]);

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const submitToServer = useCallback(
    (values) => {
      const { title, category, link, start_at, end_at } = values;
      onSubmit({ title, category, link, start_at, end_at });
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
                label="공고명*"
                name="title"
                disabled={disabeld}
                placeholder="공고명을 입력해 주세요."
              />
              <FormikDropdown
                label="분류*"
                name="category"
                list={recruitListData}
                disabled={disabeld}
              />
              <FormikTextInput
                label="채용공고 URL*"
                name="link"
                disabled={disabeld}
                placeholder="채용공고 URL을 입력해 주세요."
              />
              <FormikDateInput
                label="시작일*"
                name="start_at"
                placeholder="YYYY.MM.DD(요일) HH:mm"
                withTime
                disabled={disabeld}
              />
              <FormikDateInput
                label="마감일*"
                name="end_at"
                placeholder="YYYY.MM.DD(요일) HH:mm"
                withTime
                disabled={disabeld}
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

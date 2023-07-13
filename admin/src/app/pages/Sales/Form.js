import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import FormikTextInput from '../components/form/TextInput/FormikTextInput';
import moment from 'moment-timezone';
import { FormikTextInputWithButton } from '../components/TextInputWithButton';
import ModalSearchProvider from '../../../@core/components/ModalSearchProvider';
import DefaultModalWithCancel from '../../../@core/components/ModalsWithCancel';

const initDataPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  email: PropTypes.string,
  type: PropTypes.string,
  created_at: PropTypes.string,
  previous_amount: PropTypes.number,
  diff_amount: PropTypes.number,
  next_amount: PropTypes.number,
  note: PropTypes.string,
});
const initData = {
  _id: '',
  email: '',
  type: '',
  created_at: moment.tz(new Date(), 'Asia/Seoul').format('YYYY.MM.DD'),
  previous_amount: 0,
  diff_amount: 0,
  next_amount: 0,
  note: '',
};

function FormComponent({
  formType,
  initialData,
  onSubmit,
  disableEdit,
  validate,
}) {
  const [searchModal, setSearchModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selected, setSelected] = useState('');
  const [diff, setDiff] = useState(0);
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
      if (formType === 'edit') {
        const data = {
          note: values.note,
        };
        onSubmit(data);
      } else if (formType === 'create') {
        const data = {
          owner: selected,
          previous_amount: values.previous_amount,
          next_amount: values.next_amount,
          diff_amount: parseInt(values.diff_amount, 10),
          note: values.note,
        };
        onSubmit(data);
      }
    },
    [formType, onSubmit, selected],
  );
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: submitToServer,
    validationSchema: validate,
  });

  const handleComplete = () => {
    const prev = formik.values.previous_amount;
    const diff = formik.values.diff_amount;
    if (prev < diff) {
      return;
    } else {
      setDiff(diff);
      formik.setFieldValue('next_amount', prev - diff);
    }
  };

  useEffect(() => {
    if (diff !== 0 && diff !== formik.values.diff_amount) {
      formik.setFieldError(
        'diff_amount',
        '변동금액이 변경되었습니다. 다시 완료를 눌러주세요.',
      );
    }
  }, [diff, formik, formik.values.diff_amount]);

  return (
    <>
      <DefaultModalWithCancel
        headerMessage="알림"
        bodyMessage={
          <>
            등록한 후에는 수정하거나 삭제할 수 없습니다.
            <br />
            <br />
            등록하시겠습니까?
          </>
        }
        ButtonMessage="등록"
        cancelMessage="취소"
        isOpen={showCreateModal}
        closeFunc={() => setShowCreateModal(false)}
        onCloseEvent={() => formik.handleSubmit()}
      />
      <ModalSearchProvider
        isOpen={searchModal}
        setIsOpen={setSearchModal}
        setState={setSelected}
        setEmail={(val) => formik.setFieldValue('email', val)}
        setServiceOwnerData={(val) =>
          formik.setFieldValue('previous_amount', val)
        }
      />
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextInputWithButton
                label="서비스 제공자 아이디(이메일)"
                name="email"
                func={() => setSearchModal(true)}
                disabledInput={true}
                buttonName="검색"
                disabledButton={formType !== 'create'}
                hideButton={formType !== 'create'}
              />
              {formType === 'create' && (
                <FormikTextInput label="정산일" name="created_at" disabled />
              )}
              {formType !== 'create' && (
                <FormikTextInput label="종류" name="type" disabled />
              )}
              <FormikTextInput
                label="변동 전 금액"
                name="previous_amount"
                disabled
              />
              <FormikTextInputWithButton
                label={formType === 'create' ? '변동 금액' : '변동액(정산액)'}
                name="diff_amount"
                func={handleComplete}
                disabledInput={formType !== 'create'}
                buttonName="완료"
                disabledButton={formType !== 'create'}
                hideButton={formType !== 'create'}
              />
              <FormikTextInput
                label="변동 후 금액"
                name="next_amount"
                disabled
              />
              {formType === 'edit' && (
                <FormikTextInput label="날짜" name="created_at" disabled />
              )}
              <FormikTextInput
                label="기타"
                name="note"
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
              // htmlFor="form-submit-btn"
              onClick={() => setShowCreateModal(true)}
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

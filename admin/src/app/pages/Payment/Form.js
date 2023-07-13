import React, { useCallback, useMemo, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import FormikTextInput from '../components/form/TextInput/FormikTextInput';
import Axios from 'axios';
import DefaultModalWithCancel from '../../../@core/components/ModalsWithCancel';
import { FormikTextInputWithButton } from '../components/TextInputWithButton';

const initDataPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  buyer: PropTypes.string,
  email: PropTypes.string,
  //TODO: 추후 status 변경 필요
  status: PropTypes.string,
  method: PropTypes.string,
  amount: PropTypes.string,
  payment_at: PropTypes.string,
});
const initData = {
  _id: '',
  name: '',
  buyer: '',
  email: '',
  status: '',
  method: '',
  amount: '',
  payment_at: '',
};

function FormComponent({
  formType,
  initialData,
  onSubmit,
  disableEdit,
  validate,
}) {
  const [cancelModal, setCancelModal] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();

  const cancelHandler = () => {
    const data = {
      id: match.params._id,
    };
    Axios.patch(`/payment`, data)
      .then(() => {
        location.reload();
      })
      .catch((e) => {
        console.log(e)
      });
  };
  const editUrl = useMemo(() => {
    return `${match.url}/edit`;
  }, [match]);
  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const submitToServer = useCallback(
    (values) => {
      const data = {
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
  console.log(formik.values.status)
  return (
    <>
      <DefaultModalWithCancel
        headerMessage="알림"
        bodyMessage={
          <>
            해당 결제를 취소하시겠습니까?
            <br />
            취소 시 데이터 복구는 불가능합니다.
          </>
        }
        ButtonMessage="확인"
        cancelMessage="취소"
        isOpen={cancelModal}
        closeFunc={() => setCancelModal(false)}
        onCloseEvent={cancelHandler}
      />
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextInput label="서비스 명" name="name" disabled />
              <FormikTextInput label="구매자" name="buyer" disabled />
              <FormikTextInput
                label="구매자 아이디(이메일)"
                name="email"
                disabled
              />
              <FormikTextInput label="결제상태" name="status" disabled />
              <FormikTextInput label="결제방법" name="method" disabled />
              <FormikTextInput label="결제금액" name="amount" disabled />
              <FormikTextInput label="결제일" name="payment_at" disabled />
              {/* hidden={formik.values.status !== "결제완료"} */}
              {initialData.status === "결제완료" ? <FormikTextInputWithButton
                label="결제취소"
                name="status"
                func={setCancelModal}
                buttonName="결제취소"
                disabledInput={formType !== 'create'}
                // disabledButton={formType !== 'create'}
                placeholder="이메일을 입력해 주세요."
                noshowingInput={true}
              //hideButton={formType !== 'create'}
              /> : <></>}

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
            <button
              onClick={onCancel}
              style={{ fontSize: '1.15em', height: 37 }}
              className="btn btn-secondary mr-2"
            >
              취소
            </button>
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
  onSubmit: () => { },
  disableEdit: false,
};

export default FormComponent;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import FormikTextInput from '../components/form/TextInput/FormikTextInput';
import Axios from 'axios';
import { NotificationModal } from '../../../@core/components/Modals';
import { FormikTextInputWithButton } from '../components/TextInputWithButton';
import DefaultModal, { ConfirmModal } from '../../../@core/components/Modals';


const initDataPropTypes = PropTypes.shape({
  email: PropTypes.string,
  name: PropTypes.string,
});
const initData = {
  email: '',
  name: '',
};

function FormComponent({
  formType,
  initialData,
  onSubmit,
  disableEdit,
  validate,
}) {
  const [pass, setPass] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passEmail, setPassEmail] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const params = useParams();
  const handleOpen = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);
  const handleRemove = useCallback(async () => {
    await Axios.delete(`/staff/${params._id}`)
      .then(() => {
        handleClose()
        setErrorModalOpen(true);
        history.goBack();
      })
      .catch((e) => {
        setErrorMessage(e.message);
        setErrorModalOpen(true);
        throw e;
      });
  }, [handleClose]);
  const [modalinfo, setModalinfo] = useState({
    show: false,
    message: '',
  });
  const closeModal = useCallback(() => {
    setModalinfo((prev) => ({ ...prev, show: false }));
  }, []);
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
      const data = {
        email: values.email,
        name: values.name,
      };
      if (formType === 'create') {
        if (!pass) {
          setErrorMessage('중복체크를 진행해주세요.');
          setErrorModalOpen(true);
          return;
        }
      }
      onSubmit(data);
    },
    [formType, onSubmit, pass],
  );
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: submitToServer,
    validationSchema: validate,
  });

  const handleDuplicationCheck = async () => {
    if (formik.values.email) {
      await Axios.post('/staff/duplication-check', {
        user_id: formik.values.email,
      })
        .then(() => {
          setPass(true);
          setPassEmail(formik.values.email);
          setErrorModalOpen(true);
        })
        .catch((e) => {
          setPass(false);
          const message =
            e?.response?.data?.message || '입금확인이 실패했습니다.';
          setErrorMessage(message);
          setErrorModalOpen(true);
          throw e;
        });
    }
  };

  useEffect(() => {
    if (passEmail !== formik.values.email || passEmail.length === 0) {
      setPass(false);
    }
  }, [formik.values.email, passEmail]);

  return (
    <>
      <DefaultModal
        headerMessage="알림"
        bodyMessage={modalinfo.message}
        ButtonMessage="확인"
        isOpen={modalinfo.show}
        closeFunc={closeModal}
      />
      <NotificationModal
        successMessage="중복되지 않은 이메일입니다."
        failedMessage={errorMessage}
        isOpen={errorModalOpen}
        isSuccess={pass}
        closeFunc={() => setErrorModalOpen(false)}
        onSuccessEvent={() => { }}
      />
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <FormikTextInputWithButton
                label="이메일"
                name="email"
                func={handleDuplicationCheck}
                disabledInput={formType !== 'create'}
                buttonName="중복체크"
                disabledButton={formType !== 'create'}
                placeholder="이메일을 입력해 주세요."
                hideButton={formType !== 'create'}
              />
              <FormikTextInput
                label="이름"
                name="name"
                disabled={formType === 'detail'}
                placeholder="이름을 입력해 주세요."
              />
              <button type="submit" id="form-submit-btn" hidden>
                submit
              </button>
            </Form>
          </FormikProvider>
        </CardBody>
      </Card>
      <ConfirmModal
        headerMessage="관리자 계정 삭제"
        bodyMessage={
          <>
            <p>삭제 후에는 데이터 복구가 불가능합니다.</p>
            <p>항목을 삭제하시겠습니까?</p>
          </>
        }
        isOpen={openDeleteModal}
        cancelButtonMessage="취소"
        okButtonMessage="삭제"
        onCancelButtonHandler={handleClose}
        onOkButtonHandler={handleRemove}
        setIsOpen={handleClose}
      />
      <div className="d-flex justify-content-end mt-3">
        {formType === 'detail' && (
          <>
            {disableEdit === false && (
              <>
                <Button type="button" onClick={handleOpen} color="danger" style={{ margin: '0px 10px 0px 0px', fontSize: '1.15em' }}>
                  삭제
                </Button>
                <Link to={editUrl}>
                  <Button
                    style={{ fontSize: '1.15em' }}
                    color="windows"
                    className="mr-2"
                  >
                    수정
                  </Button>
                </Link>

              </>
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
  onSubmit: () => { },
  disableEdit: false,
};

export default FormComponent;

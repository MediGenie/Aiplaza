import React, { useCallback, useReducer } from 'react';
import { Container } from '@core/components';
import { HeaderMain } from '@core/routes/components/HeaderMain';
import PropTypes from 'prop-types';
import DefaultModal, { NotificationModal } from '@core/components/Modals';
import { useHistory } from 'react-router-dom';
import BaseService from '../../api/base.service';
import { useCoreContext } from './useCoreContext';

const initialModalProps = {
  visible: false,
  bodyMessage: '',
};

function ModalReducer(prevState, action) {
  switch (action.type) {
    case 'SHOW': {
      return {
        visible: true,
        bodyMessage: action.payload,
      };
    }
    case 'CLOSE': {
      return initialModalProps;
    }
    default: {
      console.warn('ModalReducer - 유효하지 않은 입력입니다.');
      return prevState;
    }
  }
}

const initialNotiModalProps = {
  visible: false,
  isSuccess: null,
  message: '',
};

function NotiModalReducer(prevState, action) {
  switch (action.type) {
    case 'LOADING': {
      return {
        visible: true,
        isSuccess: null,
        message: '',
      };
    }
    case 'SUCCESS': {
      return {
        visible: true,
        isSuccess: true,
        message: '',
      };
    }
    case 'FAILED': {
      return {
        visible: true,
        isSuccess: false,
        message: action.payload,
      };
    }
    case 'CLOSE': {
      return initialNotiModalProps;
    }
    default: {
      console.warn('NotiModalReducer - 유효하지 않은 입력입니다.');
      return prevState;
    }
  }
}

function Create({ Form, validate, header }) {
  const history = useHistory();
  const [modalState, modalDispatch] = useReducer(
    ModalReducer,
    initialModalProps
  );
  const [notiModalState, notiModalDispatch] = useReducer(
    NotiModalReducer,
    initialNotiModalProps
  );
  const service = useCoreContext();

  const onSubmit = useCallback(
    (data) => {
      notiModalDispatch({ type: 'LOADING' });

      service
        .create(data)
        .then(() => {
          notiModalDispatch({ type: 'SUCCESS' });
        })
        .catch((e) => {
          console.log('test', e);
          const message =
            e?.response?.data?.message || '항목을 등록하지 못하였습니다.';
          notiModalDispatch({ type: 'FAILED', payload: message });
        });
    },
    [service]
  );

  const closeModal = useCallback(() => {
    modalDispatch({ type: 'CLOSE' });
  }, []);
  const closeNotiModal = useCallback(() => {
    notiModalDispatch({ type: 'CLOSE' });
  }, []);
  const onNotiModalSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <Container className="list-container">
      <HeaderMain
        title={`${
          header.includes(' 관리') ? header.replace(' 관리', '') : header
        } 등록`}
        className="mb-4 mt-2"
      />
      <Container>
        <Form
          formType="create"
          onSubmit={onSubmit}
          apiName={service.apiName}
          validate={validate}
        />
      </Container>
      <DefaultModal
        isOpen={modalState.visible}
        ButtonMessage="닫기"
        headerMessage="글 작성 오류"
        bodyMessage={modalState.bodyMessage}
        closeFunc={closeModal}
      />
      <NotificationModal
        successMessage="등록이 완료되었습니다."
        failedMessage={notiModalState.message}
        isOpen={notiModalState.visible}
        isSuccess={notiModalState.isSuccess}
        closeFunc={closeNotiModal}
        onSuccessEvent={onNotiModalSuccess}
      />
    </Container>
  );
}

Create.propTypes = {
  Form: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  validate: PropTypes.func,
  header: PropTypes.string,
  service: PropTypes.instanceOf(BaseService),
};
Create.defaultProps = {
  validate: () => {},
  header: '',
};

export default Create;

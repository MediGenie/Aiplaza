import React, { useState, useEffect, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@core/components';
import { HeaderMain } from '@core/routes/components/HeaderMain';
import { useHistory, useRouteMatch } from 'react-router-dom';
import DefaultModal, { NotificationModal } from '@core/components/Modals';
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
};

function NotiModalReducer(prevState, action) {
  switch (action.type) {
    case 'LOADING': {
      return {
        visible: true,
        isSuccess: null,
      };
    }
    case 'SUCCESS': {
      return {
        visible: true,
        isSuccess: true,
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

function Edit({ Form, validate, header }) {
  const [isReady, setIsReady] = useState(false);
  const [data, setIsData] = useState(null);
  const match = useRouteMatch();
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
    async (data) => {
      const { _id } = match.params;

      notiModalDispatch({ type: 'LOADING' });
      service
        .update(_id, data)
        .then(() => {
          notiModalDispatch({ type: 'SUCCESS' });
        })
        .catch((e) => {
          const message =
            e?.response?.data?.message || '항목을 수정하지 못하였습니다.';
          notiModalDispatch({ type: 'FAILED', payload: message });
        });
    },
    [match.params, service]
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

  const fetchData = useCallback(
    (_id) => {
      service
        .getOne(_id)
        .then((row) => {
          setIsData(row);
          setIsReady(true);
        })
        .catch(() => {
          console.debug('error');
          modalDispatch({ type: 'SHOW', payload: '잘못된 접근입니다.' });
        });
    },
    [service]
  );

  useEffect(() => {
    const { _id } = match.params;
    fetchData(_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // match, apiName

  if (!isReady)
    return (
      <>
        <DefaultModal
          isOpen={modalState.visible}
          ButtonMessage="닫기"
          headerMessage="404 오류"
          bodyMessage="잘못된 접근입니다."
          closeFunc={closeModal}
          onCloseEvent={() => history.goBack()}
        />
      </>
    );

  return (
    <Container className="list-container">
      <HeaderMain
        title={`${
          header.includes(' 관리') ? header.replace(' 관리', '') : header
        } 수정`}
        className="mb-4 mt-2"
      />
      <Container>
        <Form
          formType="edit"
          initialData={data}
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
        successMessage="저장이 완료되었습니다."
        failedMessage={notiModalState.message}
        isOpen={notiModalState.visible}
        isSuccess={notiModalState.isSuccess}
        closeFunc={closeNotiModal}
        onSuccessEvent={onNotiModalSuccess}
      />
    </Container>
  );
}

Edit.propTypes = {
  Form: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  header: PropTypes.string,
  service: PropTypes.instanceOf(BaseService),
};

Edit.defaultProps = {
  header: '',
};

export default Edit;

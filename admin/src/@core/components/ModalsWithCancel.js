import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function DefaultModalWithCancel({
  headerMessage,
  bodyMessage,
  ButtonMessage,
  cancelMessage,
  isOpen,
  closeFunc,
  onCloseEvent,
}) {
  const toggle = useCallback(() => {
    closeFunc(false);
    if (onCloseEvent) {
      onCloseEvent();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={() => closeFunc(false)}>
      <ModalHeader tag="h6">{headerMessage}</ModalHeader>
      <ModalBody style={{ whiteSpace: 'break-spaces' }}>
        {bodyMessage}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          {ButtonMessage}
        </Button>
        <Button onClick={() => closeFunc(false)}>{cancelMessage}</Button>
      </ModalFooter>
    </Modal>
  );
}

DefaultModalWithCancel.propTypes = {
  headerMessage: PropTypes.string,
  bodyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  ButtonMessage: PropTypes.string,
  cancelMessage: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
  onCloseEvent: PropTypes.func,
};
DefaultModalWithCancel.defaultProps = {
  headerMessage: '',
  bodyMessage: '',
  cancelMessage: '',
  ButtonMessage: '확인',
  onCloseEvent: () => { },
};

function Loading() {
  return <div className="custom-loader" />;
}

function Failed() {
  return (
    <div
      className="swal2-icon swal2-error swal2-animate-error-icon"
      style={{ display: 'flex' }}
    >
      <span className="swal2-x-mark">
        <span className="swal2-x-mark-line-left"></span>
        <span className="swal2-x-mark-line-right"></span>
      </span>
    </div>
  );
}

function Success() {
  return (
    <div
      className="swal2-icon swal2-success swal2-animate-success-icon"
      style={{ display: 'flex' }}
    >
      <div
        className="swal2-success-circular-line-left"
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      ></div>
      <span className="swal2-success-line-tip"></span>
      <span className="swal2-success-line-long"></span>
      <div className="swal2-success-ring"></div>
      <div
        className="swal2-success-fix"
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      ></div>
      <div
        className="swal2-success-circular-line-right"
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      ></div>
    </div>
  );
}

export function NotificationModal({
  successMessage,
  failedMessage,
  isSuccess, // null === 로딩, true === 성공, false === 실패
  isOpen,
  closeFunc,
  onSuccessEvent,
}) {
  const close = useCallback(() => {
    if (isSuccess === true) {
      onSuccessEvent();
    }
    closeFunc();
  }, [isOpen, isSuccess]);

  useEffect(() => {
    let timeout = null;
    if (isSuccess !== null && isOpen === true) {
      timeout = setTimeout(() => {
        close();
      }, 2500);
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [isSuccess, isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader />
      <ModalBody className="text-center px-5">
        {isSuccess == null && <Loading />}
        {isSuccess == true && (
          <>
            <Success />
            {successMessage}
          </>
        )}
        {isSuccess == false && (
          <>
            <Failed />
            {failedMessage}
          </>
        )}
      </ModalBody>
      <ModalBody />
    </Modal>
  );
}
NotificationModal.propTypes = {
  successMessage: PropTypes.string,
  failedMessage: PropTypes.string,
  isSuccess: PropTypes.oneOf([null, true, false]),
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
  onSuccessEvent: PropTypes.func,
};
NotificationModal.defaultProps = {
  successMessage: '',
  failedMessage: '',
  isSuccess: null,
  onSuccessEvent: () => { },
};

export function ConfirmModal({
  isOpen,
  setIsOpen,
  headerMessage,
  bodyMessage,
  okButtonMessage,
  cancelButtonMessage,
  onOkButtonHandler,
  onCancelButtonHandler,
}) {
  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalHeader tag="h6">{headerMessage}</ModalHeader>
      <ModalBody>{bodyMessage}</ModalBody>
      <ModalFooter>
        <Button onClick={onCancelButtonHandler}>{cancelButtonMessage}</Button>
        <Button color="danger" onClick={onOkButtonHandler}>
          {okButtonMessage}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
ConfirmModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  headerMessage: PropTypes.string,
  bodyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  okButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
  isSuccess: PropTypes.oneOf([null, true, false]),
  onOkButtonHandler: PropTypes.func,
  onCancelButtonHandler: PropTypes.func,
};

export const PhotoModal = ({ url, isOpen, toggle }) => {
  const onToggle = useCallback(() => {
    if (url !== '') toggle((prev) => !prev);
  }, [url, toggle]);
  return (
    <Modal size="lg" isOpen={isOpen} toggle={onToggle}>
      <ModalHeader tag="h6">자세히 보기</ModalHeader>
      <ModalBody>
        <img src={url} width="100%" />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onToggle}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};
PhotoModal.propTypes = {
  url: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

export default DefaultModalWithCancel;

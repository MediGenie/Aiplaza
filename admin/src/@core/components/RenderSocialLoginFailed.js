import React from 'react';
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

export default function RenderSocialLoginFailed({ isOpen, toggle, message }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>로그인 오류</ModalHeader>
      <ModalBody>
        {message || '로그인 과정에서 오류가 발생하였습니다.'}
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>확인</Button>
      </ModalFooter>
    </Modal>
  );
}

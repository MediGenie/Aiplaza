/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "../../components";

function AuthModal({
  showAuthModal,
  setShowAuthModal,
  headerMessage,
  bodyMessage,
  authPath,
  changeUrl,
}) {
  const history = useHistory();
  const onChangePath = () => {
    console.log("onchangepath", authPath);
    if (changeUrl === true) {
      setShowAuthModal(false);
      setTimeout(() => {
        if (authPath === "/my-info") history.go(-1);
        else history.push(authPath);
      }, 200);
    } else {
      setShowAuthModal(false);
    }
  };

  const enterEventCallback = (e) => {
    e.stopPropagation();

    if (e.key === "Enter" && showAuthModal === true) {
      console.log("event start");
      onChangePath();
    }
  };
  const removeEnterEvent = () => {
    document.removeEventListener("keydown", enterEventCallback, true);
  };
  const addEnterEvent = () => {
    document.addEventListener("keydown", enterEventCallback, true);
  };

  return (
    <Modal
      isOpen={showAuthModal}
      toggle={onChangePath}
      onEnter={addEnterEvent}
      onExit={removeEnterEvent}
    >
      <ModalHeader>{headerMessage}</ModalHeader>
      <ModalBody>{bodyMessage}</ModalBody>
      <ModalFooter>
        <Button color="windows" onClick={onChangePath}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
}

AuthModal.propTypes = {
  showAuthModal: PropTypes.bool,
  setShowAuthModal: PropTypes.func,
  headerMessage: PropTypes.string,
  bodyMessage: PropTypes.string,
  authPath: PropTypes.string,
  changeUrl: PropTypes.bool,
};
AuthModal.defaultProps = {
  changeUrl: true,
};

export default AuthModal;

import { useState } from 'react';

export function useModalState() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const showModal = (msg: string) => {
    setShow(true);
    setMessage(msg);
  };
  const hideModal = () => {
    setShow(false);
  };

  return {
    showModal,
    hideModal,
    props: {
      open: show,
      message,
      onClose: hideModal,
    },
  };
}

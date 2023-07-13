import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import DefaultModal from '../../@core/components/Modals';

function OtpInput({ onSubmit }) {
  const [token, setToken] = useState('');
  const handleSubmit = useCallback(
    (e) => {
      if (e?.preventDefault) {
        e.preventDefault();
      }
      onSubmit(token);
    },
    [onSubmit, token]
  );
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <p>인증 코드</p>
          <input
            className="form-control"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
          <button
            className="btn btn-primary btn-block mt-4"
            type="submit"
            disabled={token.length !== 6}
          >
            인증하기
          </button>
        </div>
      </form>
    </div>
  );
}

OtpInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export function VerifyOtpModal({ open, onClose, onSubmit }) {
  return (
    <DefaultModal
      isOpen={open}
      closeFunc={onClose}
      headerMessage="OTP"
      bodyMessage={<OtpInput onSubmit={onSubmit} />}
      ButtonMessage="닫기"
    />
  );
}

VerifyOtpModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DefaultModal from '../../@core/components/Modals';

function UpdateOtp({ update }) {
  const [qrCode, setQrCode] = useState(null);

  const handleUpdate = useCallback(async () => {
    const response = await update();
    if (response.qrCode) {
      return response.qrCode;
    }
    return null;
  }, [update]);

  useEffect(() => {
    let mounted = true;
    handleUpdate()
      .then((qr) => {
        if (mounted === true) {
          setQrCode(qr);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [handleUpdate]);

  if (qrCode === null) {
    return (
      <div>
        <div className="custom-loader" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-center">OTP를 등록해주세요.</h3>
      <img
        src={qrCode}
        style={{
          width: 120,
          height: 120,
          display: 'block',
          margin: '30px auto',
        }}
      />
    </div>
  );
}
UpdateOtp.propTypes = {
  update: PropTypes.func.isRequired,
};

export default function ResetOtpModal({ onClose, update, isOpen }) {
  return (
    <DefaultModal
      headerMessage="OTP 재설정"
      bodyMessage={<UpdateOtp update={update} />}
      ButtonMessage="닫기"
      closeFunc={onClose}
      isOpen={isOpen}
    />
  );
}
ResetOtpModal.propTypes = {
  update: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
ResetOtpModal.defaultProps = {};

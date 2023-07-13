/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import DefaultModal from '../../../@core/components/Modals';
import { useAuthContext } from '../../../@core/store/hooks/useAuthContext';
import { authActionCreator } from '../../../@core/store/actions/authActions';

function InputOtp({ id }) {
  const [, authDispatch] = useAuthContext();
  const [token, setToken] = useState('');
  const [openError, setOpenError] = useState(false);

  const validate = useCallback(
    async (e) => {
      if (e?.preventDefault) {
        e.preventDefault();
      }
      try {
        const response = await Axios.post('/auth/otp', {
          userId: id,
          token,
        });
        const loginData = response.data;

        authDispatch(authActionCreator.Login(loginData));
      } catch {
        setOpenError(true);
      }
    },
    [authDispatch, id, token]
  );

  return (
    <div>
      <form onSubmit={validate}>
        <div className="mb-2">
          <p>인증 코드</p>
          <input
            className="form-control"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary btn-block mt-4"
          type="submit"
          disabled={token.length !== 6}
        >
          인증하기
        </button>
      </form>
      <DefaultModal
        headerMessage="인증번호 오류"
        ButtonMessage="닫기"
        bodyMessage="인증번호가 올바르지 않습니다."
        isOpen={openError}
        closeFunc={() => setOpenError(false)}
      ></DefaultModal>
    </div>
  );
}

function UpdateOtp({ id, updateOtp }) {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  const fetchOtpInfo = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Axios.patch('/auth/otp', {
        id,
      });
      const data = response.data;
      setQrCode(data.qr_code);
    } catch (e) {
      // NOTHING
    } finally {
      setLoading(false);
    }
  }, [id, loading]);

  const goToInput = useCallback(() => {
    updateOtp(true);
  }, [updateOtp]);

  useEffect(() => {
    fetchOtpInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>OTP를 등록해주세요.</h3>
      {qrCode !== null && (
        <div>
          <img
            src={qrCode}
            style={{
              width: 120,
              height: 120,
              display: 'block',
              margin: '30px auto',
            }}
          />
          <button
            className="btn btn-primary btn-block"
            type="button"
            onClick={goToInput}
          >
            입력하러가기
          </button>
        </div>
      )}
    </div>
  );
}

function OtpModal({ otpInfo, onClose, updateOtp }) {
  const show = otpInfo !== null;

  return (
    <DefaultModal
      headerMessage="OTP"
      bodyMessage={
        otpInfo === null ? (
          ''
        ) : otpInfo.hasOtp ? (
          <InputOtp id={otpInfo.id} />
        ) : (
          <UpdateOtp id={otpInfo.id} updateOtp={updateOtp} />
        )
      }
      isOpen={show}
      closeFunc={onClose}
      ButtonMessage="닫기"
    />
  );
}

export default OtpModal;

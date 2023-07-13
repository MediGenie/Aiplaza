import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { FormGroup, Label, Button } from '@core/components';
import { HeaderAuth } from '@core/routes/components/Pages/HeaderAuth';
import { FooterAuth } from '@core/routes/components/Pages/FooterAuth';
import DefaultModal from '@core/components/Modals';

const validation = yup.object().shape({
  email: yup
    .string()
    .email('아이디를 확인해주세요.')
    .max(30, '아이디는 최대 30자까지 입력 가능합니다.'),
});

function ForgotPassword() {
  const history = useHistory();
  const [showFail, setShowFail] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const submitHandler = useCallback((values) => {
    axios
      .post('/auth/reset-pw', values)
      .then(() => {
        setMessage('초기화 메일을 발송하였습니다.\n해당 메일을 확인해주세요.');
        setShowSuccess(true);
      })
      .catch(() => {
        setMessage('이메일을 확인해주세요.');
        setShowFail(true);
      });
  }, []);

  return (
    <div className="fullscreen__section--center">
      <div className="fullscrenn__section__child" style={{ width: 420 }}>
        <HeaderAuth
          title="비밀번호 초기화 메일 발송"
          text={
            <>
              관리자로 등록된 이메일 주소를 정확히 입력해 주세요.
              <br />
              해당 이메일로 임시 비밀번호를 메일로 발송해드립니다
            </>
          }
        />
        <Formik
          initialValues={{ email: '' }}
          onSubmit={submitHandler}
          validationSchema={validation}
        >
          <Form className="mb-3">
            <FormGroup>
              <Label for="emailAdress">이메일</Label>
              <Field
                type="text"
                name="email"
                id="emailAdress"
                placeholder="이메일을 입력해주세요."
                className="form-control"
              />
              <ErrorMessage name="email" />
            </FormGroup>
            <div className="d-flex mb-3">
              <Button
                className="text-decoration-none mr-1"
                size="lg"
                color="primary"
                block
                type="submit"
              >
                발송하기
              </Button>
            </div>
          </Form>
        </Formik>
        <FooterAuth />
        <DefaultModal
          isOpen={showFail}
          ButtonMessage="닫기"
          headerMessage="비밀번호 초기화 메일 실패"
          bodyMessage={message}
          closeFunc={() => setShowFail(false)}
        />
        <DefaultModal
          isOpen={showSuccess}
          ButtonMessage="닫기"
          headerMessage="비밀번호 초기화 메일 완료"
          bodyMessage={message}
          closeFunc={() => history.push('/login')}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;

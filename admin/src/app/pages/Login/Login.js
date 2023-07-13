import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from '@core/components';
import { HeaderAuth } from '@core/routes/components/Pages/HeaderAuth';
import { FooterAuth } from '@core/routes/components/Pages/FooterAuth';
import styled from 'styled-components';
import useLoginHooks from './useLoginHooks';
import DefaultModal from '../../../@core/components/Modals';

const ErrorMessage = styled.p`
  margin: 0 0 0 10px;
  color: #ae1212;
`;

function Login() {
  const { formik, modal, closeModal } = useLoginHooks();

  return (
    <div className="fullscreen__section--center">
      <div className="fullscrenn__section__child" style={{ width: 420 }}>
        <HeaderAuth title="AiPlaza" text="관리자 서비스" />
        <Form className="mb-3" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="email">아이디</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="아이디(이메일)을 입력해주세요"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="password">비밀번호</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              className="bg-white"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="off"
            />
            {formik.errors.password && (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            )}
          </FormGroup>
          <button
            disabled={!formik.isValid}
            className="mt-4 btn btn-primary btn-block"
            type="submit"
          >
            로그인
          </button>
        </Form>
        <div className="mb-5">
          <Link
            to="/forgot-password"
            className="text-decoration-none float-right"
          >
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>
        <FooterAuth />
        <DefaultModal
          headerMessage="알림"
          bodyMessage={modal.message}
          isOpen={modal.show}
          closeFunc={closeModal}
        />
      </div>
    </div>
  );
}

export default Login;

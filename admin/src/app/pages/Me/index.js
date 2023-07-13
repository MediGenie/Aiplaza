import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Container } from 'reactstrap';
import { Form, FormikProvider, useFormik } from 'formik';

import DefaultModal from '@core/components/Modals';
import validate from './validate';
import { useAuthContext } from '@core/store/hooks/useAuthContext';
import axios from 'axios';
import { authActionCreator } from '@core/store/actions/authActions';
import { FormikTextInput } from '../components/form/TextInput';
import FormRow from '../components/form/FormRow';

export default function Me() {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const [auth, authDispatch] = useAuthContext();
  const formik = useFormik({
    initialValues: {
      name: auth.userInfo?.name || '',
      password: '',
      confirm_password: '',
    },
    onSubmit: async (values, helpers) => {
      axios
        .patch('/me', {
          name: values.name,
          password: values.password,
        })
        .then((res) => {
          const result = res.data;
          authDispatch(authActionCreator.refreshUserData(result));
          helpers.resetForm({
            values: {
              name: result.name,
              password: '',
              confirm_password: '',
            },
            errors: undefined,
          });
          setModalOpen(true);
        })
        .catch(() => {
          setModalOpen(true);
        });
    },
    validationSchema: validate,
  });

  const loadMe = useCallback(async (controller) => {
    const response = await axios.get('/auth/me', { signal: controller.signal });
    return response.data;
  }, []);

  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();
    loadMe(controller)
      .then((myinfo) => {
        if (isMount === true) {
          authDispatch(authActionCreator.refreshUserData(myinfo));
          formik.resetForm({
            values: {
              name: myinfo.name,
              password: '',
              confirm_password: '',
            },
          });
        }
      })
      .catch(() => {
        // NOTHING
      });

    return () => {
      isMount = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <DefaultModal
        headerMessage="비밀번호 변경"
        bodyMessage="비밀번호가 변경되었습니다."
        ButtonMessage="확인"
        isOpen={modalOpen}
        closeFunc={() => setModalOpen(false)}
      />
      <DefaultModal
        headerMessage="비밀번호 변경"
        bodyMessage="비밀번호 변경이 실패했습니다."
        ButtonMessage="확인"
        isOpen={errorModalOpen}
        closeFunc={() => setErrorModalOpen(false)}
      />
      <h2>내 정보 관리</h2>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Card className="my-3 custom-card">
            <CardBody>
              <FormRow label="이메일">
                <p>{auth.userInfo?.email}</p>
              </FormRow>
              <FormikTextInput label="이름" name="name" />
              <FormikTextInput label="비밀번호" name="password" secure />
              <FormikTextInput
                label="비밀번호 확인"
                name="confirm_password"
                secure
              />
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                style={{ marginLeft: 'auto', display: 'block' }}
                color="primary"
                disabled={!formik.isValid || !formik.dirty}
                onSubmit={formik.handleSubmit}
              >
                저장
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </FormikProvider>
    </Container>
  );
}
Me.propTypes = {};
Me.defaultProps = {};

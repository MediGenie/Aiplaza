import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  CardHeader,
} from 'reactstrap';
import { HeaderMain } from '@core/routes/components/HeaderMain';
import { useFormik, FormikProvider, Form } from 'formik';

import DefaultModal from '../../../@core/components/Modals';
import styled from 'styled-components';
import { FormikRichEditor } from '../components/form/RichTextEditor';
import { TextInput } from '../components/form/TextInput';
import { dateFormatter } from '../../../@core/routes/components/fomatters';
import { termYup } from './validate';
import FormikDateInput from '../components/form/DateInput/FormikDateInput';

const StyledContainer = styled.div`
  .ck-editor__editable_inline {
    max-height: 500px;
    overflow-y: 'auto';
    color: black;
  }
`;

export default function Term() {
  const [modalinfo, setModalinfo] = useState({
    show: false,
    message: '',
  });
  const closeModal = useCallback(() => {
    setModalinfo((prev) => ({ ...prev, show: false }));
  }, []);
  const [personalFetching, setPersonalFetching] = useState(false);
  const [markettingFetching, setMarkettingFetching] = useState(false);
  const personalFormik = useFormik({
    initialValues: {
      content: '',
      updated_at: new Date(),
      previous_revision_at: null,
      current_announcement_at: null,
      current_effective_at: null,
    },
    onSubmit: async (values, helper) => {
      try {
        const data = {
          content: values.content,
        };
        if (values.previous_revision_at) {
          data.previous_revision_at = values.previous_revision_at;
        }
        if (values.current_announcement_at) {
          data.current_announcement_at = values.current_announcement_at;
        }
        if (values.current_effective_at) {
          data.current_effective_at = values.current_effective_at;
        }
        const response = await Axios.patch('/term/personal', data);
        const updated_data = response.data;
        helper.resetForm({
          values: updated_data,
        });
        setModalinfo({
          show: true,
          message: '개인정보 수집 · 이용 동의 약관을 수정하였습니다.',
        });
      } catch {
        setModalinfo({
          show: true,
          message: '오류가 발생하여 수정하지 못하였습니다.',
        });
      }
    },
    validationSchema: termYup,
  });
  const markettingFormik = useFormik({
    initialValues: {
      content: '',
      updated_at: new Date(),
      previous_revision_at: null,
      current_announcement_at: null,
      current_effective_at: null,
    },
    onSubmit: async (values, helper) => {
      try {
        const data = {
          content: values.content,
        };
        if (values.previous_revision_at) {
          data.previous_revision_at = values.previous_revision_at;
        }
        if (values.current_announcement_at) {
          data.current_announcement_at = values.current_announcement_at;
        }
        if (values.current_effective_at) {
          data.current_effective_at = values.current_effective_at;
        }
        const response = await Axios.patch('/term/marketting', data);
        const updated_data = response.data;
        helper.resetForm({
          values: updated_data,
        });
        setModalinfo({
          show: true,
          message: '마케팅 활용에 대한 수집 · 이용 동의 약관을 수정하였습니다.',
        });
      } catch {
        setModalinfo({
          show: true,
          message: '오류가 발생하여 수정하지 못하였습니다.',
        });
      }
    },
    validationSchema: termYup,
  });

  const fetchPesonal = useCallback(() => {
    setPersonalFetching(true);
    return Axios.get('/term/personal')
      .then((res) => res.data)
      .catch(() => {})
      .finally(() => {
        setPersonalFetching(false);
      });
  }, []);
  const fetchMarketting = useCallback(() => {
    setMarkettingFetching(true);
    return Axios.get('/term/marketting')
      .then((res) => res.data)
      .catch(() => {})
      .finally(() => {
        setMarkettingFetching(false);
      });
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchPesonal().then((res) => {
      if (mounted === true && res) {
        personalFormik.resetForm({
          values: res,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPesonal]);
  useEffect(() => {
    let mounted = true;
    fetchMarketting().then((res) => {
      if (mounted === true && res) {
        markettingFormik.resetForm({
          values: res,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMarketting]);

  return (
    <StyledContainer className="ml-3">
      <HeaderMain title="약관 관리" className="mb-4 mt-2" />
      <Container>
        <Card className="my-3 custom-card">
          <FormikProvider value={personalFormik}>
            <Form>
              <CardHeader className="text-black">
                개인정보 수집 · 이용 동의
              </CardHeader>
              <CardBody>
                <FormikDateInput
                  label="이전 개정일자"
                  name="previous_revision_at"
                />
                <FormikDateInput
                  label="현행 공고일자"
                  name="current_announcement_at"
                />
                <FormikDateInput
                  label="현행 시행일자"
                  name="current_effective_at"
                />
                <FormikRichEditor
                  label="개인정보 수집 · 이용 동의"
                  name="content"
                  disabled={personalFetching || personalFormik.isSubmitting}
                />
                <TextInput
                  disabled
                  label="수정일"
                  name="updated_at"
                  value={dateFormatter(
                    personalFormik.values.updated_at,
                    'YYYY-MM-DD(ddd)'
                  )}
                />
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  style={{ marginLeft: 'auto', display: 'block' }}
                  color="primary"
                  disabled={personalFetching || personalFormik.isSubmitting}
                >
                  저장
                </Button>
              </CardFooter>
            </Form>
          </FormikProvider>
        </Card>
        <Card className="my-5 custom-card">
          <FormikProvider value={markettingFormik}>
            <Form>
              <CardHeader className="text-black">
                마케팅 활용에 대한 수집 · 이용 동의
              </CardHeader>
              <CardBody>
                <FormikDateInput
                  label="이전 개정일자"
                  name="previous_revision_at"
                />
                <FormikDateInput
                  label="현행 공고일자"
                  name="current_announcement_at"
                />
                <FormikDateInput
                  label="현행 시행일자"
                  name="current_effective_at"
                />
                <FormikRichEditor
                  label="마케팅 활용에 대한 수집 · 이용 동의"
                  name="content"
                  disabled={markettingFetching || markettingFormik.isSubmitting}
                />
                <TextInput
                  disabled
                  label="수정일"
                  name="updated_at"
                  value={dateFormatter(
                    markettingFormik.values.updated_at,
                    'YYYY-MM-DD(ddd)'
                  )}
                />
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  style={{ marginLeft: 'auto', display: 'block' }}
                  color="primary"
                  disabled={markettingFetching || markettingFormik.isSubmitting}
                >
                  저장
                </Button>
              </CardFooter>
            </Form>
          </FormikProvider>
        </Card>
      </Container>
      <DefaultModal
        headerMessage="알림"
        bodyMessage={modalinfo.message}
        ButtonMessage="확인"
        isOpen={modalinfo.show}
        closeFunc={closeModal}
      />
    </StyledContainer>
  );
}

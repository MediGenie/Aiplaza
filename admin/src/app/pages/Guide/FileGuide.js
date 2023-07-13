import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider, Form } from 'formik';
import { Button, Card, CardBody, CardFooter } from 'reactstrap';
import axios from 'axios';
import { TextInput } from '../components/form/TextInput';
import { dateFormatter } from '../../../@core/routes/components/fomatters';
import FormikFileInput from '../components/form/FileInput/FormikFileInput';
import DefaultModal from '../../../@core/components/Modals';

export default function FileGuide({ slug }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalInfo, setModalInfo] = useState({ show: false, message: '' });
  const close = useCallback(() => {
    setModalInfo((prev) => ({ ...prev, show: false }));
  }, []);
  const formik = useFormik({
    initialValues: {
      updated_at: new Date(),
      file: null,
    },
    onSubmit: async (values, helper) => {
      try {
        const formdata = new FormData();
        if (!(values.file instanceof File)) {
          return setModalInfo({
            show: true,
            message: '파일을 업로드해주세요.',
          });
        }
        formdata.append('file', values.file);
        const res = await axios.patch(`/guide/${slug}/file`, formdata);
        helper.resetForm({
          values: {
            ...res.data,
          },
        });
        setModalInfo({
          show: true,
          message: '수정 완료되었습니다.',
        });
        setIsEditMode(false);
      } catch {
        setModalInfo({
          show: true,
          message: '오류가 발생하여 수정할 수 없습니다.',
        });
      }
    },
  });

  const fetch = useCallback(() => {
    let mounted = true;
    axios.get(`/guide/${slug}/file`).then((res) => {
      if (mounted === true) {
        formik.resetForm({
          values: res.data,
        });
      }
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const cancelEdit = useCallback(
    (e) => {
      formik.handleReset(e);
      setIsEditMode(false);
    },
    [formik]
  );

  useEffect(() => {
    return fetch();
  }, [fetch]);

  return (
    <div>
      <Card className="my-3 custom-card">
        <FormikProvider value={formik}>
          <Form>
            <CardBody>
              <TextInput
                disabled
                label="수정일"
                name="updated_at"
                value={dateFormatter(
                  formik.values.updated_at,
                  'YYYY-MM-DD(ddd)'
                )}
              />
              <FormikFileInput
                name="file"
                label="첨부파일"
                disabled={isEditMode === false}
              />
            </CardBody>
            <CardFooter>
              {isEditMode === false ? (
                <div className="d-flex" style={{ justifyContent: 'flex-end' }}>
                  <Button
                    style={{ marginLeft: 8 }}
                    type="button"
                    color="primary"
                    onClick={() => setIsEditMode(true)}
                  >
                    수정
                  </Button>
                </div>
              ) : (
                <div className="d-flex" style={{ justifyContent: 'flex-end' }}>
                  <Button type="button" onClick={cancelEdit}>
                    취소
                  </Button>
                  <Button
                    type="submit"
                    style={{ marginLeft: 8 }}
                    color="primary"
                  >
                    저장
                  </Button>
                </div>
              )}
            </CardFooter>
          </Form>
        </FormikProvider>
      </Card>
      <DefaultModal
        isOpen={modalInfo.show}
        closeFunc={close}
        bodyMessage={modalInfo.message}
        headerMessage="알림"
      />
    </div>
  );
}
FileGuide.propTypes = { slug: PropTypes.slug };
FileGuide.defaultProps = {};

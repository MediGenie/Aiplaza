import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik, FormikProvider, Form } from 'formik';
import { Button, Card, CardBody, CardFooter } from 'reactstrap';

import { TextInput } from '../components/form/TextInput';
import { dateFormatter } from '../../../@core/routes/components/fomatters';
import axios from 'axios';
import DefaultModal from '../../../@core/components/Modals';
import FormikTextArea from '../components/form/TextArea/FormikTextArea';

const TypeToStr = {
  basic: 'Basic',
  estimate: '클라우드 견적',
  complience: '컴플라이언스',
};

export default function PlaceHolderEdit({ type, slug }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalInfo, setModalInfo] = useState({ show: false, message: '' });
  const formik = useFormik({
    initialValues: {
      content: '',
      updated_at: new Date(),
    },
    onSubmit: async (values, helper) => {
      try {
        const res = await axios.patch(`/placeholder/${slug}`, {
          content: values.content,
        });
        helper.resetForm({
          values: {
            ...values,
            updated_at: res.data.updated_at,
          },
        });
        setModalInfo({
          show: true,
          message: `${TypeToStr[slug]} 안내문구를 수정하였습니다.`,
        });
        setIsEditMode(false);
      } catch {
        setModalInfo({
          show: true,
          message: `${TypeToStr[slug]} 안내문구 수정 중 오류가 발생하였습니다.`,
        });
      }
    },
  });

  const fetch = useCallback(() => {
    let mounted = true;
    axios.get(`/placeholder/${slug}`).then((res) => {
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
              <TextInput disabled label="유형" value={TypeToStr[type]} />
              <TextInput
                disabled
                label="수정일"
                name="updated_at"
                value={dateFormatter(
                  formik.values.updated_at,
                  'YYYY-MM-DD(ddd)'
                )}
              />
              <FormikTextArea
                label="내용"
                name="content"
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
        headerMessage="알림"
        bodyMessage={modalInfo.message}
        closeFunc={() => setModalInfo((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
PlaceHolderEdit.propTypes = {
  type: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};
PlaceHolderEdit.defaultProps = {};

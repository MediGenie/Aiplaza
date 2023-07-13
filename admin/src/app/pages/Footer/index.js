import React, { useCallback, useEffect, useState } from 'react';
import { Container, Card, CardBody, CardFooter, Button } from 'reactstrap';
import { HeaderMain } from '@core/routes/components/HeaderMain';
import DefaultModal, { ConfirmModal } from '../../../@core/components/Modals';
import { Form, useFormik, FormikProvider, FieldArray } from 'formik';

import { FormikTextInput, TextInput } from '../components/form/TextInput';
import { dateFormatter } from '../../../@core/routes/components/fomatters';
import { FormikImageUpload } from '../components/form/ImageUpload';
import FormRow from '../components/form/FormRow';
import axios from 'axios';
import { footerYup } from './validation';
import PropTypes from 'prop-types';

export function SNSItem({ index, onRemove }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpen = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);
  const handleRemove = useCallback(() => {
    onRemove && onRemove();
    handleClose();
  }, [handleClose, onRemove]);

  return (
    <div
      className="mb-3"
      style={{
        borderBottom: '1px solid #DFDFDF99',
        paddingBottom: 14,
      }}
    >
      <FormikTextInput
        label="SNS명"
        name={`sns.${index}.name`}
        placeholder="SNS명을 입력해 주세요."
      />
      <FormikTextInput
        label="SNS URL"
        name={`sns.${index}.link`}
        placeholder="URL을 입력해 주세요."
      />
      <FormikImageUpload label="로고 이미지" name={`sns.${index}.image`} />
      {index > 0 && (
        <>
          <Button type="button" onClick={handleOpen} color="danger">
            삭제
          </Button>
          <ConfirmModal
            headerMessage="SNS 항목 삭제"
            bodyMessage={
              <>
                <p>삭제 후에는 데이터 복구가 불가능합니다.</p>
                <p>항목을 삭제하시겠습니까?</p>
              </>
            }
            isOpen={openDeleteModal}
            cancelButtonMessage="취소"
            okButtonMessage="삭제"
            onCancelButtonHandler={handleClose}
            onOkButtonHandler={handleRemove}
            setIsOpen={handleClose}
          />
        </>
      )}
    </div>
  );
}

SNSItem.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
};

export function FamilyItem({ index, onRemove }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpen = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);
  const handleRemove = useCallback(() => {
    onRemove && onRemove();
    handleClose();
  }, [handleClose, onRemove]);

  return (
    <div
      className="mb-3"
      style={{
        borderBottom: '1px solid #DFDFDF99',
        paddingBottom: 14,
      }}
    >
      <FormikTextInput
        label="사이트명"
        name={`family.${index}.name`}
        placeholder="사이트명을 입력해 주세요."
      />
      <FormikTextInput
        label="사이트 URL"
        name={`family.${index}.link`}
        placeholder="URL을 입력해 주세요."
      />
      {index > 0 && (
        <>
          <Button type="button" onClick={handleOpen} color="danger">
            삭제
          </Button>
          <ConfirmModal
            headerMessage="SNS 항목 삭제"
            bodyMessage={
              <>
                <p>삭제 후에는 데이터 복구가 불가능합니다.</p>
                <p>항목을 삭제하시겠습니까?</p>
              </>
            }
            isOpen={openDeleteModal}
            cancelButtonMessage="취소"
            okButtonMessage="삭제"
            onCancelButtonHandler={handleClose}
            onOkButtonHandler={handleRemove}
            setIsOpen={handleClose}
          />
        </>
      )}
    </div>
  );
}

FamilyItem.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
};

export default function Footer() {
  const [modalinfo, setModalinfo] = useState({
    show: false,
    message: '',
  });
  const closeModal = useCallback(() => {
    setModalinfo((prev) => ({ ...prev, show: false }));
  }, []);
  const formik = useFormik({
    initialValues: {
      updated_at: new Date(),
      image: null,
      presenter: '',
      biz_register_number: '',
      address: '',
      mail_order_sales_report_number: '',
      phone: '',
      fax: '',
      sns: [],
      family: [],
      privacyTermLink: '',
    },
    onSubmit: async (values, helper) => {
      const formdata = new FormData();
      formdata.append('presenter', values.presenter);
      formdata.append('biz_register_number', values.biz_register_number);
      formdata.append('address', values.address);
      formdata.append('privacyTermLink', values.privacyTermLink || '');
      formdata.append(
        'mail_order_sales_report_number',
        values.mail_order_sales_report_number
      );
      formdata.append('phone', values.phone);
      formdata.append('fax', values.fax);
      if (values.image instanceof File) {
        formdata.append('image', values.image);
        formdata.append('width', values.image.width);
        formdata.append('height', values.image.height);
      }
      const uploaded_sns_image = [];
      values.sns.forEach((value, index) => {
        const prefix = `sns[${index}]`;
        if (value._id) {
          formdata.append(`${prefix}[_id]`, value._id);
        }
        formdata.append(`${prefix}[name]`, value.name);
        formdata.append(`${prefix}[link]`, value.link);
        if (value.image instanceof File) {
          const img_index = uploaded_sns_image.length;
          formdata.append(`${prefix}[imgIndex]`, img_index);
          formdata.append(`${prefix}[width]`, value.image.width);
          formdata.append(`${prefix}[height]`, value.image.height);
          uploaded_sns_image.push(value.image);
        }
      });
      values.family.forEach((value, index) => {
        const prefix = `family[${index}]`;
        if (value._id) {
          formdata.append(`${prefix}[_id]`, value._id);
        }
        formdata.append(`${prefix}[name]`, value.name);
        formdata.append(`${prefix}[link]`, value.link);
      });
      for (var pair of formdata.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      uploaded_sns_image.forEach((img) => {
        formdata.append('sns_image', img);
      });
      axios
        .patch('/site-config/footer', formdata)
        .then((res) => {
          helper.resetForm({
            values: res.data,
          });
          setModalinfo({ show: true, message: '푸터 정보를 저장하였습니다.' });
        })
        .catch(() => {
          setModalinfo({
            show: true,
            message: '오류가 발생하여, 푸터 정보를 수정하지 못하였습니다.',
          });
        });
    },
    validationSchema: footerYup,
  });

  useEffect(() => {
    let mounted = true;
    axios.get('/site-config/footer').then((res) => {
      if (mounted === true) {
        formik.resetForm({
          values: res.data,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ml-3" style={{ marginBottom: 32 }}>
      <HeaderMain title="푸터 관리" className="mb-4 mt-2" />
      <Container>
        <FormikProvider value={formik}>
          <Form>
            <Card>
              <CardBody>
                <TextInput
                  value={dateFormatter(formik.values.updated_at)}
                  disabled
                  label="수정일"
                />
                <FormikImageUpload name="image" label="이미지 정보*" />
                <FormikTextInput
                  name="presenter"
                  label="대표이사*"
                  placeholder="대표이사를 입력해 주세요."
                />
                <FormikTextInput
                  name="biz_register_number"
                  label="사업자등록번호*"
                  placeholder="사업자등록번호를 입력해 주세요."
                />
                <FormikTextInput
                  name="address"
                  label="주소*"
                  placeholder="주소를 입력해 주세요."
                />
                <FormikTextInput
                  name="mail_order_sales_report_number"
                  label="통신판매신고번호*"
                />
                <FormikTextInput
                  name="phone"
                  label="대표전화*"
                  placeholder="대표전화를 입력해 주세요."
                />
                <FormikTextInput
                  name="fax"
                  label="FAX*"
                  placeholder="FAX를 입력해 주세요."
                />
                <FormikTextInput
                  name="privacyTermLink"
                  label="개인정보처리방침 URL"
                  placeholder="개인정보 처리방침 URL을 입력해 주세요."
                />
                <FormRow label="SNS 관리">
                  <FieldArray name="sns">
                    {(arrayHelper) => {
                      return (
                        <div>
                          {formik.values.sns.map((row, i) => {
                            return (
                              <SNSItem
                                index={i}
                                key={i}
                                onRemove={() => arrayHelper.remove(i)}
                              />
                            );
                          })}
                          <Button
                            type="button"
                            onClick={() =>
                              arrayHelper.push({
                                name: '',
                                link: '',
                                image: null,
                              })
                            }
                            color="primary"
                            style={{ marginLeft: 'auto', display: 'block' }}
                          >
                            추가
                          </Button>
                        </div>
                      );
                    }}
                  </FieldArray>

                  {typeof formik.errors.sns === 'string' && (
                    <p>{formik.errors.sns}</p>
                  )}
                </FormRow>
                <FormRow label="패밀리사이트">
                  <FieldArray name="family">
                    {(arrayHelper) => {
                      return (
                        <div>
                          {formik.values.family.map((row, i) => {
                            return (
                              <FamilyItem
                                index={i}
                                onRemove={() => arrayHelper.remove(i)}
                                key={i}
                              />
                            );
                          })}
                          <Button
                            type="button"
                            onClick={() =>
                              arrayHelper.push({
                                name: '',
                                url: '',
                              })
                            }
                            color="primary"
                            style={{ marginLeft: 'auto', display: 'block' }}
                          >
                            추가
                          </Button>
                        </div>
                      );
                    }}
                  </FieldArray>
                  {typeof formik.errors.family === 'string' && (
                    <p>{formik.errors.family}</p>
                  )}
                </FormRow>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  color="primary"
                  style={{ marginLeft: 'auto', display: 'block' }}
                >
                  저장
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
      <DefaultModal
        headerMessage="알림"
        bodyMessage={modalinfo.message}
        ButtonMessage="확인"
        isOpen={modalinfo.show}
        closeFunc={closeModal}
      />
    </div>
  );
}

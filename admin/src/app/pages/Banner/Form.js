import React, { useCallback, useMemo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Form, useFormik, FormikProvider } from 'formik';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';
import { FormikImageUpload } from '../components/form/ImageUpload';
import { FormikTextInput, TextInput } from '../components/form/TextInput';
import { BannerTypeToStr } from './banner-typeToStr';

const initDataPropTypes = PropTypes.shape({
  category: PropTypes.string,
  image: PropTypes.any,
  mobile_image: PropTypes.any,
  badge: PropTypes.any,
  link: PropTypes.string,
});
const initData = {
  category: '',
  image: null,
  mobile_image: null,
  badge: null,
  link: '',
};

function FormComponent({
  formType,
  initialData,
  onSubmit,
  disableEdit,
  validate,
}) {
  const match = useRouteMatch();
  const history = useHistory();
  const editUrl = useMemo(() => {
    return `${match.url}/edit`;
  }, [match]);

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);
  const submitToServer = useCallback(
    (values) => {
      const data = new FormData();

      if (values.image instanceof File) {
        data.append('image', values.image);
        data.append('width', values.image.width);
        data.append('height', values.image.height);
      }
      if (values.mobile_image instanceof File) {
        data.append('mobile_image', values.mobile_image);
        data.append('mobile_width', values.mobile_image.width);
        data.append('mobile_height', values.mobile_image.height);
      }
      if (values.badge instanceof File) {
        data.append('badge', values.badge);
        data.append('badge_width', values.badge.width);
        data.append('badge_height', values.badge.height);
      }
      data.append('link', values.link);

      onSubmit(data);
    },
    [onSubmit]
  );

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: submitToServer,
    validationSchema: validate,
  });

  return (
    <>
      <Card className="my-3 custom-card">
        <CardBody>
          <FormikProvider value={formik}>
            <Form className="mb-2" autoComplete="off">
              <TextInput
                label="배너유형"
                name="category"
                value={BannerTypeToStr[formik.values.type]}
                disabled
              />
              <FormikImageUpload
                label="이미지 정보*"
                name="image"
                disabled={formType === 'detail'}
                description="1920*434 권장"
              />
              <FormikImageUpload
                label="모바일 이미지 정보*"
                name="mobile_image"
                disabled={formType === 'detail'}
                description="1170*1428 권장"
              />
              <FormikTextInput
                label="연결 URL"
                name="link"
                disabled={formType === 'detail'}
                placeholder="연결 URL을 입력해 주세요."
              />
              <FormikImageUpload
                label="배지 이미지 정보"
                name="badge"
                disabled={formType === 'detail'}
                description="252*96 권장"
              />
              <button type="submit" id="form-submit-btn" hidden>
                submit
              </button>
            </Form>
          </FormikProvider>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-end mt-3">
        {formType === 'detail' && (
          <>
            {disableEdit === false && (
              <Link to={editUrl}>
                <Button
                  style={{ fontSize: '1.15em' }}
                  color="windows"
                  className="mr-2"
                >
                  수정
                </Button>
              </Link>
            )}
          </>
        )}
        {formType !== 'detail' && (
          <>
            <label
              style={{ fontSize: '1.15em', height: 37 }}
              color="windows"
              className="btn btn-windows mr-2"
              htmlFor="form-submit-btn"
            >
              {formType === 'edit' ? '저장' : '등록'}
            </label>
            <button
              onClick={onCancel}
              style={{ fontSize: '1.15em', height: 37 }}
              className="btn btn-secondary mr-2"
            >
              취소
            </button>
          </>
        )}
      </div>
    </>
  );
}

FormComponent.propTypes = {
  formType: PropTypes.string,
  initialData: initDataPropTypes,
  onSubmit: PropTypes.func,
  disableEdit: PropTypes.bool,
  validate: PropTypes.any,
};

FormComponent.defaultProps = {
  formType: 'detail',
  initialData: initData,
  onSubmit: () => {},
  disableEdit: false,
};

export default FormComponent;

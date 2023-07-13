import React, { useCallback, useMemo } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Form, useFormik, FormikProvider } from 'formik';
import { FormikTextInput, TextInput } from '../components/form/TextInput';
import { dateFormatter } from '../../../@core/routes/components/fomatters';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import FormikDateInput from '../components/form/DateInput/FormikDateInput';
import FormikRadioInput from '../components/form/RadioInput/FormikRadioInput';
import { FormikRichEditor } from '../components/form/RichTextEditor';
import FormikImageUpload from '../components/form/ImageUpload/FormikImageUpload';

const initDataPropTypes = PropTypes.shape({
  name: PropTypes.string,
  start_at: PropTypes.any,
  end_at: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.string,
  content: PropTypes.string,
  suffix_icon: PropTypes.any,
  prefix_icon: PropTypes.any,
});
const initData = {
  name: '',
  start_at: null,
  end_at: null,
  color: 'AHNLAB_BLUE',
  type: 'URL',
  link: '',
  content: '',
  suffix_icon: null,
  prefix_icon: null,
  image: null,
};

export default function FormComponent({
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
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: async (values, helper) => {
      const fd = new FormData();

      fd.append('name', values.name);
      fd.append('start_at', values.start_at);
      fd.append('end_at', values.end_at);
      fd.append('color', values.color);
      fd.append('type', values.type);
      if (values.type === 'URL') {
        fd.append('link', values.link);
      } else {
        fd.append('content', values.content);
        if (values.image instanceof File) {
          fd.append('manual_image', values.image);
          fd.append('manual_width', values.image.width);
          fd.append('manual_height', values.image.height);
        }
      }
      if (values.prefix_icon instanceof File) {
        fd.append('prefix_icon', values.prefix_icon);
        fd.append('prefix_width', values.prefix_icon.width);
        fd.append('prefix_height', values.prefix_icon.height);
      }
      if (values.suffix_icon instanceof File) {
        fd.append('suffix_icon', values.suffix_icon);
        fd.append('suffix_width', values.suffix_icon.width);
        fd.append('suffix_height', values.suffix_icon.height);
      }
      fd.append(
        'has_suffix_icon',
        values.suffix_icon !== null ? 'true' : 'false'
      );
      fd.append(
        'has_prefix_icon',
        values.prefix_icon !== null ? 'true' : 'false'
      );
      await onSubmit(fd);
      helper.setSubmitting(false);
    },
    validationSchema: validate,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Card>
          <CardBody>
            {typeof formik.values.updated_at !== 'undefined' && (
              <TextInput
                value={dateFormatter(formik.values.updated_at)}
                disabled
                label="수정일"
              />
            )}
            <FormikTextInput
              name="name"
              label="프로모션명*"
              disabled={formType === 'detail'}
              placeholder="프로모션명을 입력해 주세요."
            />
            <FormikImageUpload
              name="prefix_icon"
              label="접두 이미지"
              disabled={formType === 'detail'}
              description="배너의 글씨 앞에 24x24 크기의 공간에 이미지가 담깁니다."
              enableCancel
            />
            <FormikImageUpload
              name="suffix_icon"
              label="접미 이미지"
              disabled={formType === 'detail'}
              description="배너의 글씨 뒤에 24x24 크기의 공간에 이미지가 담깁니다."
              enableCancel
            />
            <FormikDateInput
              label="시작일*"
              name="start_at"
              placeholder="YYYY.MM.DD(요일) HH:mm"
              withTime
              disabled={formType === 'detail'}
            />
            <FormikDateInput
              label="마감일*"
              name="end_at"
              placeholder="YYYY.MM.DD(요일) HH:mm"
              withTime
              disabled={formType === 'detail'}
            />
            <FormikRadioInput
              label="컬러*"
              name="color"
              list={[
                { label: 'AhnLab Blue', value: 'AHNLAB_BLUE' },
                { label: 'Gold', value: 'GOLD' },
                { label: 'Black', value: 'BLACK' },
                { label: 'White', value: 'WHITE' },
              ]}
              disabled={formType === 'detail'}
            />
            <FormikRadioInput
              label="타입*"
              name="type"
              list={[
                { label: 'URL', value: 'URL' },
                { label: '직접작성', value: 'MANUAL' },
              ]}
              disabled={formType === 'detail'}
            />
            {formik.values.type === 'URL' ? (
              <FormikTextInput
                name="link"
                label="URL*"
                disabled={formType === 'detail'}
                placeholder="URL을 입력해 주세요."
              />
            ) : (
              <>
                <FormikRichEditor
                  name="content"
                  label="직접작성*"
                  disabled={formType === 'detail'}
                />
                <FormikImageUpload
                  name="image"
                  label="이미지"
                  disabled={formType === 'detail'}
                />
              </>
            )}
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end mt-3">
          {formType === 'detail' && disableEdit === false && (
            <Link to={editUrl} className="btn btn-primary mr-2">
              수정
            </Link>
          )}
          {formType !== 'detail' && (
            <>
              <Button
                type="submit"
                color="primary"
                className="mr-2"
                style={{ fontSize: '1.15em', height: 37 }}
                disabled={formik.isSubmitting || !formik.dirty}
              >
                {formType === 'edit' ? '저장' : '등록'}
              </Button>
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
      </Form>
    </FormikProvider>
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

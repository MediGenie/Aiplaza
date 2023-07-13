import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import ImageUpload from './ImageUpload';

export default function FormikImageUpload({
  label,
  name,
  disabled,
  description,
  enableCancel,
}) {
  const [field, meta, helper] = useField(name);
  return (
    <ImageUpload
      disabled={disabled}
      file={field.value}
      onChange={(file) => helper.setValue(file)}
      label={label}
      name={name}
      error={meta.error}
      description={description}
      enableCancel={enableCancel}
    />
  );
}
FormikImageUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  enableCancel: PropTypes.bool,
};
FormikImageUpload.defaultProps = {};

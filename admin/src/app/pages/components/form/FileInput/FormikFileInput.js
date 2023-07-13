import React from 'react';
import PropTypes from 'prop-types';
import FileInput from './FileInput';
import { useField } from 'formik';

export default function FormikFileInput({ label, disabled, name, accept }) {
  const [field, meta, helper] = useField(name);
  return (
    <FileInput
      label={label}
      disabled={disabled}
      name={name}
      accept={accept}
      file={field.value}
      onChange={helper.setValue}
      error={meta.error}
    />
  );
}
FormikFileInput.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  accept: PropTypes.string,
};
FormikFileInput.defaultProps = {};

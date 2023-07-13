import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import TextArea from './TextArea';

export default function FormikTextArea({
  label,
  name,
  disabled,
  description,
  placeholder,
  maxLength,
}) {
  const [field, meta] = useField(name);
  return (
    <TextArea
      name={name}
      label={label}
      disabled={disabled}
      error={meta.error}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      description={description}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
}
FormikTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};
FormikTextArea.defaultProps = {};

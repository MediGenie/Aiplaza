import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import TextInput from './TextInput';
export default function FormikTextInput({
  label,
  name,
  disabled,
  secure,
  autoComplete = 'off',
  placeholder,
  maxLength,
}) {
  const [field, meta] = useField(name);
  return (
    <TextInput
      name={name}
      label={label}
      disabled={disabled}
      secure={secure}
      autoComplete={autoComplete}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.error}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
}
FormikTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  secure: PropTypes.bool,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};
FormikTextInput.defaultProps = {
  disabled: false,
  secure: false,
};

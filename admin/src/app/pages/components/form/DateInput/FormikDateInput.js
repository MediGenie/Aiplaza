import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import DateInput from './DateInput';

export default function FormikDateInput({
  label,
  disabled,
  name,
  placeholder,
  withTime,
}) {
  const [field, meta, helper] = useField(name);
  return (
    <DateInput
      value={field.value}
      error={meta.error}
      disabled={disabled}
      label={label}
      name={name}
      onChange={helper.setValue}
      placeholder={placeholder}
      withTime={withTime}
    />
  );
}
FormikDateInput.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  withTime: PropTypes.bool,
};
FormikDateInput.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';
import ToggleInput from './ToggleInput';
import { useField } from 'formik';

export default function FormikToggleInput({ label, disabled, name }) {
  const [field, meta, helper] = useField(name);
  return (
    <ToggleInput
      name={name}
      label={label}
      checked={field.value}
      disabled={disabled}
      onChange={(next) => helper.setValue(next)}
      error={meta.error}
    />
  );
}
FormikToggleInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
FormikToggleInput.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import RadioInput from './RadioInput';

export default function FormikRadioInput({ label, list, name, disabled }) {
  const [field, meta, helper] = useField(name);
  return (
    <RadioInput
      label={label}
      list={list}
      name={name}
      select={field.value}
      onChange={helper.setValue}
      error={meta.error}
      disabled={disabled}
    />
  );
}
FormikRadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
FormikRadioInput.defaultProps = {};

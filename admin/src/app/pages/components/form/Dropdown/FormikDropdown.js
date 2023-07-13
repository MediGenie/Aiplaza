import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import Dropdown from './Dropdown';

export default function FormikDropdown({
  label,
  list,
  placeholder,
  name,
  disabled,
}) {
  const [field, meta, helper] = useField(name);
  return (
    <Dropdown
      label={label}
      list={list}
      placeholder={placeholder}
      value={field.value}
      error={meta.error}
      onChange={helper.setValue}
      disabled={disabled}
    />
  );
}
FormikDropdown.propTypes = {
  label: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};
FormikDropdown.defaultProps = {};

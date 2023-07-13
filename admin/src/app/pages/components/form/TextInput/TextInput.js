import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';
import FormRow from '../FormRow';
export default function TextInput({
  label,
  name,
  disabled,
  secure,
  autoComplete = 'off',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  maxLength = 50,
}) {
  const type = useMemo(() => {
    return secure === true ? 'password' : 'text';
  }, [secure]);

  return (
    <FormRow label={label}>
      <Input
        disabled={disabled}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        autoComplete={autoComplete}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        onInput={(e) => {
          if (e.currentTarget.value.length > e.currentTarget.maxLength) {
            e.currentTarget.value = e.currentTarget.value.slice(
              0,
              e.currentTarget.maxLength
            );
          }
        }}
      />
      {error && <p>{error}</p>}
    </FormRow>
  );
}
TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  secure: PropTypes.bool,
  autoComplete: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};
TextInput.defaultProps = {
  disabled: false,
  secure: false,
};

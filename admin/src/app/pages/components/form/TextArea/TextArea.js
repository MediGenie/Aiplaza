import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import FormRow from '../FormRow';

export default function TextArea({
  value,
  name,
  label,
  onChange,
  onBlur,
  disabled,
  error,
  description,
  placeholder,
  maxLength = 255,
}) {
  return (
    <FormRow label={label}>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        type="textarea"
        style={{ height: 200, resize: 'none' }}
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
      {description && <p className="mb-4">{description}</p>}
      {error && <p>{error}</p>}
    </FormRow>
  );
}
TextArea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};
TextArea.defaultProps = {};

import React from 'react';
import PropTypes from 'prop-types';
import FormRow from '../FormRow';
import Toggle from 'react-toggle';

export default function ToggleInput({
  label,
  checked,
  onChange,
  disabled,
  error,
  name,
}) {
  return (
    <FormRow label={label}>
      <Toggle
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          typeof onChange === 'function' && onChange(e.target.checked);
        }}
      />
      {error && <p>{error}</p>}
    </FormRow>
  );
}
ToggleInput.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string,
};
ToggleInput.defaultProps = {};

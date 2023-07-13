import React from 'react';
import PropTypes from 'prop-types';
import FormRow from '../FormRow';
import { FormGroup, Label } from 'reactstrap';

export default function RadioInput({
  label,
  list,
  select,
  name,
  onChange,
  error,
  disabled,
}) {
  return (
    <FormRow label={label}>
      <FormGroup tag="fieldset">
        {list.map((row) => (
          <FormGroup check key={row.value}>
            <Label>
              <input
                type="radio"
                name={name}
                checked={select === row.value}
                onChange={() => {
                  typeof onChange === 'function' && onChange(row.value);
                }}
                disabled={disabled}
              />{' '}
              {row.label}
            </Label>
          </FormGroup>
        ))}
      </FormGroup>
      {error && <p>{error}</p>}
    </FormRow>
  );
}
RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ).isRequired,
  select: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};
RadioInput.defaultProps = {};

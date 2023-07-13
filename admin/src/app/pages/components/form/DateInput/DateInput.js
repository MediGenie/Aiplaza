import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import FormRow from '../FormRow';
import DatePicker from 'react-datepicker';
import { dateFormatter } from '@core/routes/components/fomatters';

export default function DateInput({
  label,
  value,
  onChange,
  disabled,
  name,
  error,
  placeholder,
  withTime,
}) {
  const _value = useMemo(() => {
    if (typeof value === 'string') {
      return new Date(value);
    } else if (value instanceof Date) {
      return value;
    }
    return null;
  }, [value]);
  const text = useMemo(() => {
    if (_value) {
      const mo = dateFormatter(
        _value,
        withTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'
      );
      return mo;
    }
    return placeholder;
  }, [_value, placeholder, withTime]);

  return (
    <FormRow label={label}>
      <DatePicker
        selected={_value}
        showPopperArrow={false}
        shouldCloseOnSelect
        onChange={(date) => {
          typeof onChange === 'function' && onChange(date);
        }}
        disabled={disabled}
        name={name}
        customInput={
          <button type="button" className="form-control d-block">
            {text}
          </button>
        }
        showTimeInput={withTime}
      />
      {error && <p>{error}</p>}
    </FormRow>
  );
}
DateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  withTime: PropTypes.bool,
};
DateInput.defaultProps = {
  placeholder: '날짜를 선택해주세요.',
};

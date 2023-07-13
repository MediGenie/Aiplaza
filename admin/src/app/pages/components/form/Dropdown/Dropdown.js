import React, { useCallback, useMemo, useState } from 'react';
import {
  Dropdown as RBDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import FormRow from '../FormRow';

export default function Dropdown({
  label,
  list,
  onChange,
  value,
  placeholder,
  error,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const _value = useMemo(() => {
    if (value) {
      const index = list.findIndex((row) => row.value === value);
      if (index > -1) {
        return list[index].label;
      }
    }
    return placeholder;
  }, [list, placeholder, value]);
  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <FormRow label={label}>
      <RBDropdown isOpen={open} toggle={toggle} disabled={disabled}>
        <DropdownToggle
          caret
          onChange={(e) => console.log(e)}
          disabled={disabled}
        >
          {_value}
        </DropdownToggle>
        <DropdownMenu>
          {list.map((row) => (
            <DropdownItem
              key={row.value}
              onClick={() =>
                typeof onChange === 'function' && onChange(row.value)
              }
              disabled={disabled}
            >
              {row.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </RBDropdown>
      {error && <p>{error}</p>}
    </FormRow>
  );
}
Dropdown.propTypes = {
  label: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};
Dropdown.defaultProps = {
  placeholder: '선택해주세요.',
  list: [],
};

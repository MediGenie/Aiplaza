import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
} from 'reactstrap';

export default function DropDownInput({
  label,
  value,
  menulist = [],
  onChange,
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const onClickHandler = useCallback((value) => {
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }, []);
  return (
    <FormGroup row>
      <Label sm={3}>{label}</Label>
      <Col sm={7}>
        <Dropdown isOpen={isOpen} toggle={toggle} disabled={disabled}>
          <DropdownToggle caret={!disabled}>{value}</DropdownToggle>
          <DropdownMenu>
            {menulist.map(({ value, text }) => {
              return (
                <DropdownItem key={value} onClick={() => onClickHandler(value)}>
                  {text}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </Col>
    </FormGroup>
  );
}
DropDownInput.propTypes = {
  label: PropTypes.string.isRequired,
  menulist: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, text: PropTypes.string })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
DropDownInput.defaultProps = {
  value: '마음까지 차분해지는 릴렉스 매장음악',
  menulist: [],
  onChange: () => console.log('함수를 정의해주세요'),
  disabled: false,
};

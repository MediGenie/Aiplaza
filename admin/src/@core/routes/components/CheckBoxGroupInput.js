import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, CustomInput, FormGroup, Label } from 'reactstrap';

export default function CheckBoxGroupInput({
  value,
  setValue,
  disabled,
  labels,
  label,
}) {
  const onClickHandler = useCallback(
    (e) => {
      if (disabled) return;
      if (typeof setValue === 'function') {
        const id = e.target.id;
        setValue(id, !value[id]);
      }
    },
    [value]
  );
  return (
    <FormGroup row>
      <Label className="form-label" sm={3}>
        {label || '입력해주세요'}
      </Label>
      <Col sm={7}>
        {Object.entries(value).map(([key, value]) => {
          if (key === 'tradition') return null;
          return (
            <CustomInput
              type="checkbox"
              label={labels[key] || '입력해주세요'}
              id={key}
              key={key}
              checked={value}
              onChange={onClickHandler}
              disabled={disabled}
            />
          );
        })}
      </Col>
    </FormGroup>
  );
}

CheckBoxGroupInput.propTypes = {
  value: PropTypes.object,
  labels: PropTypes.object,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
};
CheckBoxGroupInput.defaultProps = {
  value: {},
  labels: {},
  setValue: () => {},
  disabled: false,
};

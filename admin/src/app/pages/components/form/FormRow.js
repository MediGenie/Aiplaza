import React from 'react';
import { Col, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

export default function FormRow({ label, labelMultiline = '', children }) {
  return (
    <FormGroup row>
      <Col sm={3}>
        <Label>
          {label}
          {labelMultiline && (
            <>
              <br />
              {labelMultiline}
            </>
          )}
        </Label>
      </Col>
      <Col sm={7}>{children}</Col>
    </FormGroup>
  );
}

FormRow.propTypes = {
  label: PropTypes.string.isRequired,
  labelMultiline: PropTypes.string.isRequired,
  children: PropTypes.any,
};
FormRow.defaultProps = {};

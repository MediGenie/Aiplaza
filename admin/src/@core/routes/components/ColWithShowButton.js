import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Col, InputGroup } from '../../components';

const ShowModalButton = ({ btnWord, onClickBtn }) => {
  return (
    <Button color="info" onClick={onClickBtn}>
      {btnWord}
    </Button>
  );
};
const ColWithShowButton = ({ label, btnWord, onClickBtn }) => {
  return (
    <FormGroup row>
      <Label className="form-label" for="form-name" sm={3}>
        {label}
      </Label>
      <Col sm={7}>
        <InputGroup>
          <ShowModalButton btnWord={btnWord} onClickBtn={onClickBtn} />
        </InputGroup>
      </Col>
    </FormGroup>
  );
};

export default ColWithShowButton;

ColWithShowButton.propTypes = {
  label: PropTypes.string,
  btnWord: PropTypes.string,
  onClickBtn: PropTypes.func,
};

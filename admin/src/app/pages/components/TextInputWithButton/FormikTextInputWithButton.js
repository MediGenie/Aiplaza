import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field } from 'formik';
import { Button } from 'reactstrap';
import FormRow from '../form/FormRow';

export default function FormikTextInputWithButton({
  label,
  func,
  name,
  secure,
  disabledInput,
  buttonName,
  disabledButton,
  hideButton = false,
  noshowingInput = false
}) {
  return (
    <FormRow label={label}>
      <div style={{ display: 'flex' }}>
        {!noshowingInput ? <Field
          type={secure ? 'password' : 'text'}
          className="form-control"
          name={name}
          id={name}
          disabled={disabledInput}
          autoComplete="off"
        /> : <input style={{ width: '100%', height: '36px' }} disabled />}


        <div style={{ marginBottom: '1em' }}>
          {!hideButton && (
            <Button
              type="button"
              color="danger"
              disabled={disabledButton}
              onClick={func}
            >
              {buttonName}
            </Button>
          )}
        </div>
      </div>
      <ErrorMessage name={name} />
    </FormRow>
  );
}
FormikTextInputWithButton.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  secure: PropTypes.boolean,
  func: PropTypes.func,
  disabledInput: PropTypes.boolean,
  buttonName: PropTypes.string.isRequired,
  disabledButton: PropTypes.boolean,
  hideButton: PropTypes.boolean,
  noshowingInput: PropTypes.boolean,
};
FormikTextInputWithButton.defaultProps = {};

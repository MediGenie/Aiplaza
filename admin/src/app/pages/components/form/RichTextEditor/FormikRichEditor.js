import React from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from './RichTextEditor';
import { useField } from 'formik';

export default function FormikRichEditor({ name, disabled, label }) {
  const [field, meta, helper] = useField(name);
  return (
    <RichTextEditor
      name={name}
      disabled={disabled}
      label={label}
      value={field.value}
      onChange={(next) => helper.setValue(next)}
      error={meta.error}
      onBlur={field.onBlur}
    />
  );
}
FormikRichEditor.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
FormikRichEditor.defaultProps = {};

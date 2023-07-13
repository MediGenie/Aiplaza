import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PropTypes from 'prop-types';
import FormRow from '../FormRow';

// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';

const MAX = 65535;
export default function RichTextEditor({
  value,
  onChange,
  onBlur,
  disabled,
  label,
  error,
  name,
}) {
  return (
    <FormRow label={label}>
      <CKEditor
        editor={ClassicEditor}
        name={name}
        data={value}
        onChange={(_, editor) => {
          const data = editor.getData();
          if (data.length < MAX) {
            onChange && onChange(editor.getData());
          }
        }}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && <p>{error}</p>}
    </FormRow>
  );
}
RichTextEditor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};
RichTextEditor.defaultProps = {};

import React, { useCallback, useId, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BytePrettier } from '../../../../../utils/bytePrettier';
import FormRow from '../FormRow';

export default function FileInput({
  label,
  file,
  disabled,
  onChange,
  name,
  error,
  accept,
}) {
  const id = useId();
  const volumn = useMemo(() => {
    if (file) {
      const data = BytePrettier(file.size);
      return `${data.volume} ${data.unit}`;
    }
    return '0';
  }, [file]);

  const changeHandler = useCallback(
    async (file) => {
      typeof onChange === 'function' && onChange(file);
    },
    [onChange]
  );
  return (
    <FormRow label={label}>
      {file !== null && (
        <div>
          <p>{file.name}</p>
          <p>용량: {volumn}</p>
        </div>
      )}
      <input
        id={id}
        onChange={(e) => {
          const files = e.target.files;
          const file = files.item(0);
          if (file) {
            changeHandler(file);
          }
        }}
        type="file"
        hidden
        name={name}
        disabled={disabled}
        accept={accept}
      />
      {disabled !== true && (
        <label htmlFor={id} className="btn btn-primary">
          {file === null ? '업로드' : '변경'}
        </label>
      )}
      {error && <p>{error}</p>}
    </FormRow>
  );
}
FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  file: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  accept: PropTypes.string,
};
FileInput.defaultProps = {};

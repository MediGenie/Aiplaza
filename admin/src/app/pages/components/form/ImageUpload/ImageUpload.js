import React, { useId, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DefaultModal from '@core/components/Modals';

import { getImageSizeFromFile } from '../../../../../utils/getImageSizeFromFile';
import FormRow from '../FormRow';
import { BytePrettier } from '../../../../../utils/bytePrettier';

export default function ImageUpload({
  label,
  file,
  disabled,
  onChange,
  name,
  error,
  description,
  enableCancel,
}) {
  const [errorModal, setErrorModal] = useState({ show: false, message: '' });

  const id = useId();
  const volumn = useMemo(() => {
    if (file) {
      const data = BytePrettier(file.size);
      return `${data.volume} ${data.unit}`;
    }
    return '0';
  }, [file]);
  const changeHandler = async (file) => {
    if (!String.prototype.startsWith.call(file.type, 'image/')) {
      setErrorModal({ show: true, message: '이미지를 추가해 주세요.' });
      return;
    }
    try {
      const size = await getImageSizeFromFile(file);
      file.width = size.width;
      file.height = size.height;
      file.uri = size.uri;
      typeof onChange === 'function' && onChange(file);
    } catch {
      setErrorModal({
        show: true,
        message: '이미지로부터 정보를 받아올 수 없습니다.',
      });
    }
  };

  const removeHandler = () => {
    onChange && onChange(null);
  };

  return (
    <FormRow label={label}>
      {file !== null && (
        <div>
          <img
            src={file.uri}
            alt={file.name}
            style={{
              width: 150,
              height: 150,
              objectFit: 'contain',
              backgroundColor: '#00000022',
            }}
          />
          <p>용량: {volumn}</p>
          <p>
            크기: {file.width}x{file.height}
          </p>
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
        accept="image/*"
      />
      {description && <p>{description}</p>}
      <div>
        {disabled !== true && (
          <label
            htmlFor={id}
            className="btn btn-primary"
            style={{ marginBottom: 0 }}
          >
            {file === null ? '업로드' : '변경'}
          </label>
        )}
        {disabled !== true && enableCancel === true && file !== null && (
          <button
            className="btn btn-secondary ml-1"
            type="button"
            onClick={removeHandler}
          >
            삭제
          </button>
        )}
      </div>
      {error && <p>{error}</p>}
      <DefaultModal
        headerMessage="업로드 오류"
        bodyMessage={
          errorModal.message ||
          '오류가 발생하였습니다.\n잠시후 다시 시도해 주세요.'
        }
        ButtonMessage="닫기"
        isOpen={errorModal.show}
        closeFunc={() => setErrorModal((prev) => ({ ...prev, show: false }))}
      />
    </FormRow>
  );
}
ImageUpload.propTypes = {
  label: PropTypes.string.isRequired,
  file: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  description: PropTypes.string,
  enableCancel: PropTypes.bool,
};
ImageUpload.defaultProps = {
  file: null,
  disabled: false,
};

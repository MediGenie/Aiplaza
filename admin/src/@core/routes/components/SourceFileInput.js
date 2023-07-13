import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label } from 'reactstrap';
import { audioSource } from '../types/propsTypes';
import { audioSource as d_audioSource } from '../types/defaultProps';
import { getDuration, getMusicMetadata } from '../../utils/getMetadata';
// import * as mm from 'music-metadata-browser';

export default function SourceFileInput({
  label,
  value,
  onChange,
  onSetDuration,
  disabled,
  type = 'audio/*',
}) {
  const orig_key = value?.orig_key || '';
  const status = value?.status || '미등록';
  const file = value?.file || null;
  const classNames = useMemo(() => {
    if (disabled) return 'btn btn-secondary disabled';
    return 'btn btn-secondary';
  }, [disabled]);
  const filename = useMemo(() => {
    return file ? file.name : orig_key.replace('origin/', '');
  }, [file, orig_key]);
  const onChangeHandler = useCallback(
    (e) => {
      if (typeof onChange === 'function') {
        const value = e.target.files.item(0);
        if (typeof onSetDuration === 'function') {
          if (type === 'audio/*') {
            getMusicMetadata(value)
              .then(({ duration, bitrate }) => {
                console.log('label', label, ' ', duration, bitrate);
                if (label === '파일(320K)' && bitrate === 320) {
                  onChange(value);
                  onSetDuration(duration);
                } else if (label === '파일(128K)' && bitrate === 128) {
                  onChange(value);
                  onSetDuration(duration);
                } else {
                  alert(`${label}을 올려주세요.`);
                  return;
                }
              })
              .catch((error) => console.log('음원 변환 에러', error));
          } else {
            const videoNameRegExp = /^[a-zA-Z0-9|s|\.|_\-]*$/;
            if (!videoNameRegExp.test(value.name))
              return alert(
                "동영상 파일 이름은 영문, 숫자, '_', '-', '.'만 포함 가능합니다."
              );
            getDuration('video', value)
              .then((duration) => {
                console.log('duration: ', duration);
                onChange(value);
                onSetDuration(duration);
              })
              .catch((error) => console.log('동영상 변환 에러', error));
          }
        }
      }
    },
    [label, onChange, onSetDuration, type]
  );
  return (
    <FormGroup row>
      <Label sm={3}>{label}</Label>
      <Col sm={7} className="d-flex flex-row justify-content-between">
        {status}
        <div className="d-flex flex-row">
          <span className="mr-3">{filename}</span>
          <label className={classNames}>
            <input
              type="file"
              className="d-none"
              onChange={onChangeHandler}
              accept={type}
              disabled={disabled}
            />
            파일 찾기
          </label>
        </div>
      </Col>
    </FormGroup>
  );
}

SourceFileInput.propTypes = {
  ...audioSource,
  label: PropTypes.string,
};

SourceFileInput.defaultProps = {
  ...d_audioSource,
  label: '레이블',
};

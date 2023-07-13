import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { BytePrettier } from '../../utils/bytePrettier';

export default function ImagePreview({
  source,
  size,
  filename,
  width,
  height,
  uri,
}) {
  const volumn = useMemo(() => {
    const data = BytePrettier(size);
    return `${data.volume} ${data.unit}`;
  }, [size]);
  if (typeof source === 'undefined' && typeof uri === 'undefined') {
    return (
      <div>
        <p>이미지가 존재하지 않습니다.</p>
      </div>
    );
  }
  return (
    <div>
      <img
        style={{
          width: 150,
          height: 150,
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
        }}
        src={source || uri}
        alt={filename}
      />
      {typeof size !== 'undefined' && <p className="text-center">{volumn}</p>}
      {typeof height !== 'undefined' && typeof width !== 'undefined' && (
        <p className="text-center">
          크기: {width}x{height}
        </p>
      )}
    </div>
  );
}
ImagePreview.propTypes = {
  source: PropTypes.string,
  uri: PropTypes.string,
  size: PropTypes.number,
  filename: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
ImagePreview.defaultProps = {};

import React from 'react';
import 'moment/locale/ko';
import moment from 'moment-timezone';

export const dateFormatter = (cell, format = 'YYYY.MM.DD') => {
  if (cell) {
    return moment(cell).tz('Asia/Seoul').format(format);
  }
  return '-';
};

export const booleanFormatter = (cell) => {
  if (cell) {
    return 'O';
  }
  return 'X';
};

export const NumberFormatter = (cell) => {
  if (cell instanceof Number) {
    return cell.toLocaleString('ko-KR');
  }
  try {
    const data = parseInt(cell);
    return data.toLocaleString('ko-KR');
  } catch {
    return 'NaN';
  }
};

export const ImagePreviewFormatter = (cell, other) => {
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
        src={cell.url}
        alt={cell.originalName}
      />
      {cell.size && (
        <p style={{ textAlign: 'center' }}>
          용량:{' '}
          {Math.round(cell.size / 1024) > 900
            ? `${Math.round((cell.size / 1024 / 1024) * 100) / 100}MB`
            : `${Math.round((cell.size / 1024) * 100) / 100}KB`}
        </p>
      )}
      {(cell.width || other.resolutionWidth) &&
        (cell.height || other.resolutionHeight) && (
          <p style={{ textAlign: 'center' }}>
            크기: {cell.width | other.resolutionWidth}x
            {cell.height | other.resolutionHeight}
          </p>
        )}
    </div>
  );
};

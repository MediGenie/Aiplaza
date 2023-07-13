import moment from 'moment-timezone';
import React from 'react';

import ImagePreview from './ImagePreview';

export function ImagePreviewFormatter(cell) {
  return <ImagePreview {...cell} />;
}

export const dateFormatter = (cell, format) => {
  if (cell) {
    return moment(cell).tz('Asia/Seoul').format(format);
  }
  return '-';
};

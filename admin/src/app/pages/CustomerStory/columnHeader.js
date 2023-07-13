import React from 'react';
import moment from 'moment-timezone';

export const columnHeader = [
  {
    dataField: '_id',
    text: 'No.',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'name',
    text: '사례명',
    align: 'center',
    headerAlign: 'center',
    sort: false,
    formatter: (cell) => {
      return <p style={{ whiteSpace: 'pre-line' }}>{cell}</p>;
    },
  },
  {
    dataField: 'download_count',
    text: '다운로드 횟수',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'created_at',
    text: '등록일',
    align: 'center',
    headerAlign: 'center',
    sort: false,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

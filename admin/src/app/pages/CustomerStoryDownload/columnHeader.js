import React from 'react';
import moment from 'moment-timezone';

export const columnHeader = [
  {
    dataField: '_id',
    text: 'No.',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'title',
    text: '사례명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return <p style={{ whiteSpace: 'pre-line' }}>{cell}</p>;
    },
  },
  {
    dataField: 'name',
    text: '성명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'created_at',
    text: '다운로드일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
  {
    dataField: 'marketting_agree',
    text: '마케팅 활용에 대한 수집 · 이용 동의',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
];

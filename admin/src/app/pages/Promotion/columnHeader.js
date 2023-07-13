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
    text: '프로모션명',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'start_at',
    text: '시작일',
    align: 'center',
    headerAlign: 'center',
    sort: false,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
  {
    dataField: 'end_at',
    text: '종료일',
    align: 'center',
    headerAlign: 'center',
    sort: false,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

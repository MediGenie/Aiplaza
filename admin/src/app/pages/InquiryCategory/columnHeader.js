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
    dataField: 'name',
    text: '분야명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'updated_at',
    text: '수정일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
  {
    dataField: 'isPublish',
    text: '노출',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
];

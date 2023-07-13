import moment from 'moment-timezone';

export const columnHeader = [
  {
    dataField: 'index',
    text: 'No.',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'update_at',
    text: '업데이트일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
  {
    dataField: 'title',
    text: '제목',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
];

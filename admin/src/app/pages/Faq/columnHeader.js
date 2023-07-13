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
    text: '제목',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'category',
    text: '분야',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'created_at',
    text: '등록일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

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
    dataField: 'title',
    text: '기사제목',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'company',
    text: '언론사',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'written_at',
    text: '날짜',
    align: 'center',
    headerAlign: 'center',
    sort: false,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

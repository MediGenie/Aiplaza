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
    dataField: 'type',
    text: '분류',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'email',
    text: '아이디(이메일)',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'sns',
    text: 'SNS 계정정보',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'name',
    text: '이름',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'deleted_at',
    text: '탈퇴일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

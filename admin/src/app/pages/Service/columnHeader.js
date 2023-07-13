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
    dataField: 'email',
    text: '서비스 제공자',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'name',
    text: '서비스명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'created_at',
    text: '제공일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
  {
    dataField: 'price',
    text: '금액',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'buyer_count',
    text: '구매자 수',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'user_count',
    text: '이용자 수',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
];

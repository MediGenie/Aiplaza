export const columnHeader = [
  {
    dataField: 'index',
    text: 'No.',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'serviceName',
    text: '서비스명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'buyerEmail',
    text: '구매자 아이디(이메일)',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'status',
    text: '결제상태',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'method',
    text: '결제방법',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'amount',
    text: '결제금액',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'payment_at',
    text: '결제일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return cell ? cell : '-';
    },
  },
];

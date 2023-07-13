import moment from 'moment-timezone';
import { ImagePreviewFormatter } from '../../formatters';

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
    text: '파트너명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'image',
    text: '로고',
    align: 'center',
    headerAlign: 'center',
    sort: false,
    formatter: ImagePreviewFormatter,
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

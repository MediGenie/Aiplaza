import moment from 'moment-timezone';
import { ImagePreviewFormatter } from '../../formatters';

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
    text: '배너명',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'image',
    text: '배너 파일 정보',
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
    sort: false,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

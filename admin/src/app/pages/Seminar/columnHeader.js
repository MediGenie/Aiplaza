import moment from 'moment-timezone';
import { ImagePreviewFormatter } from '../../formatters';

export const columnHeader = [
  {
    dataField: '_id',
    text: 'No',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'title',
    text: '영상명',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'thumbnail',
    text: '썸네일',
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

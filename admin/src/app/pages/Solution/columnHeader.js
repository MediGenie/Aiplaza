import moment from 'moment-timezone';
import { ImagePreviewFormatter } from '../../formatters';
import { CategoryToStr } from './category';

export const columnHeader = [
  {
    dataField: '_id',
    text: 'No.',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'name',
    text: '솔루션명',
    align: 'center',
    headerAlign: 'center',
    sort: false,
  },
  {
    dataField: 'type',
    text: '분류',
    align: 'center',
    headerAlign: 'center',
    sort: false,
    formatter: (cell) => {
      console.log(cell, CategoryToStr);
      return CategoryToStr[cell];
    },
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
    sort: false,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

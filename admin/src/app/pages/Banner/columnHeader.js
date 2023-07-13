import moment from 'moment-timezone';
import { ImagePreviewFormatter } from '../../formatters';
import { BannerTypeToStr } from './banner-typeToStr';

export const columnHeader = [
  {
    dataField: '_id',
    text: 'No.',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'type',
    text: '배너유형',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => BannerTypeToStr[cell],
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
    sort: true,
    formatter: (cell) => {
      return moment.tz(cell, 'Asia/Seoul').format('YYYY.MM.DD');
    },
  },
];

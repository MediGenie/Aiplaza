import { dateFormatter } from '../../formatters';
import { recruitToStr } from './recruit.category';

export const columnHeader = [
  {
    dataField: '_id',
    text: 'No.',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'category',
    text: '분류',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return recruitToStr[cell];
    },
  },
  {
    dataField: 'title',
    text: '공고명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'start_at',
    text: '시작일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return dateFormatter(cell, 'YYYY-MM-DD(ddd) HH:mm');
    },
  },
  {
    dataField: 'end_at',
    text: '마감일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => {
      return dateFormatter(cell, 'YYYY-MM-DD(ddd) HH:mm');
    },
  },
];

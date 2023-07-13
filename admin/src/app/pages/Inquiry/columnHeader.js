import { dateFormatter } from '../../../@core/routes/components/fomatters';
import { CategoryEnumToStr } from './enumToStr';

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
    text: '문의분야',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => CategoryEnumToStr[cell] || cell,
  },
  {
    dataField: 'created_at',
    text: '문의일',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    formatter: (cell) => dateFormatter(cell),
  },
  {
    dataField: 'company',
    text: '회사명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
  {
    dataField: 'name',
    text: '성명',
    align: 'center',
    headerAlign: 'center',
    sort: true,
  },
];

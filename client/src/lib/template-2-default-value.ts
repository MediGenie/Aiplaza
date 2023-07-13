import { ColumnTypeEnum } from '../types/page-column.type';
import { PageSectionType } from '../types/page-section.type';

export const template02DefaultValue: PageSectionType[] = [
  {
    key: 'HEADER',
    label: '해더',
    columns: [
      {
        type: ColumnTypeEnum.Image,
        key: 'BG',
        label: '배경 이미지',
      },
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '타이틀',
        color: '#FFFFFF',
        content: '',
      },
      {
        type: ColumnTypeEnum.Text,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        color: '#FFFFFF',
        content: '',
      },
    ],
  },
  {
    key: 'CONTENT_01',
    label: '본문 1',
    columns: [
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '제목',
        content: '',
        color: '#007AFF',
      },
      {
        type: ColumnTypeEnum.Rich,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        content: '',
        color: '#1C1C1E',
      },
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE',
        label: '이미지',
      },
    ],
  },
  {
    key: 'CONTENT_02',
    label: '본문 2',
    columns: [
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '제목',
        content: '',
        color: '#64D2FF',
      },
      {
        type: ColumnTypeEnum.Rich,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        content: '',
        color: '#FFFFFF',
      },
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE',
        label: '이미지',
      },
    ],
  },
  {
    key: 'CONTENT_03',
    label: '본문 3',
    columns: [
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '제목',
        content: '',
        color: '#007AFF',
      },
      {
        type: ColumnTypeEnum.Rich,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        content: '',
        color: '#1C1C1E',
      },
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE1',
        label: '이미지 1',
      },
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE2',
        label: '이미지 2',
      },
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE3',
        label: '이미지 3',
      },
    ],
  },
  {
    key: 'CONTENT_04',
    label: '본문 4',
    columns: [
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '제목',
        content: '',
        color: '#1C1C1E',
      },
      {
        type: ColumnTypeEnum.Rich,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        content: '',
        color: '#AEAEB2',
      },
    ],
  },
];

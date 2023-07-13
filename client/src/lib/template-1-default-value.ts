import { ColumnTypeEnum } from '../types/page-column.type';
import { PageSectionType } from '../types/page-section.type';

export const template01DefaultValue: PageSectionType[] = [
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
      {
        type: ColumnTypeEnum.Image,
        key: 'PROFILE_ICON',
        label: '프로필 아이콘',
      },
    ],
  },
  {
    key: 'ITEM_01',
    label: '항목 1',
    columns: [
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE',
        label: '이미지',
      },
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '타이틀',
        color: '#1c1c1e',
        content: '',
      },
      {
        type: ColumnTypeEnum.Text,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        color: '#AEAEB2',
        content: '',
      },
    ],
  },
  {
    key: 'ITEM_02',
    label: '항목 2',
    columns: [
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE',
        label: '이미지',
      },
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '타이틀',
        color: '#1c1c1e',
        content: '',
      },
      {
        type: ColumnTypeEnum.Text,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        color: '#AEAEB2',
        content: '',
      },
    ],
  },
  {
    key: 'ITEM_03',
    label: '항목 3',
    columns: [
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE',
        label: '이미지',
      },
      {
        type: ColumnTypeEnum.Sentence,
        key: 'TITLE',
        label: '타이틀',
        color: '#1c1c1e',
        content: '',
      },
      {
        type: ColumnTypeEnum.Text,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        color: '#AEAEB2',
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
        color: '#9747FF',
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
      {
        type: ColumnTypeEnum.Color,
        key: 'SQUARE_COLOR',
        color: '#9747FF',
        label: '도형 색상',
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
        color: '#9747FF',
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
      {
        type: ColumnTypeEnum.Color,
        key: 'SQUARE_COLOR',
        color: '#9747FF',
        label: '도형 색상',
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
        color: '#FFFFFF',
      },
      {
        type: ColumnTypeEnum.Text,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        content: '',
        color: '#AEAEB2',
      },
      {
        type: ColumnTypeEnum.Image,
        key: 'IMAGE',
        label: '이미지',
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
        color: '#FFFFFF',
      },
      {
        type: ColumnTypeEnum.Rich,
        key: 'SUB_SENTENCE',
        label: '서브문구',
        content: '',
        color: '#FFFFFF',
      },
    ],
  },
];

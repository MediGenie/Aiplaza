import { PageColumnType } from './page-column.type';

export type PageSectionType = {
  key: string;
  label: string;
  columns: PageColumnType[];
};

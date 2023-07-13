import { PageColumnType } from '../../types/page-column.type';
import { PageSectionType } from '../../types/page-section.type';
import { templateIdEnum } from './enum/template-id';

export type PageValueType = {
  template: templateIdEnum;
  data: PageSectionType[];
  select_column: null | {
    section: string;
  };
};

export type PageDispatchType = {
  getColumn: (section_key: string, name_key: string) => PageColumnType | null;
  updateColumn: (
    section_key: string,
    name_key: string,
    data: Record<string, any>
  ) => void;
  changeTemplate: (id: templateIdEnum) => void;
  selectSection: (section: string) => void;
  getSection: (section_key: string) => PageSectionType | null;
};

export type EditorProps = {
  section: string;
  column: string;
};

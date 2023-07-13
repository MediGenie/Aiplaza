export type ServiceFormType = {
  data: ServiceFormSection[];
  select_item: {
    section: number;
    column?: number;
  } | null;
};

export type ServiceFormDispatchType = {
  getItem:
    | ((section: number) => ServiceFormSection | null)
    | ((section: number, column: number) => ServiceFormColumn | null);
  updateItem: (opts: {
    section: number;
    column?: number;
    data: Record<string, any>;
    replace?: boolean;
  }) => void;
  selectItem: (opts: { section: number; column?: number }) => void;
  insertSection: (item: ServiceFormSection, index: number) => void;
  insertColumn: (
    item: ServiceFormColumn,
    section_index: number,
    column_index: number
  ) => void;
  removeSection: (index: number) => void;
  removeColumn: (section_index: number, column_index: number) => void;
};

export type ServiceFormSection = {
  label: string;
  description: string;
  column: ServiceFormColumn[];
};

export enum FormColumnType {
  TEXT = 'text',
  TITLE = 'title',
  NUMBER = 'number',
  FILE = 'file',
  DROPROWN = 'droprown',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SLIDE = 'slide',
  SPINNER = 'spinner',
  LINEAR = 'linear',
}

export type ServiceFormColumn =
  | ServiceFormTitleColumn
  | ServiceFormNumberColumn
  | ServiceFormTextColumn
  | ServiceFormFileUploadColumn
  | ServiceFormDropDownColumn
  | ServiceFormRadioColumn
  | ServiceFormCheckboxColumn
  | ServiceFormSliderColumn
  | ServiceFormSpinnerColumn
  | ServiceFormLinearColumn;

export type ServiceFormTitleColumn = {
  type: FormColumnType.TITLE;
  label: string;
  description: string;
  image?: null | (File & { url: string });
};

export type ServiceFormNumberColumn = {
  type: FormColumnType.NUMBER;
  label: string;
  description: string;
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
  required: boolean;
};

export type ServiceFormTextColumn = {
  type: FormColumnType.TEXT;
  label: string;
  description: string;
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
  required: boolean;
};

export type ServiceFormFileUploadColumn = {
  type: FormColumnType.FILE;
  label: string;
  description: string;
  required: boolean;
  allow_mime: string[];
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
  limit_file_number: number;
  limit_file_size: number;
};

export type ServiceFormDropDownColumn = {
  type: FormColumnType.DROPROWN;
  label: string;
  description: string;
  required: boolean;
  items: string[];
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
};

export type ServiceFormRadioColumn = {
  type: FormColumnType.RADIO;
  label: string;
  description: string;
  required: boolean;
  items: string[];
  etc_field: boolean;
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
};

export type ServiceFormCheckboxColumn = {
  type: FormColumnType.CHECKBOX;
  label: string;
  description: string;
  required: boolean;
  items: string[];
  etc_field: boolean;
  max_checkbox_count: number;
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
};

export type ServiceFormSliderColumn = {
  type: FormColumnType.SLIDE;
  label: string;
  description: string;
  required: boolean;
  fixed_slide: boolean;
  min_slide: number;
  max_slide: number;
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
};

export type ServiceFormSpinnerColumn = {
  type: FormColumnType.SPINNER;
  label: string;
  description: string;
  required: boolean;
  spinner_init: number;
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
};

export type ServiceFormLinearColumn = {
  type: FormColumnType.LINEAR;
  label: string;
  description: string;
  required: boolean;
  min_linear: number;
  max_linear: number;
  min_linear_label: string;
  max_linear_label: string;
  image: null | (File & { url: string });
  table: Array<{ rows: string[] }> | null;
};

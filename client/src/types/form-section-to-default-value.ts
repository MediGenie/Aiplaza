import {
  FormColumnType,
  ServiceFormSection,
} from '../components/ServiceFormEditor/types';

export function formSectionToDefaultValue(data: ServiceFormSection[]) {
  const shape: Record<string, any> = {
    receive_email: false,
  };

  data.forEach((section, section_index) => {
    const section_field = `SECTION_${section_index + 1}`;
    section.column.forEach((column, column_index) => {
      const shape_field = `${section_field}_ITEM_${column_index + 1}`;
      if (column.type === FormColumnType.TEXT) {
        shape[shape_field] = '';
      } else if (column.type === FormColumnType.NUMBER) {
        shape[shape_field] = '';
      } else if (column.type === FormColumnType.FILE) {
        shape[shape_field] = [];
      } else if (column.type === FormColumnType.SPINNER) {
        shape[shape_field] = column.spinner_init;
      } else if (column.type === FormColumnType.SLIDE) {
        if (column.fixed_slide) {
          shape[shape_field] = [column.max_slide];
        } else {
          shape[shape_field] = [column.min_slide, column.max_slide];
        }
      } else if (column.type === FormColumnType.RADIO) {
        shape[shape_field] = null;
      } else if (column.type === FormColumnType.LINEAR) {
        shape[shape_field] = column.min_linear;
      } else if (column.type === FormColumnType.DROPROWN) {
        shape[shape_field] = '';
      } else if (column.type === FormColumnType.CHECKBOX) {
        shape[shape_field] = [];
      }
    });
  });
  return shape;
}

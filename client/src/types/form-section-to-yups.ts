import * as yup from 'yup';
import {
  FormColumnType,
  ServiceFormSection,
} from '../components/ServiceFormEditor/types';

export function formSectionToYups(data: ServiceFormSection[]) {
  const shape: Record<string, yup.BaseSchema> = {};

  data.forEach((section, section_index) => {
    const section_field = `SECTION_${section_index + 1}`;
    section.column.forEach((column, column_index) => {
      const shape_field = `${section_field}_ITEM_${column_index + 1}`;
      if (column.type === FormColumnType.TEXT) {
        shape[shape_field] = yup.string();
        if (column.required) {
          shape[shape_field] =
            shape[shape_field].required('내용을 입력해 주세요.');
        }
      } else if (column.type === FormColumnType.FILE) {
        let fileSchema = yup
          .mixed()
          .test('file', '파일이 아닙니다.', (value: any) => {
            return value instanceof File;
          });

        if (
          column.allow_mime &&
          column.allow_mime instanceof Array &&
          column.allow_mime.length > 0
        ) {
          const uploadable_ext: string[] = [];
          if (column.allow_mime.includes('dicom')) {
            uploadable_ext.push('dicom');
          } else if (column.allow_mime.includes('img')) {
            uploadable_ext.push('jpg');
            uploadable_ext.push('jpeg');
            uploadable_ext.push('png');
          } else if (column.allow_mime.includes('mii')) {
            uploadable_ext.push('mii');
          } else if (column.allow_mime.includes('gif')) {
            uploadable_ext.push('gif');
          }
          fileSchema = fileSchema.test(
            'file type',
            '해당 확장자의 파일을 지원하지 않습니다.',
            (value: any) => {
              if (value instanceof File) {
                const ext = value.name.split('.').pop()?.toLocaleLowerCase();
                return uploadable_ext.includes(ext || '');
              }
              return true;
            }
          );
        }

        if (column.limit_file_size && column.limit_file_size > 0) {
          fileSchema = fileSchema.test(
            'file size',
            '파일의 크기가 너무 큽니다.',
            (value: any) => {
              if (value instanceof File) {
                const fileMB = value.size / 1000000;

                return fileMB <= column.limit_file_size;
              }
              return true;
            }
          );
        }
        let arraySchema = yup.array(fileSchema);
        if (column.limit_file_number) {
          arraySchema = arraySchema.max(
            column.limit_file_number,
            `파일은 최대 ${column.limit_file_number}개까지 업로드 가능합니다.`
          );
        }
        if (column.required) {
          arraySchema = arraySchema.min(1, '파일을 업로드해 주세요.');
        }
        shape[shape_field] = arraySchema;
      } else if (column.type === FormColumnType.DROPROWN) {
        let strSchema = yup
          .string()
          .oneOf(column.items, '잘못된 값이 선택되었습니다.');
        if (column.required) {
          strSchema = strSchema.required('항목을 선택해 주세요.');
        }
        shape[shape_field] = strSchema;
      } else if (column.type === FormColumnType.RADIO) {
        let strSchema = yup.string().nullable();
        if (column.required) {
          strSchema = strSchema.required('값을 선택해 주세요.');
        }
        shape[shape_field] = strSchema;
      } else if (column.type === FormColumnType.CHECKBOX) {
        const strSchema = yup.string();
        let arrSchema = yup.array(strSchema);
        if (column.max_checkbox_count) {
          arrSchema = arrSchema.max(
            column.max_checkbox_count,
            `최대 ${column.max_checkbox_count}개 까지 선택할 수 있습니다.`
          );
        }
        if (column.required) {
          arrSchema = arrSchema.min(1, '항목을 선택해 주세요.');
        }
        shape[shape_field] = arrSchema;
      } else if (column.type === FormColumnType.SLIDE) {
        const numSchema = yup
          .number()
          .min(column.min_slide, '최소 제한을 넘었습니다.')
          .max(column.max_slide, '최대 제한을 넘었습니다.');
        let arrSchema = yup.array(numSchema);
        if (column.fixed_slide) {
          arrSchema = arrSchema.length(1, '잘못된 값이 선택되었습니다.');
        } else {
          arrSchema = arrSchema.length(2, '잘못된 값이 선택되었습니다.');
        }
        shape[shape_field] = arrSchema;
      } else if (column.type === FormColumnType.SPINNER) {
        let numSchema = yup.number();
        if (column.required) {
          numSchema = numSchema.required('값을 입력해 주세요.');
        }
        shape[shape_field] = numSchema;
      } else if (column.type === FormColumnType.LINEAR) {
        const numSchema = yup
          .number()
          .min(column.min_linear, '최소 제한을 넘었습니다.')
          .max(column.max_linear, '최대 제한을 넘었습니다.');
        shape[shape_field] = numSchema;
      } else if (column.type === FormColumnType.NUMBER) {
        let numSchema = yup
          .string()
          .matches(/(^[0-9]+$|^$)/g, '숫자만 입력해 주세요.');
        if (column.required) {
          numSchema = numSchema.required('값을 입력해 주세요.');
        }
        shape[shape_field] = numSchema;
      }
    });
  });
  return yup.object().shape(shape);
}

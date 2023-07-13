import {
  cehckbox,
  dropdown,
  fileupload,
  linearField,
  numberField,
  radioField,
  sliderField,
  spinerField,
  textField,
  title,
} from '../../icons';
import { FormColumnType } from './types';

export const ColumnTypeToIconMap: Record<FormColumnType, string> = {
  [FormColumnType.TITLE]: title,
  [FormColumnType.TEXT]: textField,
  [FormColumnType.NUMBER]: numberField,
  [FormColumnType.FILE]: fileupload,
  [FormColumnType.DROPROWN]: dropdown,
  [FormColumnType.RADIO]: radioField,
  [FormColumnType.CHECKBOX]: cehckbox,
  [FormColumnType.SLIDE]: sliderField,
  [FormColumnType.SPINNER]: spinerField,
  [FormColumnType.LINEAR]: linearField,
};

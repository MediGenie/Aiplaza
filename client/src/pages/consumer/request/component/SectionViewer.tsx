import { FC } from "react";
import { SectionInputBox } from "../../../../components/ServiceFormEditor/components/SectionInputBox";
import { SectionInputLine } from "../../../../components/ServiceFormEditor/components/SectionInputLine";
import {
  FormColumnType,
  ServiceFormSection,
} from "../../../../components/ServiceFormEditor/types";
import { CheckBoxInput } from "./CheckboxInput";
import { DropdownInput } from "./DropdownInput";
import { FilesUploadInput } from "./FilesUploadInput";
import { LinearSlideInput } from "./LinearSlideInput";
import { NumberInput } from "./NumberInput";
import { RadioInput } from "./RadioInput";
import { SliderInput } from "./SliderInput";
import { SpinnerInput } from "./SpinnerInput";
import { TextInput } from "./TextInput";
import { TitlePresenter } from "./TitlePresenter";

interface SectionViewerProps {
  form_value: ServiceFormSection;
  user_response_value: any;
  index: number;
  // isLast?: boolean;
}

export const SectionViewer: FC<SectionViewerProps> = ({
  index,
  form_value,
  user_response_value,
}) => {
  return (
    <div>
      <div className="rounded-t px-10 py-3 bg-gradient-to-b from-[#003876] to-[#001a58] inline-block">
        <p className="text-b3 font-bold text-white">
          <span className="text-yellow500">{index + 1}</span>/
          <span>{index + 1}</span>
        </p>
      </div>
      <div className="bg-blue800 p-10 rounded rounded-tl-none">
        <div className="flex items-center space-x-5">
          <SectionInputBox
            className="flex-1"
            placeholder="(필수) 섹션명을 입력해 주세요."
            value={form_value.label}
            disabled
          />
        </div>
        <SectionInputLine
          className="mt-5 block w-full"
          placeholder={
            form_value.description ? "(선택) 설명을 입력해 주세요." : ""
          }
          value={form_value.description}
          disabled
        />
      </div>
      <div className="py-10 space-y-10">
        {form_value.column.map((column, column_index) => {
          const field = `SECTION_${index + 1}_ITEM_${column_index + 1}`;
          const uservalue = user_response_value[field];
          if (column.type === FormColumnType.TITLE) {
            return <TitlePresenter {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.TEXT) {
            return (
              <TextInput
                {...column}
                value={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.NUMBER) {
            return (
              <NumberInput
                {...column}
                value={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.FILE) {
            return (
              <FilesUploadInput
                {...column}
                value={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.DROPROWN) {
            return (
              <DropdownInput
                {...column}
                value={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.RADIO) {
            return (
              <RadioInput
                {...column}
                value={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.CHECKBOX) {
            return (
              <CheckBoxInput
                {...column}
                value={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.SLIDE) {
            return (
              <SliderInput
                {...column}
                values={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.SPINNER) {
            return (
              <SpinnerInput
                {...column}
                values={uservalue}
                name={field}
                key={field}
              />
            );
          }
          if (column.type === FormColumnType.LINEAR) {
            return (
              <LinearSlideInput
                value={uservalue}
                {...column}
                name={field}
                key={field}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

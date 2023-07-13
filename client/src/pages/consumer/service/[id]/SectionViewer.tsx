import { FC } from "react";
import {
  FormColumnType,
  ServiceFormColumn,
} from "../../../../components/ServiceFormEditor/types";
import { CheckBoxInput } from "./components/CheckboxInput";
import { DropdownInput } from "./components/DropdownInput";
import { FilesUploadInput } from "./components/FilesUploadInput";
import { LinearSlideInput } from "./components/LinearSlideInput";
import { NumberInput } from "./components/NumberInput";
import { RadioInput } from "./components/RadioInput";
import { ReceiveEmail } from "./components/ReceiveEmail";
import { SliderInput } from "./components/SliderInput";
import { SpinnerInput } from "./components/SpinnerInput";
import { TextInput } from "./components/TextInput";
import { TitlePresenter } from "./components/TitlePresenter";

interface SectionViewerProps {
  data: ServiceFormColumn[];
  label: string;
  description: string;
  step: number;
  isLast?: boolean;
}

export const SectionViewer: FC<SectionViewerProps> = ({
  data,
  description,
  label,
  step,
  isLast,
}) => {
  return (
    <div>
      <div className="bg-blue800 py-5 px-10">
        <div className="flex items-center">
          <div className="inline-block border border-white rounded w-6 h-6 text-center mr-2.5">
            <span className="text-white text-b3 font-medium">{step}</span>
          </div>
          <p className="text-white font-bold text-b1">{label}</p>
        </div>
        {description && (
          <p className="mt-[5px] text-b2 text-white">{description}</p>
        )}
      </div>
      <div className="container-sm py-10 space-y-10">
        {data.map((column, column_index) => {
          const field = `SECTION_${step}_ITEM_${column_index + 1}`;
          if (column.type === FormColumnType.TITLE) {
            return <TitlePresenter {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.TEXT) {
            return <TextInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.NUMBER) {
            return <NumberInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.FILE) {
            return <FilesUploadInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.DROPROWN) {
            return <DropdownInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.RADIO) {
            return <RadioInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.CHECKBOX) {
            return <CheckBoxInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.SLIDE) {
            return <SliderInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.SPINNER) {
            return <SpinnerInput {...column} name={field} key={field} />;
          }
          if (column.type === FormColumnType.LINEAR) {
            return <LinearSlideInput {...column} name={field} key={field} />;
          }
          return null;
        })}
        {isLast && <ReceiveEmail />}
      </div>
    </div>
  );
};

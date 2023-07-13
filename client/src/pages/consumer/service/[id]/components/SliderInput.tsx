import { useField } from "formik";
import { FC } from "react";
import { FormRow } from "../../../../../components/FormRow";
import { RangeSlide } from "../../../../../components/RangeSlide";
import { ServiceFormSliderColumn } from "../../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "./TablePresenter";

interface SliderInputProps extends ServiceFormSliderColumn {
  name: string;
}

export const SliderInput: FC<SliderInputProps> = ({
  description,
  image,
  label,
  max_slide,
  min_slide,
  name,
  required,
  table,
}) => {
  const [props, , helper] = useField(name);
  return (
    <div className="bg-white p-10 rounded border border-gray100">
      <FormRow label={label} required={required}>
        <div className="space-y-1.5">
          {description && (
            <p className="text-[14px] leading-[22px] text-gray600">
              {description}
            </p>
          )}
          <RangeSlide
            value={props.value}
            min={min_slide}
            max={max_slide}
            onChange={(next) => helper.setValue(next)}
          />
          <div className="flex justify-between">
            <p className="text-gray600 text-[14px] leading-[22px]">
              {min_slide}
            </p>
            <p className="text-gray600 text-[14px] leading-[22px]">
              {max_slide}
            </p>
          </div>
        </div>
      </FormRow>
      {image?.url && (
        <img src={image.url} alt="" className="w-full object-contain" />
      )}
      {table && <TablePresenter data={table} />}
    </div>
  );
};

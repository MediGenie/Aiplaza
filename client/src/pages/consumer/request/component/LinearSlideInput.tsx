import { useField } from "formik";
import { FC } from "react";
import { FormRow } from "../../../../components/FormRow";
import { LinearSlide } from "../../../../components/LinearSlide";
import { ServiceFormLinearColumn } from "../../../../components/ServiceFormEditor/types";

interface LinearSlideInputProps extends ServiceFormLinearColumn {
  name: string;
  value: any;
}

export const LinearSlideInput: FC<LinearSlideInputProps> = ({
  description,
  image,
  label,
  max_linear,
  max_linear_label,
  min_linear,
  min_linear_label,
  name,
  required,
  table,
  value,
}) => {
  return (
    <div className="bg-white p-10 rounded border border-gray100">
      <FormRow label={label} required={required}>
        <div className="space-y-1.5">
          {description && (
            <p className="text-[14px] leading-[22px] text-gray600">
              {description}
            </p>
          )}
        </div>
        <div className="mt-2.5">
          <LinearSlide
            disabled={true}
            maxValue={max_linear}
            minValue={min_linear}
            value={value.value}
          />
        </div>
        <div className="flex justify-between ">
          <p className="text-gray600 text-[14px] leading-[22px]">
            {min_linear_label}
          </p>
          <p className="text-gray600 text-[14px] leading-[22px]">
            {max_linear_label}
          </p>
        </div>
      </FormRow>
    </div>
  );
};

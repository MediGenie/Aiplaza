import { useField } from "formik";
import { FC, useState } from "react";
import { FormRow } from "../../../../components/FormRow";
import { ServiceFormSpinnerColumn } from "../../../../components/ServiceFormEditor/types";
import { SpinnerInputBox } from "../../../../components/SpinnerInputBox";
import { TablePresenter } from "./TablePresenter";

interface SpinnerInputProps extends ServiceFormSpinnerColumn {
  name: string;
  values: any;
}

export const SpinnerInput: FC<SpinnerInputProps> = ({
  description,
  image,
  label,
  name,
  required,
  table,
  values,
}) => {
  const [value, setValue] = useState<number>();
  return (
    <div className="bg-white p-10 rounded border border-gray100">
      <FormRow label={label} required={required}>
        <div className="space-y-1.5">
          {description && (
            <p className="text-[14px] leading-[22px] text-gray600">
              {description}
            </p>
          )}
          <div className="flex justify-end">
            <SpinnerInputBox
              value={values.value}
              disabled={true}
              onChange={(next) => {
                setValue(next);
              }}
              placeholder="0"
            />
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

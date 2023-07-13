import { useField } from "formik";
import { FC } from "react";
import { FormRow } from "../../../../components/FormRow";
import { InputBox } from "../../../../components/InputBox";
import { ServiceFormNumberColumn } from "../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "./TablePresenter";

interface NumberInputProps extends ServiceFormNumberColumn {
  name: string;
  value: any;
}

export const NumberInput: FC<NumberInputProps> = ({
  description,
  image,
  label,
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
          <InputBox
            value={value.value}
            className="block w-full !bg-white !text-black"
            placeholder="숫자만 입력해 주세요."
            disabled={true}
          />
        </div>
      </FormRow>
      {image?.url && (
        <img src={image.url} alt="" className="w-full object-contain" />
      )}
      {table && <TablePresenter data={table} />}
    </div>
  );
};

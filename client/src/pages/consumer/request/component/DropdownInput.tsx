import { useField } from "formik";
import { FC } from "react";
import { DropDown } from "../../../../components/DropDown";
import { FormRow } from "../../../../components/FormRow";
import { ServiceFormDropDownColumn } from "../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "./TablePresenter";

interface DropdownInputProps extends ServiceFormDropDownColumn {
  name: string;
  value: any;
}

export const DropdownInput: FC<DropdownInputProps> = ({
  description,
  image,
  items,
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
          <DropDown
            data={items.map((item) => ({ label: item, value: item }))}
            value={value.value}
            placeholder="선택해 주세요."
            className="w-full block"
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

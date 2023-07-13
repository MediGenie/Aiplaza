import { useField } from "formik";
import { FC } from "react";
import { FormRow } from "../../../../../components/FormRow";
import { ServiceFormSpinnerColumn } from "../../../../../components/ServiceFormEditor/types";
import { SpinnerInputBox } from "../../../../../components/SpinnerInputBox";
import { TablePresenter } from "../../../request/component/TablePresenter";

interface SpinnerInputProps extends ServiceFormSpinnerColumn {
  name: string;
}

export const SpinnerInput: FC<SpinnerInputProps> = ({
  description,
  image,
  label,
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
          <div className="flex justify-end">
            <SpinnerInputBox
              value={props.value}
              onChange={(next) => {
                helper.setValue(next);
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

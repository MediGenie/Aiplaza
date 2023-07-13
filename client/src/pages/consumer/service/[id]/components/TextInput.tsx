import { useField } from "formik";
import { FC } from "react";
import { FormRow } from "../../../../../components/FormRow";
import { InputBox } from "../../../../../components/InputBox";
import { ServiceFormTextColumn } from "../../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "../../../request/component/TablePresenter";

interface TextInputProps extends ServiceFormTextColumn {
  name: string;
}

export const TextInput: FC<TextInputProps> = ({
  description,
  image,
  label,
  name,
  required,
  table,
}) => {
  const [props] = useField(name);
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
            className="block w-full"
            placeholder="입력해 주세요."
            {...props}
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

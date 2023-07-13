import { useField } from "formik";
import { FC } from "react";
import { FormRow } from "../../../../components/FormRow";
import { InputBox } from "../../../../components/InputBox";
import { ServiceFormTextColumn } from "../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "./TablePresenter";

interface TextInputProps extends ServiceFormTextColumn {
  name: string;
  value: any;
}

export const TextInput: FC<TextInputProps> = ({
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
            placeholder={
              value.description
                ? "(선택) 설명을 입력해 주세요."
                : "응답하지 않았습니다."
            }
            disabled={true}
          />
        </div>
      </FormRow>
      {/* TODO 패딩값이나 마진값 윤희님이 추가해주시면 변경 */}
      {image?.url && (
        <img src={image.url} alt="" className="w-full object-contain" />
      )}
      {table && <TablePresenter data={table} />}
    </div>
  );
};

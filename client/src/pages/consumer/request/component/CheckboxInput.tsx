import classNames from "classnames";
import { useField } from "formik";
import { FC, useMemo, useState } from "react";
import { CheckBox } from "../../../../components/CheckBox";
import { FormRow } from "../../../../components/FormRow";
import { InputBox } from "../../../../components/InputBox";
import { ServiceFormCheckboxColumn } from "../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "./TablePresenter";

interface CheckBoxInputProps extends ServiceFormCheckboxColumn {
  name: string;
  value: any;
}

export const CheckBoxInput: FC<CheckBoxInputProps> = ({
  description,
  etc_field,
  image,
  items,
  label,
  name,
  required,
  table,
  type,
  max_checkbox_count,
  value,
}) => {
  const [etc, setEtc] = useState("etc:");
  const _items = useMemo(() => {
    const arr = items.map((item) => ({ value: item, label: item }));
    if (etc_field === true) {
      arr.push({ value: etc, label: etc.replace("etc:", "") });
      setEtc(value.value[value.value.length - 1]);
    }
    return arr;
  }, [etc, etc_field, items]);
  return (
    <div className="bg-white p-10 rounded border border-gray100">
      <FormRow label={label} required={required}>
        <div className="space-y-1.5">
          {description && (
            <p className="text-[14px] leading-[22px] text-gray600">
              {description}
            </p>
          )}
          <div className="space-y-5 pt-3">
            {_items.map((item, i) => {
              return (
                <div className={classNames("flex space-x-2.5")} key={i}>
                  <CheckBox
                    value={
                      value.value.indexOf(_items[i].value) === -1 ? false : true
                    }
                    disabled={true}
                  />
                  {i === items.length ? (
                    <div className="space-y-2.5 w-full max-w-[614px]">
                      <p className="text-b3">기타</p>
                      {item.value !== "etc:" ? (
                        <InputBox
                          disabled={true}
                          className="w-full !bg-white !text-black"
                          placeholder="입력해 주세요."
                          value={etc.replace("etc:", "")}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <span className="text-b3">{item.label}</span>
                  )}
                </div>
              );
            })}
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

import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { useField } from "formik";
import { FC, useMemo, useState } from "react";
import { FormRow } from "../../../../components/FormRow";
import { InputBox } from "../../../../components/InputBox";
import { ServiceFormRadioColumn } from "../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "./TablePresenter";

interface RadioInputProps extends ServiceFormRadioColumn {
  name: string;
  value: any;
}

export const RadioInput: FC<RadioInputProps> = ({
  description,
  etc_field,
  image,
  items,
  label,
  name,
  required,
  table,
  type,
  value,
}) => {
  const [etc, setEtc] = useState("etc:");
  const _items = useMemo(() => {
    const arr = items.map((item) => ({ value: item, label: item }));
    if (etc_field === true) {
      arr.push({ value: etc, label: etc.replace("etc:", "") });
      setEtc(value.value);
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
          <RadioGroup disabled={true} className="space-y-5 pt-3">
            {_items.map((item, i) => {
              return (
                <RadioGroup.Option key={i} value={item.value}>
                  {({ checked }) => {
                    return (
                      <div
                        className={classNames("flex space-x-2.5", {
                          "items-center": i !== items.length,
                        })}
                      >
                        <span className="w-6 h-6 rounded-full bg-gray200 p-1">
                          {_items[i].value === value.value && (
                            <span
                              className="block w-full h-full rounded-full bg-blue500"
                              style={{
                                boxShadow: "0px 2px 4px rgba(28, 28, 30, 0.25)",
                              }}
                            ></span>
                          )}
                        </span>
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
                  }}
                </RadioGroup.Option>
              );
            })}
          </RadioGroup>
        </div>
      </FormRow>
      {image?.url && (
        <img src={image.url} alt="" className="w-full object-contain" />
      )}
      {table && <TablePresenter data={table} />}
    </div>
  );
};

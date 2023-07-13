import classNames from "classnames";
import { useField } from "formik";
import { FC, useMemo, useState } from "react";
import { CheckBox } from "../../../../../components/CheckBox";
import { FormRow } from "../../../../../components/FormRow";
import { InputBox } from "../../../../../components/InputBox";
import { ServiceFormCheckboxColumn } from "../../../../../components/ServiceFormEditor/types";
import { TablePresenter } from "../../../request/component/TablePresenter";

interface CheckBoxInputProps extends ServiceFormCheckboxColumn {
  name: string;
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
}) => {
  const [props, , helper] = useField(name);
  const [etc, setEtc] = useState("etc:");
  const _items = useMemo(() => {
    const arr = items.map((item) => ({ value: item, label: item }));
    if (etc_field === true) {
      arr.push({ value: etc, label: etc.replace("etc:", "") });
    }
    return arr;
  }, [etc, etc_field, items]);
  const handleCheckBox = (value: string) => (next: boolean) => {
    if (next === true) {
      if ((props.value as string[]).length >= max_checkbox_count) {
        return;
      }
      const _next = Array.from(props.value as string[]);
      _next.push(value);
      helper.setValue(_next);
    } else {
      helper.setValue((props.value as string[]).filter((v) => v !== value));
    }
  };
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
              const checked = (props.value as string[]).includes(item.value);
              return (
                <div className={classNames("flex space-x-2.5")} key={i}>
                  <CheckBox
                    value={checked}
                    onChange={handleCheckBox(item.value)}
                  />
                  {i === items.length ? (
                    <div className="space-y-2.5">
                      <p className="text-b3">기타</p>
                      <InputBox
                        className="w-full"
                        placeholder="입력해 주세요."
                        value={etc.replace("etc:", "")}
                        onChange={(e) => {
                          const value = e.target.value;
                          const next = "etc:" + value;
                          setEtc((prev) => {
                            if (checked) {
                              const _next = Array.from(
                                props.value as string[]
                              ).filter((v) => v !== prev);
                              _next.push(next);
                              helper.setValue(_next);
                            }
                            return next;
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <span className="text-b3">{item.label}</span>
                  )}
                </div>
              );
            })}
          </div>
          {/* <RadioGroup
            value={props.value}
            onChange={(next) => {
              helper.setValue(next);
            }}
            className="space-y-5 pt-3"
          >
            {_items.map((item, i) => {
              return (
                <RadioGroup.Option key={i} value={item.value}>
                  {({ checked }) => {
                    return (
                      <div
                        className={classNames('flex space-x-2.5', {
                          'items-center': i !== items.length,
                        })}
                      >
                        <span className="w-6 h-6 rounded-full bg-gray200 p-1">
                          {checked && (
                            <span
                              className="block w-full h-full rounded-full bg-blue500"
                              style={{
                                boxShadow: '0px 2px 4px rgba(28, 28, 30, 0.25)',
                              }}
                            ></span>
                          )}
                        </span>
                        {i === items.length ? (
                          <div className="space-y-2.5">
                            <p className="text-b3">기타</p>
                            <InputBox
                              className="w-full"
                              placeholder="입력해 주세요."
                              value={etc.replace('etc:', '')}
                              onChange={(e) => {
                                const value = e.target.value;
                                const next = 'etc:' + value;
                                if (checked) {
                                  helper.setValue(next);
                                }
                                setEtc(next);
                              }}
                            />
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
          </RadioGroup> */}
        </div>
      </FormRow>
      {image?.url && (
        <img src={image.url} alt="" className="w-full object-contain" />
      )}
      {table && <TablePresenter data={table} />}
    </div>
  );
};

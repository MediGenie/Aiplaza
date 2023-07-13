import { FC, useMemo } from "react";
import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import "./style.css";
import { grayDownTriangle, grayUpTriangle } from "../../icons";
import { IsUndefined } from "../../lib/IsUndefined";

export type DropDownData<T = any> = {
  label: any;
  value: T;
};

interface DropDownProps<T = any> {
  value?: T;
  data: DropDownData<T>[];
  onChange?: (next: T) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

export const DropDown: FC<DropDownProps> = ({
  data,
  className,
  onChange,
  placeholder = "선택해 주세요.",
  value,
  error = false,
  disabled,
}) => {
  const label = useMemo(() => {
    if (IsUndefined(value)) {
      return placeholder;
    }
    const item = data.find((v) => v.value === value);
    if (!item) {
      return "알 수 없는 값";
    }
    return item.label;
  }, [data, placeholder, value]);
  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button
          className={({ open }) =>
            classNames(
              "listbox-btn",
              {
                open: open === false,
                error: open === false && error === true,
              },
              className
            )
          }
        >
          {({ open }) => {
            return (
              <>
                <span
                  className={classNames("text-b3", {
                    "text-gray400": IsUndefined(value),
                  })}
                >
                  {label}
                </span>
                <img
                  src={open ? grayUpTriangle : grayDownTriangle}
                  alt={open ? "열림" : "닫힘"}
                  className="ml-3 w-4 h-4"
                />
              </>
            );
          }}
        </Listbox.Button>
        <div>
          <Listbox.Options className="absolute border border-t-0 border-gray300 rounded-b left-0 right-0 overflow-auto z-10">
            <div className="max-h-48">
              {data.map((item, itemIndex) => {
                return (
                  <Listbox.Option
                    value={item.value}
                    key={itemIndex}
                    className={({ active }) =>
                      classNames("listbox-option", {
                        "bg-white": active === false,
                        "bg-gray50": active === true,
                      })
                    }
                  >
                    {({ active }) => {
                      return (
                        <span
                          className={classNames("text-b3", {
                            "text-blue500": active === true,
                            "text-gray600": active === false,
                          })}
                        >
                          {item.label}
                        </span>
                      );
                    }}
                  </Listbox.Option>
                );
              })}
            </div>
          </Listbox.Options>
        </div>
      </div>
    </Listbox>
  );
};

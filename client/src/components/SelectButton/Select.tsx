import { FC, Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FilterButton } from "../../assets";
import classNames from "classnames";

interface SelectProps {
  data: { label: string; value: any }[];
  value: any;
  setValue: (next: any) => void;
  placeholder?: string;
  img?: string;
  imgAlt?: string;
}

export const Select: FC<SelectProps> = ({
  data,
  value,
  setValue,
  placeholder = "선택해주세요.",
  img = FilterButton,
  imgAlt = "필터",
}) => {
  const [rounded, setRounded] = useState(false);
  const label = useMemo(() => {
    const item = data.find((v) => v.value === value);
    if (item === undefined) {
      return placeholder;
    }
    return item.label;
  }, [data, placeholder, value]);

  return (
    <Listbox
      value={value}
      onChange={(next) => {
        setValue(next);
      }}
    >
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            className={classNames(
              "bg-gray100 px-5 py-2 flex items-center space-x-0.5",
              {
                "rounded-full": open === false,
              },
              {
                "rounded-t-xl": open === true,
              }
            )}
          >
            <span className="mr-[17px] text-b3 text-gray400">{label}</span>
            <img src={img} alt={imgAlt} className="w-6 h-6" />
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              unmount={rounded}
              className="absolute w-full rounded-b-xl max-h-60 overflow-auto bg-gray100 py-1 shadow-01 focus:outline-none  z-10"
            >
              {data.map((item) => (
                <Listbox.Option
                  key={item.value}
                  value={item.value}
                  className="px-5 py-3 cursor-pointer hover:bg-gray-100"
                >
                  <span
                    className="text-b2 text-gray400"
                    style={{ fontSize: "15px" }}
                  >
                    {item.label}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

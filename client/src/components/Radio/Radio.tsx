import { RadioGroup } from '@headlessui/react';
import { FC } from 'react';

interface RadioProps {
  value?: any;
  data: { label: string; value: any }[];
  onChange: (next: any) => void;
  className?: string;
}

export const Radio: FC<RadioProps> = ({ data, onChange, value, className }) => {
  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      <div className="space-y-2.5">
        {data.map((item) => {
          return (
            <RadioGroup.Option
              key={item.value}
              value={item.value}
              className="focus:outline-none cursor-pointer"
            >
              {({ checked }) => {
                return (
                  <div className="flex items-center space-x-2.5">
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
                    <span>{item.label}</span>
                  </div>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
};

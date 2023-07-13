import classNames from 'classnames';
import { FC } from 'react';
import { NumericFormat } from 'react-number-format';

interface NumberInputBoxProps {
  className?: string;
  placeholder?: string;
  value: number;
  onChange?: (next: number) => void;
}

export const NumberInputBox: FC<NumberInputBoxProps> = ({
  className,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <NumericFormat
      placeholder={placeholder}
      className={classNames(
        'text-b3 border border-gray300 rounded py-3 px-[15px] focus:border-blue500 placeholder:text-gray400 disabled:bg-gray100',
        className
      )}
      value={value}
      onValueChange={(e) => {
        onChange?.(typeof e.floatValue === 'undefined' ? 0 : e.floatValue);
      }}
    />
  );
};

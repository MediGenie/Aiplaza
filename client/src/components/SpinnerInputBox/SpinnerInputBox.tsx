import classNames from "classnames";
import { FC } from "react";
import { NumericFormat } from "react-number-format";
import { grayDownTriangle, grayUpTriangle } from "../../icons";

interface SpinnerInputBoxProps {
  className?: string;
  placeholder?: string;
  value: number;
  onChange?: (next: number) => void;
  disabled?: boolean;
}

export const SpinnerInputBox: FC<SpinnerInputBoxProps> = ({
  value,
  className,
  onChange,
  placeholder,
  disabled,
}) => {
  const handleIncrease = () => {
    onChange?.(value + 1);
  };
  const handleDecrease = () => {
    onChange?.(value - 1);
  };
  return (
    <div
      className={classNames(
        "rounded overflow-hidden flex border border-gray300 max-w-[140px]",
        className
      )}
    >
      <NumericFormat
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onValueChange={(e) => {
          onChange?.(typeof e.floatValue === "undefined" ? 0 : e.floatValue);
        }}
        className="!bg-white w-[114px] text-b3 placeholder:text-gray300 py-3 px-[15px]"
      />
      <div className="border-l border-gray300">
        <button
          disabled={disabled}
          className="w-6 h-6 border-b border-gray300 flex items-center justify-center"
          type="button"
          onClick={handleIncrease}
        >
          <img
            src={grayUpTriangle}
            className="w-4 h-4 object-contain"
            alt="증가"
          />
        </button>
        <button
          disabled={disabled}
          className="w-6 h-6 flex items-center justify-center"
          type="button"
          onClick={handleDecrease}
        >
          <img src={grayDownTriangle} className="w-4 h-4" alt="감소" />
        </button>
      </div>
    </div>
  );
};

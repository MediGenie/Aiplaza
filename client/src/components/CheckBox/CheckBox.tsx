import { FC } from 'react';
import { checkboxOff, checkboxOn } from '../../icons';

interface CheckBoxProps {
  value?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
}

export const CheckBox: FC<CheckBoxProps> = ({
  onChange,
  value = false,
  disabled = false,
}) => {
  const handleChange = () => {
    const next = !value;
    onChange?.(next);
  };
  return (
    <button
      type="button"
      onClick={handleChange}
      className="w-6 h-6"
      disabled={disabled}
    >
      <img
        src={value ? checkboxOn : checkboxOff}
        alt={value ? '선택됨' : '선택되지않음'}
      />
    </button>
  );
};

import classNames from 'classnames';
import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface SectionInputBoxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const SectionInputBox: FC<SectionInputBoxProps> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(
        'bg-white bg-opacity-30 border border-white py-3 px-[15px] text-white placeholder:text-white text-b3 rounded',
        className
      )}
      {...props}
    />
  );
};

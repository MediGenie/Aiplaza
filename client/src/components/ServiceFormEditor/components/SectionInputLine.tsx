import classNames from 'classnames';
import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface SectionInputLineProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const SectionInputLine: FC<SectionInputLineProps> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(
        'pb-3 px-[15px] text-b3 border-b border-white placeholder:text-white text-white bg-transparent',
        className
      )}
      {...props}
    />
  );
};

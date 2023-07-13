import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

interface SmallButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: 'primary' | 'secondary';
}

export const SmallButton: FC<SmallButtonProps> = ({
  className,
  color = 'primary',
  ...props
}) => {
  return (
    <button
      className={classNames(
        'py-2 px-5 rounded text-white text-b2 font-medium',
        {
          'bg-blue500': color === 'primary',
          'bg-gray400': color === 'secondary',
        }
      )}
      {...props}
    ></button>
  );
};

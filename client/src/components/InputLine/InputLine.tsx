import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import './style.css';

interface InputLineProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  error?: boolean;
}
export const InputLine: FC<InputLineProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <input
      type="text"
      className={classNames(
        'input-line',
        {
          error: error,
        },
        className
      )}
      {...props}
    />
  );
};

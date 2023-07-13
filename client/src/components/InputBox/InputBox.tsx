import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import './style.css';

interface InputBoxProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  error?: boolean;
  secure?: boolean;
}

export const InputBox: FC<InputBoxProps> = ({
  className,
  error,
  secure = false,
  ...props
}) => {
  return (
    <input
      type={secure === false ? 'text' : 'password'}
      className={classNames(
        'input-box',
        {
          error: error,
        },
        className
      )}
      {...props}
    />
  );
};

import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import classNames from 'classnames';
import './style.css';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return <button className={classNames('btn', className)} {...props} />;
};

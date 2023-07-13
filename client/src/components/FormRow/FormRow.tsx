import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface FormRowProps {
  label: string;
  required?: boolean;
  className?: string;
  children?: ReactNode;
}

export const FormRow: FC<FormRowProps> = ({
  label,
  required,
  className,
  children,
}) => {
  return (
    <div className={classNames(className)}>
      <div className="mb-2.5">
        <label className="text-b2 font-bold">
          {label}
          {required && <span className="text-blue500">*</span>}
        </label>
      </div>
      <div>{children}</div>
    </div>
  );
};

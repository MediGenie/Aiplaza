import { FC } from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import './style.css';

interface InputToggleProps {
  value?: boolean;
  onChange?: (next: boolean) => void;
  className?: string;
}

export const InputToggle: FC<InputToggleProps> = ({
  onChange,
  value = false,
  className,
}) => {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className={classNames(
        'switch-container',
        {
          active: value === true,
        },
        className
      )}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={classNames('switch-item', {
          active: value === true,
        })}
      ></span>
    </Switch>
  );
};

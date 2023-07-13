import { useField } from 'formik';
import { FC } from 'react';
import { DropDown, DropDownData } from '../DropDown';

interface FormikDropdownProps {
  placeholder?: string;
  className?: string;
  name: string;
  data: DropDownData[];
}

export const FormikDropdown: FC<FormikDropdownProps> = ({
  name,
  data,
  className,
  placeholder,
}) => {
  const [props, meta, helper] = useField(name);
  const handleChange = (value: any) => helper.setValue(value);
  return (
    <div>
      <DropDown
        data={data}
        value={props.value}
        onChange={handleChange}
        className={className}
        placeholder={placeholder}
        error={!!meta.error}
      />
      {meta.error && <p className="error-msg">{meta.error}</p>}
    </div>
  );
};

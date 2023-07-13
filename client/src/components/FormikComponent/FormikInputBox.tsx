import { useField } from 'formik';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { InputBox } from '../InputBox';

interface FormikInputBoxProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'value' | 'onChange' | 'onBlur' | 'name'
  > {
  error?: boolean;
  secure?: boolean;
  name: string;
}

export const FormikInputBox: FC<FormikInputBoxProps> = ({ name, ...props }) => {
  const [formik_props, meta] = useField(name);
  return (
    <div>
      <InputBox {...props} {...formik_props} error={!!meta.error} />
      {meta.error && <p className="error-msg">{meta.error}</p>}
    </div>
  );
};

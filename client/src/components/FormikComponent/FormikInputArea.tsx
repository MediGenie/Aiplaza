import { useField } from "formik";
import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import { InputArea } from "../InputArea";

interface FormikInputAreaProps
  extends Omit<
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "type" | "value" | "onChange" | "onBlur" | "name"
  > {
  error?: boolean;
  name: string;
}

export const FormikInputArea: FC<FormikInputAreaProps> = ({
  name,
  ...props
}) => {
  const [formik_props, meta] = useField(name);
  return (
    <div>
      <InputArea {...props} {...formik_props} error={!!meta.error} />
      {meta.error && <p className="error-msg">{meta.error}</p>}
    </div>
  );
};

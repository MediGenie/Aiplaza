import classNames from "classnames";
import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import "./style.css";

interface InputAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: boolean;
}

export const InputArea: FC<InputAreaProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <textarea
      className={classNames("input-textarea", { error: error }, className)}
      {...props}
    ></textarea>
  );
};

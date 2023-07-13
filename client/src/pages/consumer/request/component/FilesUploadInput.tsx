import { useField } from "formik";
import { FC, useMemo } from "react";
import { FileUploadWithRemove } from "../../../../components/FileUploadWithRemove";
import { FormRow } from "../../../../components/FormRow";
import { InputBox } from "../../../../components/InputBox";
import { ServiceFormFileUploadColumn } from "../../../../components/ServiceFormEditor/types";

interface FilesUploadInputProps extends ServiceFormFileUploadColumn {
  name: string;
  value: any;
}

const MIME_TYPE: Record<string, string> = {
  gif: "image/gif",
  img: "image/jpeg,image/png",
  mii: "application/octet-stream",
  dicom: "image/x-dicom",
};

export const FilesUploadInput: FC<FilesUploadInputProps> = ({
  description,
  label,
  required,
  value,
}) => {
  console.log(value);
  return (
    <div className="bg-white p-10 rounded border border-gray100">
      <FormRow label={label} required={required}>
        <div className="space-y-1.5">
          {description && (
            <p className="text-[14px] leading-[22px] text-gray600">
              {description}
            </p>
          )}
          <div className="space-y-2.5">
            <InputBox
              value={value.value}
              className="block w-full"
              placeholder="입력해 주세요."
              disabled={true}
            />
          </div>
        </div>
      </FormRow>
    </div>
  );
};

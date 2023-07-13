import { useField } from 'formik';
import { FC, useMemo } from 'react';
import { FileUploadWithRemove } from '../../../../../components/FileUploadWithRemove';
import { FormRow } from '../../../../../components/FormRow';
import { ServiceFormFileUploadColumn } from '../../../../../components/ServiceFormEditor/types';

interface FilesUploadInputProps extends ServiceFormFileUploadColumn {
  name: string;
}

const MIME_TYPE: Record<string, string> = {
  gif: 'image/gif',
  img: 'image/jpeg,image/png',
  mii: 'application/octet-stream',
  dicom: 'image/x-dicom',
};

export const FilesUploadInput: FC<FilesUploadInputProps> = ({
  allow_mime,
  description,
  image,
  label,
  limit_file_number,
  limit_file_size,
  name,
  required,
  table,
  type,
}) => {
  const [props, , helper] = useField(name);
  const accept = useMemo(() => {
    const accepts: string[] = [];
    allow_mime.forEach((item) => {
      if (MIME_TYPE[item]) {
        accepts.push(MIME_TYPE[item]);
      }
    });
    return accepts.join(',');
  }, [allow_mime]);

  const showAddBtn = limit_file_number > (props.value?.length || 0);

  const pushFileButton = (file: File) => {
    const next = Array.from(props.value);
    next.push(file);
    helper.setValue(next);
  };
  const replateFileButton = (index: number) => (file: File) => {
    const next = Array.from(props.value);
    next[index] = file;
    helper.setValue(next);
  };
  const removeFileButton = (index: number) => () => {
    const next = Array.from(props.value);
    next.splice(index, 1);
    helper.setValue(next);
  };

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
            {props.value.map((file: File, i: number) => {
              return (
                <FileUploadWithRemove
                  selected_file={file}
                  onChange={replateFileButton(i)}
                  onRemove={removeFileButton(i)}
                  key={i}
                  accept={accept}
                />
              );
            })}
            {showAddBtn && (
              <FileUploadWithRemove onChange={pushFileButton} accept={accept} />
            )}
          </div>
        </div>
      </FormRow>
    </div>
  );
};

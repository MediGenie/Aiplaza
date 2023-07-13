import { FC, useId, ChangeEventHandler, useState } from "react";
import { AlertModal } from "../../modals";
import { InputBox } from "../InputBox";

interface FileUploadProps {
  selected_file?: File | null;
  onChange?: (file: File) => void;
  accept?: string;
}

export const FileUpload: FC<FileUploadProps> = ({
  accept,
  onChange,
  selected_file,
}) => {
  const [modal, setModal] = useState({
    show: false,
    message: "",
  });

  const showModal = (msg: string) => {
    setModal({
      show: true,
      message: msg,
    });
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };

  const id = useId();

  const handleFiles = (files?: FileList) => {
    if (files) {
      return files.item(0);
    }
    return null;
  };

  const verifyMIME = (file: File) => {
    if (accept) {
      return accept.split(",").includes(file.type);
    }
    return true;
  };

  const handleChange = (file: File) => {
    onChange?.(file);
  };

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    const file = handleFiles(files || undefined);
    if (file === null) {
      showModal("파일이 존재하지 않습니다.");
      return;
    }
    const isVerifyMIME = verifyMIME(file);
    if (isVerifyMIME === false) {
      showModal("파일의 형식이 올바르지 않습니다.");
      return;
    }
    handleChange(file);
  };

  return (
    <div className="flex justify-end space-x-2.5">
      <AlertModal
        title="오류"
        message={modal.message}
        open={modal.show}
        onClose={hideModal}
      />
      {selected_file && (
        <InputBox disabled className="flex-1" value={selected_file.name} />
      )}
      <label htmlFor={id} className="btn !px-10 cursor-pointer">
        파일 업로드
      </label>
      <input
        type="file"
        hidden
        value=""
        id={id}
        accept={accept}
        onChange={handleFileUpload}
      />
    </div>
  );
};

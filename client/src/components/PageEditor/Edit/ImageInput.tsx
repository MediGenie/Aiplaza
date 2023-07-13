import { ChangeEventHandler, FC, useId, useMemo, useState } from 'react';
import { AlertModal } from '../../../modals';
import { PageImageColumn } from '../../../types/page-column.type';
import '../../Button/style.css';
import { EditorProps } from '../types';
import { usePageDispatch } from '../usePageDispatch';
import { usePageValue } from '../usePageValue';

const FILE_ACCEPT = 'image/png,image/jpeg,image/jpg';

export const ImageInput: FC<EditorProps> = ({ column, section }) => {
  const id = useId();
  const pageValue = usePageValue();
  const dispatch = usePageDispatch();
  const [modal, setModal] = useState({ show: false, message: '' });
  const showModal = (message: string) => {
    setModal({
      show: true,
      message,
    });
  };
  const hideModal = () => {
    setModal((prev) => ({ ...prev, show: false }));
  };
  const _column = useMemo(() => {
    return dispatch.getColumn(section, column) as null | PageImageColumn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageValue.data]);

  const handleFiles = (files?: FileList) => {
    if (files) {
      return files.item(0);
    }
    return null;
  };

  const verifyMIME = (file: File) => {
    return FILE_ACCEPT.split(',').includes(file.type);
  };

  const updateFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const _file: File & { url: string } = Object.assign(file, { url });
    dispatch.updateColumn(section, column, { image: _file });
  };

  const handleChangeInputBox: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    const file = handleFiles(files || undefined);
    if (file === null) {
      showModal('파일이 존재하지 않습니다.');
      return;
    }
    const isVerifyMIME = verifyMIME(file);
    if (isVerifyMIME === false) {
      showModal('파일 형식이 올바르지 않습니다.');
      return;
    }
    updateFile(file);
  };

  if (_column === null) {
    return (
      <div>
        <p className="text-b3 font-medium">잘못된 정보가 입력되었습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-b2">{_column.label}</h2>
      <div className="rounded-lg bg-gray50 p-5 space-y-2.5 mt-2.5">
        <label className="btn block cursor-pointer" htmlFor={id}>
          이미지 업로드
        </label>
        <input
          id={id}
          value=""
          hidden
          type="file"
          accept={FILE_ACCEPT}
          onChange={handleChangeInputBox}
        />
      </div>
      <AlertModal
        title="알림"
        message={modal.message}
        open={modal.show}
        onClose={hideModal}
      />
    </div>
  );
};

import classNames from 'classnames';
import { FC, useState } from 'react';
import { copy, deleteIcon, img } from '../../../icons';
import { AddImageModal } from '../../../modals/AddImageModal';
import { InputBox } from '../../InputBox';
import { InputLine } from '../../InputLine';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ColumnTypeToIconMap } from '../icons';
import { ServiceFormTitleColumn } from '../types';

interface ColumnTitleEditorProps extends ServiceFormTitleColumn {
  section: number;
  index: number;
  isSelected?: boolean;
}

export const ColumnTitleEditor: FC<ColumnTitleEditorProps> = (props) => {
  const { description, label, type, index, section, image, isSelected } = props;
  const [openImageModal, setOpenImageModal] = useState(false);
  const dispatch = useFormDispatchContext();

  const handleCopy = () => {
    const { index, section, ...rest } = props;
    dispatch.insertColumn(rest, section, index);
  };

  const handleRemove = () => {
    dispatch.removeColumn(section, index);
  };

  const handleChangeLabel = (next: string) => {
    dispatch.updateItem({
      section,
      column: index,
      data: {
        label: next,
      },
    });
  };
  const handleChangeDescription = (next: string) => {
    dispatch.updateItem({
      section,
      column: index,
      data: {
        description: next,
      },
    });
  };
  const handelSelectImage = (file: File & { url: string }) => {
    dispatch.updateItem({
      section,
      column: index,
      data: {
        image: file,
      },
    });
  };

  return (
    <div
      className={classNames('bg-white rounded p-10', {
        'border-blue500 border-2': isSelected,
        'border border-gray100': !isSelected,
      })}
    >
      <div className="flex items-center space-x-2.5">
        <div className="bg-gray100 px-2 py-1.5 space-x-0.5 flex items-center rounded">
          <img
            src={ColumnTypeToIconMap[type]}
            alt="제목 아이콘"
            className="w-5 h-5"
          />
          <span className="text-b3 text-gray400 w-5 text-center">
            {index + 1}
          </span>
        </div>
        <InputBox
          className="flex-1"
          placeholder="(필수) 제목을 입력해 주세요."
          value={label}
          onChange={(e) => handleChangeLabel(e.target.value)}
        />
        <div className="flex items-center space-x-2.5 pl-2.5">
          <button
            className="w-6 h-6"
            type="button"
            onClick={() => setOpenImageModal(true)}
          >
            <img src={img} alt="이미지 추가" className="w-full h-full" />
          </button>
          <button className="w-6 h-6" type="button" onClick={handleCopy}>
            <img src={copy} alt="컬럼 복사" className="w-full h-full" />
          </button>
          <button className="w-6 h-6" type="button" onClick={handleRemove}>
            <img src={deleteIcon} alt="컬럼 삭제" className="w-full h-full" />
          </button>
        </div>
      </div>
      <InputLine
        placeholder="(선택) 설명을 입력해 주세요."
        className="mt-5 w-full"
        value={description}
        onChange={(e) => handleChangeDescription(e.target.value)}
      />
      {image && (
        <img
          src={image.url}
          alt="이미지"
          className="w-full object-cover mt-5"
        />
      )}
      <AddImageModal
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        onSelect={handelSelectImage}
      />
    </div>
  );
};

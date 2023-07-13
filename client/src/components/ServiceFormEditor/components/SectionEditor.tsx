import { FC, ReactNode } from 'react';
import { copyWhite, deleteWhiteIcon } from '../../../icons';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { useFormValueContext } from '../hooks/useFormValueContext';
import { ServiceFormSection } from '../types';
import { ColumnEditor } from './ColumnEditor';
import { SectionInputBox } from './SectionInputBox';
import { SectionInputLine } from './SectionInputLine';

interface SectionEditorProps {
  index: number;
  section: ServiceFormSection;
  total: number;
}

const Wrapper: FC<{
  isSelected: boolean;
  children: ReactNode;
  onSelect: () => void;
}> = ({ children, isSelected, onSelect }) => {
  if (isSelected === true) {
    return <div>{children}</div>;
  }
  return (
    <button className="block text-left w-full" type="button" onClick={onSelect}>
      <div className="pointer-events-none">{children}</div>
    </button>
  );
};

export const SectionEditor: FC<SectionEditorProps> = ({
  index,
  section,
  total,
}) => {
  const { select_item } = useFormValueContext();
  const dispatch = useFormDispatchContext();
  const isSelected =
    select_item?.column === undefined && select_item?.section === index
      ? true
      : false;

  const handleChangeLabel = (value: string) => {
    dispatch.updateItem({ section: index, data: { label: value } });
  };
  const handleChangeDescription = (value: string) => {
    dispatch.updateItem({ section: index, data: { description: value } });
  };

  const handleSelect = () => {
    dispatch.selectItem({ section: index });
  };
  const handleCopy = () => {
    dispatch.insertSection(section, index);
  };
  const handleRemove = () => {
    dispatch.removeSection(index);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="rounded-t px-10 py-3 bg-gradient-to-b from-[#003876] to-[#001a58] inline-block">
          <p className="text-b3 font-bold text-white">
            <span className="text-yellow500">{index + 1}</span>/
            <span>{total}</span>
          </p>
        </div>
        <Wrapper isSelected={isSelected} onSelect={handleSelect}>
          <div className="bg-blue800 p-10 rounded rounded-tl-none">
            <div className="flex items-center space-x-5">
              <SectionInputBox
                className="flex-1"
                placeholder="(필수) 섹션명을 입력해 주세요."
                value={section.label}
                onChange={(e) => handleChangeLabel(e.target.value)}
              />
              <div className="space-x-2.5 flex items-center">
                <button className="w-6 h-6" type="button" onClick={handleCopy}>
                  <img src={copyWhite} className="w-full h-full" alt="" />
                </button>
                <button
                  className="w-6 h-6"
                  type="button"
                  onClick={handleRemove}
                >
                  <img src={deleteWhiteIcon} className="w-full h-full" alt="" />
                </button>
              </div>
            </div>
            <SectionInputLine
              className="mt-5 block w-full"
              placeholder="(선택) 설명을 입력해 주세요."
              value={section.description}
              onChange={(e) => handleChangeDescription(e.target.value)}
            />
          </div>
        </Wrapper>
      </div>
      {section.column.map((_, _index) => {
        return (
          <ColumnEditor
            column={_index}
            section={index}
            key={`${index}-${_index}`}
          />
        );
      })}
    </div>
  );
};

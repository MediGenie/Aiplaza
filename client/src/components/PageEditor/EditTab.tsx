import { FC, useMemo } from 'react';
import { ColumnTypeEnum } from '../../types/page-column.type';
import { ColorEditor } from './Edit/ColorEditor';
import { ImageInput } from './Edit/ImageInput';
import { RichEditor } from './Edit/RichEditor';
import { SentenceEditor } from './Edit/SentenceEditor';
import { TextEditor } from './Edit/TextEditor';
import { EditorProps } from './types';
import { usePageDispatch } from './usePageDispatch';
import { usePageValue } from './usePageValue';

interface EditTabProps {}

const EditComponents: Record<ColumnTypeEnum, FC<EditorProps>> = {
  [ColumnTypeEnum.Sentence]: SentenceEditor,
  [ColumnTypeEnum.Text]: TextEditor,
  [ColumnTypeEnum.Rich]: RichEditor,
  [ColumnTypeEnum.Color]: ColorEditor,
  [ColumnTypeEnum.Image]: ImageInput,
};

export const EditTabCore: FC<EditTabProps> = () => {
  const { select_column } = usePageValue();
  const dispatch = usePageDispatch();
  const section = useMemo(() => {
    if (select_column) {
      return dispatch.getSection(select_column.section);
    }
    return null;
  }, [dispatch, select_column]);

  if (section === null) {
    return (
      <div className="p-10">
        <p className="text-b3 font-medium text-center">
          잘못된 정보를 편집하고 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="bg-blue500 p-5 text-center ">
        <span className="text-white text-b3 font-medium">{section.label}</span>
      </div>
      <div className="p-10 space-y-10 h-full">
        {section.columns.map((column) => {
          const Component = EditComponents[column.type];
          return (
            <Component
              column={column.key}
              section={section.key}
              key={`${section.key}_${column.key}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export const EditTab: FC = () => {
  const { select_column } = usePageValue();

  if (select_column === null) {
    return (
      <div className="p-10">
        <p className="text-b3 font-medium text-center">섹션을 선택해 주세요.</p>
      </div>
    );
  }
  return <EditTabCore />;
};

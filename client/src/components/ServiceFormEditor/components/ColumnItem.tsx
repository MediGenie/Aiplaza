import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { copy, deleteIcon, move } from '../../../icons';
import { ColumnTypeToIconMap } from '../icons';
import { FormColumnType } from '../types';

interface ColumnItemProps {
  draggableId: string;
  index: number;
  type: FormColumnType;
  onCopy?: () => void;
  onRemove?: () => void;
}

const TypeToStrMap: Record<FormColumnType, string> = {
  [FormColumnType.TITLE]: '제목 및 설명',
  [FormColumnType.TEXT]: '텍스트필드',
  [FormColumnType.NUMBER]: '숫자필드',
  [FormColumnType.FILE]: '파일업로드',
  [FormColumnType.DROPROWN]: '드롭다운',
  [FormColumnType.RADIO]: '라디오 버튼',
  [FormColumnType.CHECKBOX]: '체크박스',
  [FormColumnType.SLIDE]: '슬라이드',
  [FormColumnType.SPINNER]: '스피너',
  [FormColumnType.LINEAR]: '선형배율',
};

export const ColumnItem: FC<ColumnItemProps> = ({
  draggableId,
  index,
  type,
  onCopy,
  onRemove,
}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => {
        return (
          <div
            className="pt-5 select-none"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2.5">
                <div {...provided.dragHandleProps} className="w-6 h-6">
                  <img
                    src={move}
                    className="w-6 h-6 block"
                    alt="자리 이동 버튼"
                  />
                </div>
                <div className="flex items-center py-0.5 px-1 bg-gray100 rounded space-x-0.5">
                  {ColumnTypeToIconMap[type] && (
                    <img
                      src={ColumnTypeToIconMap[type]}
                      alt="아이콘"
                      className="w-4 h-4"
                    />
                  )}
                  <span
                    className="text-gray400 block w-4 text-center"
                    style={{ fontSize: 14, lineHeight: '20px' }}
                  >
                    {index + 1}
                  </span>
                </div>
                <p className="text-b3">{TypeToStrMap[type] || '알 수 없음'}</p>
              </div>
              <div className="flex items-center space-x-2.5">
                <button type="button" onClick={onCopy}>
                  <img src={copy} alt="복사" className="w-6 h-6 block" />
                </button>
                <button type="button" onClick={onRemove}>
                  <img src={deleteIcon} alt="삭제" className="w-6 h-6 block" />
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

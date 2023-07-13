import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { copy, deleteIcon, section02 } from '../../../icons';
import { ServiceFormSection } from '../types';
import { ColumnItem } from './ColumnItem';

interface SectionItemProps extends ServiceFormSection {
  index: number;
  onCopy?: () => void;
  onRemove?: () => void;
  onCopyColumn?: (column_index: number) => void;
  onRemoveColumn?: (column_index: number) => void;
}

export const SectionItem: FC<SectionItemProps> = ({
  column,
  index,
  onCopy,
  onRemove,
  onCopyColumn,
  onRemoveColumn,
}) => {
  return (
    <div className="select-none">
      <div className="flex justify-between items-center pt-5">
        <div className="flex items-center space-x-2.5 flex-1">
          <div className="w-6 h-6 bg-gray100 rounded p-1">
            <img src={section02} alt="섹션 아이콘" className="w-4 h-4 block" />
          </div>
          <p className="text-b2">섹션 {index + 1}</p>
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
      <Droppable droppableId={`section-${index}`}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="pb-5"
            >
              {column.map((item, _index) => (
                <ColumnItem
                  key={_index}
                  index={_index}
                  draggableId={`section-${index}-column-${_index}`}
                  type={item.type}
                  onCopy={() => onCopyColumn?.(_index)}
                  onRemove={() => onRemoveColumn?.(_index)}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

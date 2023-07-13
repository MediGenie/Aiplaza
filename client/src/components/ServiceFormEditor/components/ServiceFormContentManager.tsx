import { FC } from "react";
import { FormColumnType, ServiceFormSection } from "../types";
import { DragDropContext } from "react-beautiful-dnd";
import { SectionItem } from "./SectionItem";
import { GrayPlus, section } from "../../../icons";

interface ServiceFormContentManagerProps {
  sections: ServiceFormSection[];
  changeSections: (next: ServiceFormSection[]) => void;
}

function removeItem<T>(arr: T[], index: number): [T[], T] {
  const [removed] = arr.splice(index, 1);
  return [arr, removed];
}
function insertItem<T>(arr: T[], index: number, item: T) {
  arr.splice(index, 0, item);
  return arr;
}

function parseDroppableIdToIndex(id: string) {
  if (id.startsWith("section-") === false) {
    throw new Error("잘못된 정보");
  }
  const _id = id.replace("section-", "");
  const parsed_id = parseInt(_id);
  return parsed_id;
}

function moveItemEqualSection(
  section: ServiceFormSection,
  fromIndex: number,
  destIndex: number
) {
  const arr = Array.from(section.column);
  const [_arr, moveItem] = removeItem(arr, fromIndex);
  return insertItem(_arr, destIndex, moveItem);
}

export const ServiceFormContentManager: FC<ServiceFormContentManagerProps> = ({
  sections,
  changeSections,
}) => {
  function copySection(index: number) {
    const _sections = Array.from(sections);
    const source = _sections[index];
    _sections.splice(index, 0, source);
    changeSections(_sections);
  }

  function addSection() {
    const _sections = Array.from(sections);
    _sections.push({ column: [], description: "", label: "" });
    changeSections(_sections);
  }

  function addColumn() {
    const _section = Array.from(sections);
    if (_section.length > 0) {
      _section[_section.length - 1].column.push({
        type: FormColumnType.TEXT,
        label: "",
        description: "",
        image: null,
        required: false,
        table: [],
      });
      changeSections(_section);
    }
  }

  function removeSection(index: number) {
    const _sections = Array.from(sections);
    _sections.splice(index, 1);
    changeSections(_sections);
  }

  function copyColumn(section: number, column: number) {
    const _sections = Array.from(sections);
    const source = _sections[section].column[column];
    _sections[section].column.splice(column, 0, source);
    changeSections(_sections);
  }

  function removeColumn(section: number, column: number) {
    const _sections = Array.from(sections);
    _sections[section].column.splice(column, 1);
    changeSections(_sections);
  }

  return (
    <div className="">
      <div className="border-b-2 border-gray100 py-5 flex justify-between items-end">
        <p className="text-b1 font-bold">Contents</p>
        <div className="flex space-x-2.5">
          <button
            className="w-10 h-10 bg-gray100 rounded p-1.5"
            type="button"
            onClick={addSection}
          >
            <img src={section} alt="섹션 추가 " className="w-7 h-7" />
          </button>
          <button
            className="w-10 h-10 bg-gray100 rounded p-1.5"
            type="button"
            onClick={addColumn}
          >
            <img src={GrayPlus} alt="컬럼 추가 " className="w-7 h-7" />
          </button>
        </div>
      </div>
      <DragDropContext
        onDragEnd={(result, provided) => {
          const { destination, source } = result;
          if (!destination) {
            return;
          }
          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }
          // 같은 섹션 안에서 이동이 이루어진 경우
          if (destination.droppableId === source.droppableId) {
            const section_index = parseDroppableIdToIndex(
              destination.droppableId
            );
            const _sections = Array.from(sections);
            const _columns = moveItemEqualSection(
              _sections[section_index],
              source.index,
              destination.index
            );
            _sections[section_index].column = _columns;

            return changeSections(_sections);
          }
          // 다른 섹션 안에서 이동이 이루어진 경우
          const sourceSectionIndex = parseDroppableIdToIndex(
            source.droppableId
          );
          const destSectionIndex = parseDroppableIdToIndex(
            destination.droppableId
          );
          // 기존 위치에서 제거
          const next_sections = Array.from(sections);
          const source_column = Array.from(
            next_sections[sourceSectionIndex].column
          );
          const [removed_source_columns, moveItem] = removeItem(
            source_column,
            source.index
          );
          next_sections[sourceSectionIndex].column = removed_source_columns;

          const dest_column = Array.from(
            next_sections[destSectionIndex].column
          );
          const inserted_dest_column = insertItem(
            dest_column,
            destination.index,
            moveItem
          );
          next_sections[destSectionIndex].column = inserted_dest_column;

          // 상태 변경
          changeSections(next_sections);
        }}
      >
        <div className="divide-y divide-gray100">
          {sections.length === 0 && (
            <div className="py-10">
              <p className="font-medium text-b2">섹션을 추가해주세요.</p>
            </div>
          )}
          {sections.map((item, index) => {
            return (
              <SectionItem
                {...item}
                index={index}
                key={index}
                onCopy={() => copySection(index)}
                onRemove={() => removeSection(index)}
                onCopyColumn={(coulumn_index) => {
                  copyColumn(index, coulumn_index);
                }}
                onRemoveColumn={(coulumn_index) => {
                  removeColumn(index, coulumn_index);
                }}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

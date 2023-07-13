import { FC, useState } from "react";
import { PageSectionType } from "../../types/page-section.type";
import { EditArea } from "./EditArea";
import { templateIdEnum } from "./enum/template-id";
import { PageDispatchContext, PageValueContext } from "./page-context";
import { PageView } from "./PageView";
import "./style.css";

interface PageEditorProps {
  templateId: templateIdEnum;
  value: PageSectionType[];
  onChange: (next: PageSectionType[]) => void;
  onChangeTemplateId: (id: templateIdEnum) => void;
}

export const PageEditor: FC<PageEditorProps> = ({
  value,
  onChange,
  templateId,
  onChangeTemplateId,
}) => {
  const [selectColumn, setSelectColumn] = useState<{
    section: string;
  } | null>(null);
  const getColumn = (section_key: string, name_key: string) => {
    const section = value.find((v) => v.key === section_key);
    if (!section) {
      return null;
    }
    const column = section.columns.find((v) => v.key === name_key);
    return column || null;
  };

  const updateColumn = (
    section_key: string,
    name_key: string,
    data: Record<string, any>
  ) => {
    const next = value.map((prev_sections) => {
      if (prev_sections.key !== section_key) {
        return prev_sections;
      }
      prev_sections.columns = prev_sections.columns.map((prev_columns) => {
        if (prev_columns.key === name_key) {
          return {
            ...prev_columns,
            ...data,
          };
        }
        return prev_columns;
      });
      return prev_sections;
    });
    onChange(next);
  };
  const handleSelect = (section: string) => {
    setSelectColumn({
      section,
    });
  };
  const getSection = (section_key: string) => {
    const section = value.find((v) => v.key === section_key);
    return section || null;
  };

  return (
    <PageValueContext.Provider
      value={{
        data: value,
        template: templateId,
        select_column: selectColumn,
      }}
    >
      <PageDispatchContext.Provider
        value={{
          changeTemplate: (id) => {
            onChangeTemplateId(id);
            setSelectColumn(null);
          },
          getColumn,
          updateColumn,
          selectSection: handleSelect,
          getSection: getSection,
        }}
      >
        <div className="w-full h-full flex justify-end max-lg:flex-col-reverse">
          <div className="overflow-x-auto mx-auto w-full max-lg:overflow-visible">
            <div className="max-lg:overflow-x-auto max-lg:snap-x">
              <PageView />
            </div>
          </div>
          <div className="overflow-x-auto min-w-[390px] max-lg:overflow-visible">
            <EditArea />
          </div>
        </div>
      </PageDispatchContext.Provider>
    </PageValueContext.Provider>
  );
};

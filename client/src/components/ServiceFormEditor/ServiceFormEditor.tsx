import { FC, useState, useCallback } from "react";
import { CreateServiceType } from "../../pages/provider/service/create/types/service-create.types";
import { ServiceFormContentManager } from "./components/ServiceFormContentManager";
import { EditorArea } from "./EditorArea";
import { FormDispatchContext, FormValueContext } from "./form-context";
import { FormArea } from "./FormArea";
import { ServiceFormColumn, ServiceFormSection } from "./types";

interface ServiceFormEditorProps {
  value: ServiceFormSection[];
  onChange: (next: ServiceFormSection[]) => void;
  onChangeData?: (next: Partial<CreateServiceType>) => void;
}

export const ServiceFormEditor: FC<ServiceFormEditorProps> = ({
  value,
  onChange,
  onChangeData,
}) => {
  const updateData = (next: ServiceFormSection[]) => {
    onChangeData?.({
      form: next,
    });
  };

  const [selectItem, setSelectItem] = useState<{
    section: number;
    column?: number;
  } | null>(null);

  const handleSelectItem = useCallback(
    (opts: { section: number; column?: number }) => {
      setSelectItem({
        section: opts.section,
        column: opts.column,
      });
    },
    []
  );

  const handleGetItem = (section: number, column?: number) => {
    const _section = value[section];
    if (!_section) {
      setSelectItem(null);
      return null;
    }
    if (typeof column === "number") {
      const _column = _section.column[column];

      if (!_column) {
        setSelectItem(null);
        return null;
      }
      return _column;
    }

    return _section;
  };

  const handleUpdate = (opts: {
    section: number;
    column?: number;
    data: Record<string, any>;
    replace?: boolean;
  }) => {
    const _sections = Array.from(value);
    const { data, section, column } = opts;
    if (column === undefined) {
      _sections[section] = {
        ..._sections[section],
        ...data,
      };
    } else if (column !== undefined && opts.replace !== true) {
      _sections[section].column[column] = {
        ..._sections[section].column[column],
        ...data,
      };
    } else if (column !== undefined && opts.replace === true) {
      _sections[section].column[column] = {
        ...(data as any),
      };
    }
    onChange(_sections);
  };

  const handleInsertSection = (item: ServiceFormSection, index: number) => {
    const _section = Array.from(value);
    _section.splice(index, 0, item);
    setSelectItem(null);
    onChange(_section);
  };

  const handleInsetColumn = (
    item: ServiceFormColumn,
    section_index: number,
    column_index: number
  ) => {
    const _section = Array.from(value);
    _section[section_index].column.splice(column_index, 0, item);
    setSelectItem(null);
    onChange(_section);
  };

  const handleRemoveSection = (index: number) => {
    const _section = Array.from(value);
    _section.splice(index, 1);
    setSelectItem(null);
    onChange(_section);
  };

  const handleRemoveColumn = (section_index: number, column_index: number) => {
    const _section = Array.from(value);
    _section[section_index].column.splice(column_index, 1);
    setSelectItem(null);
    onChange(_section);
  };

  return (
    <FormValueContext.Provider
      value={{
        data: value,
        select_item: selectItem,
      }}
    >
      <FormDispatchContext.Provider
        value={{
          getItem: handleGetItem as any,
          selectItem: handleSelectItem,
          updateItem: handleUpdate,
          insertSection: handleInsertSection,
          insertColumn: handleInsetColumn,
          removeColumn: handleRemoveColumn,
          removeSection: handleRemoveSection,
        }}
      >
        <div className="hidden max-xl:block max-xl:overflow-auto max-xl:px-2 max-xl:min-w-[300px] max-xl:max-h-[200px]">
          <ServiceFormContentManager
            changeSections={updateData}
            sections={value}
          />
        </div>
        <div className="h-full overflow-auto max-md:overflow-visible flex max-md:flex-col-reverse">
          <FormArea />
          <EditorArea />
        </div>
      </FormDispatchContext.Provider>
    </FormValueContext.Provider>
  );
};

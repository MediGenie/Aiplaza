import classNames from 'classnames';
import { FC, useMemo, ReactNode } from 'react';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { useFormValueContext } from '../hooks/useFormValueContext';
import { FormColumnType, ServiceFormColumn } from '../types';
import { ColumnCheckboxEditor } from './ColumnCheckboxEditor';
import { ColumnDropDownEditor } from './ColumnDropDownEditor';
import { ColumnFileEditor } from './ColumnFileEditor';
import { ColumnLinearEditor } from './ColumnLinearEditor';
import { ColumnNumberEditor } from './ColumnNumberEditor';
import { ColumnRadioEditor } from './ColumnRadioEditor';
import { ColumnSliderEditor } from './ColumnSliderEditor';
import { ColumnSpinerEditor } from './ColumnSpinerEditor';
import { ColumnTextEditor } from './ColumnTextEditor';
import { ColumnTitleEditor } from './ColumnTitleEditor';

interface ColumnEditorProps {
  section: number;
  column: number;
}

const Wrapper: FC<{
  isSelected: boolean;
  children: ReactNode;
  onSelect: () => void;
}> = ({ children, isSelected, onSelect }) => {
  return (
    <button
      className="block text-left w-full"
      disabled={isSelected}
      type="button"
      onClick={onSelect}
    >
      <div
        className={classNames({ 'pointer-events-none': isSelected !== true })}
      >
        {children}
      </div>
    </button>
  );
};

export const ColumnEditor: FC<ColumnEditorProps> = ({ column, section }) => {
  const value = useFormValueContext();
  const dispatch = useFormDispatchContext();
  const item = useMemo(() => {
    return dispatch.getItem(section, column) as ServiceFormColumn | null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.data]);

  const isSelected = useMemo(() => {
    return (
      value.select_item?.section === section &&
      value.select_item?.column === column
    );
  }, [column, section, value.select_item?.column, value.select_item?.section]);

  if (item === null) {
    return null;
  }

  return (
    <Wrapper
      isSelected={isSelected}
      onSelect={() => dispatch.selectItem({ section, column })}
    >
      {item.type === FormColumnType.TITLE && (
        <ColumnTitleEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.TEXT && (
        <ColumnTextEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.NUMBER && (
        <ColumnNumberEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.FILE && (
        <ColumnFileEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.DROPROWN && (
        <ColumnDropDownEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.RADIO && (
        <ColumnRadioEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.CHECKBOX && (
        <ColumnCheckboxEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.SLIDE && (
        <ColumnSliderEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.SPINNER && (
        <ColumnSpinerEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
      {item.type === FormColumnType.LINEAR && (
        <ColumnLinearEditor
          {...item}
          index={column}
          section={section}
          isSelected={isSelected}
        />
      )}
    </Wrapper>
  );
};

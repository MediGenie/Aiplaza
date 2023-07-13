import { FC, useMemo } from 'react';
import { CheckboxSettingEditor } from './components/CheckboxSettingEditor';
import { DropdownSettingEditor } from './components/DropdownSettingEditor';
import { FileSettingEditor } from './components/FileSettingEditor';
import { LinearSettingEditor } from './components/LinearSettingEditor';
import { NumberSettingEditor } from './components/NumberSettingEditor';
import { RadioSettingEditor } from './components/RadioSettingEditor';
import { SlideSettingEditor } from './components/SlideSettingEditor';
import { SpinerSettingEditor } from './components/SpinerSettingEditor';
import { TextSettingEditor } from './components/TextSettingEditor';
import { useFormDispatchContext } from './hooks/useFormDispatchContext';
import { useFormValueContext } from './hooks/useFormValueContext';
import { FormColumnType, ServiceFormColumn } from './types';

interface EditorAreaSettingProps {
  column: number;
  section: number;
}

export const EditorAreaSetting: FC<EditorAreaSettingProps> = ({
  column,
  section,
}) => {
  const value = useFormValueContext();
  const dispatch = useFormDispatchContext();

  const item = useMemo(() => {
    return dispatch.getItem(section, column) as ServiceFormColumn | null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.data, section, column]);

  if (item === null) {
    return null;
  }

  return (
    <div>
      {item.type === FormColumnType.TEXT && (
        <TextSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.NUMBER && (
        <NumberSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.FILE && (
        <FileSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.DROPROWN && (
        <DropdownSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.RADIO && (
        <RadioSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.CHECKBOX && (
        <CheckboxSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.SLIDE && (
        <SlideSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.SPINNER && (
        <SpinerSettingEditor {...item} column={column} section={section} />
      )}
      {item.type === FormColumnType.LINEAR && (
        <LinearSettingEditor {...item} column={column} section={section} />
      )}
    </div>
  );
};

import { FC } from 'react';
import { InputToggle } from '../../InputToggle';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ServiceFormRadioColumn } from '../types';

interface RadioSettingEditorProps extends ServiceFormRadioColumn {
  section: number;
  column: number;
}

export const RadioSettingEditor: FC<RadioSettingEditorProps> = ({
  column,
  section,
  required,
  etc_field,
}) => {
  const dispatch = useFormDispatchContext();
  const handleChange = (next: boolean) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        required: next,
      },
    });
  };
  const handleChangeEtcField = (next: boolean) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        etc_field: next,
      },
    });
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">필수</p>
        <InputToggle value={required} onChange={handleChange} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">기타옵션</p>
        <InputToggle value={etc_field} onChange={handleChangeEtcField} />
      </div>
    </div>
  );
};

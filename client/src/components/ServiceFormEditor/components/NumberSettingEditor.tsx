import { FC } from 'react';
import { InputToggle } from '../../InputToggle';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ServiceFormNumberColumn } from '../types';

interface NumberSettingEditorProps extends ServiceFormNumberColumn {
  section: number;
  column: number;
}

export const NumberSettingEditor: FC<NumberSettingEditorProps> = ({
  column,
  section,
  required,
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
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">필수</p>
        <InputToggle value={required} onChange={handleChange} />
      </div>
    </div>
  );
};

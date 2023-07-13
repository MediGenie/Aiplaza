import { FC } from 'react';
import { InputToggle } from '../../InputToggle';
import { NumberInputBox } from '../../NumberInputBox';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ServiceFormSpinnerColumn } from '../types';

interface SpinerSettingEditorProps extends ServiceFormSpinnerColumn {
  column: number;
  section: number;
}

export const SpinerSettingEditor: FC<SpinerSettingEditorProps> = ({
  column,
  section,
  required,
  spinner_init,
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

  const handleSpinerInit = (next: number) => {
    let next_min = spinner_init;
    let next_max = next;
    if (next_min >= next_max) {
      next_min = next_max - 1;
    }
    dispatch.updateItem({
      section,
      column,
      data: {
        spinner_init: next,
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
        <p className="text-gray800 text-b3">시작값</p>
        <NumberInputBox
          className="w-[120px]"
          placeholder="(필수) 시작값"
          value={spinner_init}
          onChange={handleSpinerInit}
        />
      </div>
    </div>
  );
};

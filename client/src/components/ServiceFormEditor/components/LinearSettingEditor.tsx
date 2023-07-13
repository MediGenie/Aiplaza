import { FC } from 'react';
import { InputBox } from '../../InputBox';
import { InputToggle } from '../../InputToggle';
import { NumberInputBox } from '../../NumberInputBox';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ServiceFormLinearColumn } from '../types';

interface LinearSettingEditorProps extends ServiceFormLinearColumn {
  section: number;
  column: number;
}

export const LinearSettingEditor: FC<LinearSettingEditorProps> = ({
  column,
  section,
  max_linear,
  min_linear,
  max_linear_label,
  min_linear_label,
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

  const handleMinSlide = (next: number) => {
    let next_min = next;
    let next_max = max_linear;
    if (next_min >= next_max) {
      next_max = next_min + 1;
    }
    dispatch.updateItem({
      section,
      column,
      data: {
        min_linear: next_min,
        max_linear: next_max,
      },
    });
  };
  const handleMaxSlide = (next: number) => {
    let next_min = min_linear;
    let next_max = next;
    if (next_min >= next_max) {
      next_min = next_max - 1;
    }
    dispatch.updateItem({
      section,
      column,
      data: {
        min_linear: next_min,
        max_linear: next_max,
      },
    });
  };

  const handleMinLabel = (next: string) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        min_linear_label: next,
      },
    });
  };
  const handleMaxLabel = (next: string) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        max_linear_label: next,
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
        <p className="text-gray800 text-b3">최소값</p>
        <NumberInputBox
          className="w-[120px]"
          placeholder="(필수) 최소값"
          value={min_linear}
          onChange={handleMinSlide}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">최대값</p>
        <NumberInputBox
          className="w-[120px]"
          placeholder="(필수) 최대값"
          value={max_linear}
          onChange={handleMaxSlide}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">최소값 라벨</p>
        <InputBox
          className="w-[120px]"
          placeholder="입력하세요."
          value={min_linear_label}
          onChange={(e) => handleMinLabel(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">최대값 라벨</p>
        <InputBox
          className="w-[120px]"
          placeholder="입력하세요."
          value={max_linear_label}
          onChange={(e) => handleMaxLabel(e.target.value)}
        />
      </div>
    </div>
  );
};

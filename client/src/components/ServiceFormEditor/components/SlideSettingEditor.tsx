import { FC } from 'react';
import { InputToggle } from '../../InputToggle';
import { NumberInputBox } from '../../NumberInputBox';
import { useFormDispatchContext } from '../hooks/useFormDispatchContext';
import { ServiceFormSliderColumn } from '../types';

interface SlideSettingEditorProps extends ServiceFormSliderColumn {
  section: number;
  column: number;
}

export const SlideSettingEditor: FC<SlideSettingEditorProps> = ({
  column,
  section,
  required,
  fixed_slide,
  min_slide,
  max_slide,
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
  const handleChangeFixedInit = (next: boolean) => {
    dispatch.updateItem({
      section,
      column,
      data: {
        fixed_slide: next,
      },
    });
  };
  const handleMinSlide = (next: number) => {
    let next_min = next;
    let next_max = max_slide;
    if (next_min >= next_max) {
      next_max = next_min + 1;
    }
    dispatch.updateItem({
      section,
      column,
      data: {
        min_slide: next_min,
        max_slide: next_max,
      },
    });
  };
  const handleMaxSlide = (next: number) => {
    let next_min = min_slide;
    let next_max = next;
    if (next_min >= next_max) {
      next_min = next_max - 1;
    }
    dispatch.updateItem({
      section,
      column,
      data: {
        min_slide: next_min,
        max_slide: next_max,
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
        <p className="text-gray800 text-b3">시작점 고정</p>
        <InputToggle value={fixed_slide} onChange={handleChangeFixedInit} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">최소값</p>
        <NumberInputBox
          className="w-[120px]"
          placeholder="(필수) 최소값"
          value={min_slide}
          onChange={handleMinSlide}
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray800 text-b3">최대값</p>
        <NumberInputBox
          className="w-[120px]"
          placeholder="(필수) 최대값"
          value={max_slide}
          onChange={handleMaxSlide}
        />
      </div>
    </div>
  );
};

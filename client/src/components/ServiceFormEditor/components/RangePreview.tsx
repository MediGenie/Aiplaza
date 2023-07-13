import { FC, useState, memo, useEffect } from 'react';
import { RangeSlide } from '../../RangeSlide';

interface RangePreviewProps {
  fixed_slide?: boolean;
  max: number;
  min: number;
}

const _RangePreview: FC<RangePreviewProps> = ({ fixed_slide, max, min }) => {
  const [state, setState] = useState(fixed_slide ? [max] : [min, max]);

  useEffect(() => {
    if (fixed_slide === true && state.length > 1) {
      setState([max]);
    } else if (fixed_slide === true && (state[0] > max || state[0] < min)) {
      setState([max]);
    } else if (fixed_slide === false && (state[0] < min || state[1] > max)) {
      setState([min, max]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, min, fixed_slide]);

  return <RangeSlide max={max} min={min} value={state} onChange={setState} />;
};

export const RangePreview = memo(_RangePreview);

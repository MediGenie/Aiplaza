import { FC, useState, useEffect } from 'react';
import { LinearSlide } from '../../LinearSlide';

interface LinearPreviewProps {
  min: number;
  max: number;
}

export const LinearPreview: FC<LinearPreviewProps> = ({ max, min }) => {
  const [state, setState] = useState(min);

  useEffect(() => {
    if (state > max || state < min) {
      setState(max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]);

  return (
    <LinearSlide
      maxValue={max}
      minValue={min}
      value={state}
      onChange={setState}
    />
  );
};

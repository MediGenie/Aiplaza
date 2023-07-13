import { useLayoutEffect } from 'react';
import { useLayoutContext } from '../Layout/useLayoutContext';

export function useHideFooter() {
  const { setHideFooter } = useLayoutContext();
  useLayoutEffect(() => {
    setHideFooter(true);
    return () => {
      setHideFooter(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

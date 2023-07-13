import { useContext } from 'react';
import { LayoutContext } from './context';

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('Layout 컨텍스트를 선언해주세요.');
  }
  return context;
}

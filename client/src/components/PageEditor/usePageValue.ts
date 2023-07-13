import { useContext } from 'react';
import { PageValueContext } from './page-context';

export function usePageValue() {
  const context = useContext(PageValueContext);
  if (context === undefined) {
    throw new Error('초기화 되지 않았습니다.');
  }
  return context;
}

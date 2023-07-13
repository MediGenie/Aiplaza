import { useContext } from 'react';
import { PageDispatchContext } from './page-context';

export function usePageDispatch() {
  const context = useContext(PageDispatchContext);
  if (context === undefined) {
    throw new Error('초기화 후 사용해주세요.');
  }
  return context;
}

import { useContext } from 'react';
import { FormDispatchContext } from '../form-context';

export function useFormDispatchContext() {
  const context = useContext(FormDispatchContext);
  if (context === undefined) {
    throw new Error('초기화 후 사용해 주세요.');
  }
  return context;
}

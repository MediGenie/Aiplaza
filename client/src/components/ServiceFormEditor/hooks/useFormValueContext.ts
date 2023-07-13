import { useContext } from 'react';
import { FormValueContext } from '../form-context';

export function useFormValueContext() {
  const context = useContext(FormValueContext);
  if (context === undefined) {
    throw new Error('초기화 후 사용해 주세요.');
  }
  return context;
}

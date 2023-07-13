import { useContext } from 'react';
import { ServiceFormContext } from '../context/service-form.context';

export function useServiceFormContext() {
  const context = useContext(ServiceFormContext);
  if (context === undefined) {
    throw new Error('초기화 이후 사용해주세요.');
  }
  return context;
}

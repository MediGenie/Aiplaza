import { useContext } from 'react';
import { ServiceEditContext } from '../context/service-edit.context';

export function useServiceEditContext() {
  const context = useContext(ServiceEditContext);
  if (context === undefined) {
    throw new Error('초기화 이후 사용해 주세요.');
  }
  return context;
}

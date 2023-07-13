import { useContext } from 'react';
import { ServiceCreateContext } from '../context/service-create.context';

export function useServiceCreateContext() {
  const context = useContext(ServiceCreateContext);
  if (context === undefined) {
    throw new Error('초기화 이후 사용해 주세요.');
  }
  return context;
}

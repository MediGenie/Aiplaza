import { useContext } from 'react';
import { AuthValueContext } from '../context';

export function useAuthValue() {
  const context = useContext(AuthValueContext);
  return context;
}

import { useContext } from 'react';
import { AuthDispatchContext } from '../context';

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  return context;
}

import { useLocation } from 'react-router-dom';

export function useRouteState<T extends Record<string, any>>() {
  const location = useLocation();
  return location.state as T;
}

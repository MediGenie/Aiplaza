import { useAuthValue } from './useAuthValue';

export function useIsLogin() {
  const authValue = useAuthValue();
  const user = authValue?.user || null;
  return user !== null;
}

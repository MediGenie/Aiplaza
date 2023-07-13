import { useAuthValue } from './useAuthValue';

export function useUserType() {
  const user = useAuthValue();
  if (user.user === null) {
    throw new Error('로그인 상태에서 사용해 주세요.');
  }
  return user.user.type;
}

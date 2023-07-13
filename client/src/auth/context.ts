import { createContext } from 'react';
import { AuthContextDispatchType, AuthContextValueType } from './type';

export const AuthValueContext = createContext<AuthContextValueType>({
  user: null,
});
export const AuthDispatchContext = createContext<AuthContextDispatchType>({
  login: () => {
    throw new Error('컨텍스트를 초기화 해주세요.');
  },
  logout: () => {
    throw new Error('컨텍스트를 초기화 해주세요.');
  },
  getAccessToken: () => {
    throw new Error('컨텍스트를 초기화 해주세요.');
  },
  loadUserInfo: () => {
    throw new Error('컨텍스트를 초기화 해주세요.');
  },
  socialLogin: () => {
    throw new Error('컨텍스트를 초기화 해주세요.');
  },
});

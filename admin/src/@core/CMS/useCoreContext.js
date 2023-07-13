import React, { useContext } from 'react';

export const CoreContext = React.createContext();

export function useCoreContext() {
  const context = useContext(CoreContext);
  if (!context) {
    throw new Error('Core Context안에서 사용해주세요.');
  }
  return context;
}

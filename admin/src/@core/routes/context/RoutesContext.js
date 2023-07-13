import React, { createContext, useContext } from 'react';

const RoutesContext = createContext([]);

export const RoutesProvider = ({ children, value }) => {
  return (
    <RoutesContext.Provider value={value}>{children}</RoutesContext.Provider>
  );
};

export const useRoutesContext = () => {
  const context = useContext(RoutesContext);
  if (!context) {
    throw new Error('RoutesProvider 안에서 호출해주세요.');
  }
  return context;
};

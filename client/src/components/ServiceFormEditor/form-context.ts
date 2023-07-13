import { createContext } from 'react';
import { ServiceFormDispatchType, ServiceFormType } from './types';

export const FormValueContext = createContext<ServiceFormType | undefined>(
  undefined
);

export const FormDispatchContext = createContext<
  ServiceFormDispatchType | undefined
>(undefined);

import { createContext } from 'react';
import { PageDispatchType, PageValueType } from './types';

export const PageValueContext = createContext<PageValueType | undefined>(
  undefined
);
export const PageDispatchContext = createContext<PageDispatchType | undefined>(
  undefined
);

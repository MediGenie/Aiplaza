import { createContext } from 'react';

export const LayoutContext = createContext<
  { setHideFooter: (next: boolean) => void } | undefined
>(undefined);

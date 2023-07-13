import { createContext } from 'react';
import { EditServiceType } from '../types/service-create.types';

export const ServiceEditContext = createContext<
  | {
      step: number;
      onChangeStep: (next: number) => void;
      data: EditServiceType;
      onChangeData: (next: Partial<EditServiceType>) => void;
    }
  | undefined
>(undefined);

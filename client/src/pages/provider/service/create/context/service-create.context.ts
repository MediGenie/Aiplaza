import { createContext } from 'react';
import { CreateServiceType } from '../types/service-create.types';

export const ServiceCreateContext = createContext<
  | {
      step: number;
      onChangeStep: (next: number) => void;
      data: CreateServiceType;
      onChangeData: (next: Partial<CreateServiceType>) => void;
    }
  | undefined
>(undefined);

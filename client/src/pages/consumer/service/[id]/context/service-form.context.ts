import { createContext } from 'react';
import { ServiceFormSection } from '../../../../../components/ServiceFormEditor/types';

export const ServiceFormContext = createContext<
  | undefined
  | {
      step: number;
      onChangeStep: (next: number) => void;
      form_data: ServiceFormSection[];
      // input_data: Record<string, any>;
      // onChangeInputData: (field: string, next: any) => void;
    }
>(undefined);

import { PageValueType } from '../../../../../components/PageEditor/types';
import { ServiceFormSection } from '../../../../../components/ServiceFormEditor/types';
export type { PageValueType } from '../../../../../components/PageEditor/types';
export type { ServiceFormType } from '../../../../../components/ServiceFormEditor/types';

export type ServiceContent = {
  title: string;
  description: string;
  thumbnail: null | File;
  email: string;
  price: number;
};

export type CreateServiceType = {
  content: ServiceContent;
  page: Omit<PageValueType, 'select_column'>;
  form: ServiceFormSection[];
  service_file: File | null;
};

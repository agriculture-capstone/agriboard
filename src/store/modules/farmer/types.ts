import { CoreModuleState } from '@/store/types';

export interface Farmer {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  notes: string;
  companyName?: string;
  paymentFrequency: string;
}

export type FarmersState = CoreModuleState<Farmer>;

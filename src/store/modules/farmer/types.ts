import { CoreModuleState } from '@/store/types';

export interface Farmer {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  notes: string;
  paymentFrequency: string;
  companyName?: string;
}

export type FarmersState = CoreModuleState<Farmer>;

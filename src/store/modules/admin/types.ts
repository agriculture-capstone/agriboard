import { CoreModuleState } from '@/store/types';

export interface Admin {
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

export type AdminState = CoreModuleState<Admin>;

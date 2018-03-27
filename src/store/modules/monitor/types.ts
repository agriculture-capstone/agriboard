import { CoreModuleState } from '@/store/types';

export interface Monitor {
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

export type MonitorState = CoreModuleState<Monitor>;

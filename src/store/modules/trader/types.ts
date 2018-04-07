import { CoreModuleState } from '@/store/types';

export interface Trader {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  username: string;
  companyName?: string;
}

export type TraderState = CoreModuleState<Trader>;

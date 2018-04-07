import { CoreModuleState } from '@/store/types';

export interface Monitor {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  username: string;
  companyName?: string;
}

export type MonitorState = CoreModuleState<Monitor>;

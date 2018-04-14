import { CoreModuleState } from '@/store/types';

export interface Milk {
  type: 'milk';
  datetime: string;
  toPersonUuid: string;
  fromPersonUuid: string;
  amountOfProduct: number;
  costPerUnit: number;
  currency: string;
  milkQuality?: string;
}

export type MilkState = CoreModuleState<Milk>;

import * as R from 'ramda';

import { GetterHandlers, RootState } from './types';

const globalGetters: GetterHandlers<RootState> = {
  /** Get all people */
  people (state) {
    const people = [...state.farmer.rows];
    return R.map(
      (person) => {
        const names = R.filter<string>(R.identity as any)([person.firstName, person.middleName, person.lastName]);
        const fullName = R.join(' ', names);

        // construct phone number
        let fullPhone: string = '';
        if (person.phoneCountry) {
          fullPhone += `+${person.phoneCountry}`;
        }
        if (person.phoneArea) {
          fullPhone += ` (${person.phoneArea})`;
        }
        if (person.phoneNumber) {
          const AREA_SIZE = 3;
          fullPhone += ` ${person.phoneNumber.slice(0, AREA_SIZE)}-${person.phoneNumber.slice(AREA_SIZE)}`;
        }

        // construct person
        return {
          name: fullName,
          phoneNumber: fullPhone,
          peopleCategory: 'farmer',
          lastModified: new Date(person.lastModified).toUTCString(),
        };
      },
      people,
    );
  },
};

export default globalGetters;

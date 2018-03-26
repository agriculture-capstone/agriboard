import * as R from 'ramda';

import { GetterHandlers, RootState, Person } from './types';

const globalGetters: GetterHandlers<RootState> = {
  /** Get all people */
  people (state) {
    const people = [
      ...R.map(r => ({ ...r, category: 'farmer' }), state.farmer.rows),
      ...R.map(r => ({ ...r, category: 'trader' }), state.trader.rows),
    ];
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
        const convertedPerson: Person = {
          name: fullName,
          phoneNumber: fullPhone,
          category: person.category,
          lastModified: person.lastModified,
        };

        return convertedPerson;
      },
      people,
    );
  },
};

export default globalGetters;

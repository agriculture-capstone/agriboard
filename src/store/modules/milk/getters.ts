import { CoreGetterHandlers } from '@/store/types';
import { Milk } from './types';
import * as moment from 'moment';

const milkGetters: CoreGetterHandlers<Milk> = {
  /**
   * get all of the store milk transactions
   * 
   * @returns  array of milk 
   * 
   */
  getAllMilkTransactions (state) {
// amountOfProduct:995.341
// costPerUnit:"14.46"
// currency:"UGX"
// datetime:"2017-01-15T00:57:43.959Z"
// from:"Hadassah Stamatia Hadassah Afroditi"
// fromPersonUuid:"ca225efc-fc3c-4dcb-b2e0-ae466c9b20c9"
// lastModified:"2017-09-29T20:00:04.596Z"
// milkQuality:"242.4"
// productType:"milk"
// productUnits:"litres"
// status:"clean"
// to:"Enoch Tsang"
// toPersonUuid:"a293e3a5-a88d-473b-9d4a-74a2153992f6"
// uuid:"0464e508-31fa-4c47-ab2d-56496c6518e4"
    return state.rows;
  },
    /**
   * get all of the store milk transactions
   * 
   * @returns  array of milk 
   * 
   */
  getSummedValuesByDate (state, getAllMilkTransactions) {
    const groupedValues = groupBy(getAllMilkTransactions, moment(getAllMilkTransactions.datetime).utc().format('YYYY-MM-DD'));
    const keys = groupedValues.keys;
    return groupedValues;
  },
  /**
   * get all of the store milk transactions
   * 
   * @returns  array of milk 
   * 
   */
  getSumOfValues (state, getAllMilkTransactions) {
    const sum = getAllMilkTransactions.reduce((sum: number, entry: any) => 
    (sum + entry.amountOfProduct, 0).toFixed(1));

    return sum;
  },
};

/** Helper Functions */

/**
 * @example

var myList = [
  {time: '12:00', location: 'mall'    },
  {time: '9:00',  location: 'store'   },
  {time: '9:00',  location: 'mall'    },
  {time: '12:00', location: 'store'   },
  {time: '12:00', location: 'market'  },
];

var byLocation = myList.groupBy('location');

***RESULT**
  byLocation = {
    mall: [
      {time: '9:00',  location: 'mall'  },
      {time: '12:00', location: 'mall'  },
    ],
    store: [
      {time: '9:00',  location: 'store' },
      {time: '12:00', location: 'store' }
    ],
    market: [
      {time: '12:00', location: 'market'}
    ]
  }
 */
function groupBy<T>(array: T[], prop: string) {
  return array.reduce(function (groups: any, item: any) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
}
export default milkGetters;

export default {
  /**
   * generates a random set of collection data
   * 
   * @returns {object[]} array populated with collection transaction objects
   */
  fillCollections(): object[] {
    const data = [];
    const dataItems = 40;
    const min = 10;
    const max = 200;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-03-01T18:58:51-06:00');
      currentDate.setDate(currentDate.getDate() + i);
      const currentValue = Math.random() * (max - min) + min;
      data.push({
        type: 'collections',
        productType: 'milk',
        datetime: currentDate,
        amountOfProduct: currentValue,
        productUnits: 'L',
        costPerUnit: '54',
        currency: 'UGX',
        lastModified: currentDate,
      });
    }
    return data;
  },
  /**
   * generates a random set of export data
   * 
   * @returns {object[]} array populated with export transaction objects
   */
  fillExports(): object[] {
    const data = [];
    const dataItems = 40;
    const min = 10;
    const max = 200;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-03-01T18:58:51-06:00');
      currentDate.setDate(currentDate.getDate() + i);
      const currentValue = Math.random() * (max - min) + min;
      data.push({
        type: 'deliveries',
        productType: 'milk',
        transportID: '',
        datetime: currentDate,
        amountOfProduct: currentValue,
        productUnits: 'L',
        lastModified: currentDate,
      });
    }
    return data;
  },
  /**
   * generates a random set of loans data
   * 
   * @returns {object[]} array populated with loans transaction objects
   */
  fillLoans(): object[] {
    const data = [];
    const dataItems = 40;
    const min = 300;
    const max = 2000;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-03-01T18:58:51-06:00');
      currentDate.setDate(currentDate.getDate() + i);
      const currentValue = Math.random() * (max - min) + min;
      data.push({
        type: 'loans',
        datetime: currentDate,
        amountOfProduct: currentValue,
        currency: 'UGX',
        lastModified: currentDate,
      });
    }
    return data;
  },
  /**
   * generates a random set of payment data
   * 
   * @returns {object[]} array populated with payment transaction objects
   */
  fillPayments(): object[] {
    const data = [];
    const dataItems = 40;
    const min = 100;
    const max = 2000;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-03-01T18:58:51-06:00');
      currentDate.setDate(currentDate.getDate() + i);
      const currentValue = Math.random() * (max - min) + min;
      data.push({
        type: 'payments',
        datetime: currentDate,
        amountOfProduct: currentValue,
        currency: 'UGX',
        lastModified: currentDate,
      });
    }
    return data;
  },
};

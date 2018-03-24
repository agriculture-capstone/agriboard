export default {

  fillCollections() {
    const data = [];
    const dataItems = 40;
    const min = 10;
    const max = 200;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-02-20T18:58:51-06:00');
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

  fillExports() {
    const data = [];
    const dataItems = 40;
    const min = 10;
    const max = 200;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-02-20T18:58:51-06:00');
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

  fillLoans() {
    const data = [];
    const dataItems = 40;
    const min = 300;
    const max = 2000;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-02-20T18:58:51-06:00');
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

  fillPayments() {
    const data = [];
    const dataItems = 40;
    const min = 100;
    const max = 2000;
    for (let i = 0; i < dataItems; i++) {
      const currentDate = new Date('2018-02-20T18:58:51-06:00');
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

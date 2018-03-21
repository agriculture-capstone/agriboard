<template>
  <div class='ProductTransactions'>
    <md-table v-model="productTransactions" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Product Transactions</h1>
        </div>
        <md-button v-on:click="downloadCsv" class="md-raised md-accent download_csv_button">Download CSV</md-button>
      </md-table-toolbar>

      <h2 class="error md-subheader">{{error}}</h2>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Type" md-sort-by="productType">{{item.productType}}</md-table-cell>
        <md-table-cell md-label="Date Time" md-sort-by="datetime">{{item.datetime}}</md-table-cell>
        <md-table-cell md-label="Amount" md-sort-by="amountOfProduct">{{item.amountOfProduct}}</md-table-cell>
        <md-table-cell md-label="Units" md-sort-by="productUnits">{{item.productUnits}}</md-table-cell>
        <md-table-cell md-label="Cost per Unit" md-sort-by="costPerUnit">{{item.costPerUnit}}</md-table-cell>
        <md-table-cell md-label="Currency" md-sort-by="currency">{{item.currency}}</md-table-cell>
        <md-table-cell md-label="Last Modified" md-sort-by="lastModified">{{item.lastModified}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

interface ProductTransaction {
  productType: string;
  datetime: string;
  amountOfProduct: number;
  productUnits: string;
  costPerUnit: number;
  currency: string;
  lastModified: string;
}

export default Vue.extend({
  name: 'ProductTransactions',
  methods: {
    downloadCsv: async function downloadCsv() {
      const auth = `Bearer ${localStorage.getItem('token')}`;
      const response = await fetch(
        new Request(
          'https://boresha.live:19443/transactions/products/milk/download',
          {
            method: 'get',
            headers: new Headers({
              Authorization: auth,
            }),
          },
        ),
      );
      const blob = await response.blob();
      const date = moment().format('YYYY-MM-DD'); 
      const filename = `${date}-collections.csv`;
      saveAs(blob, filename);
    },
  },
  created: async function created() {
    // get productTransactions types
    const productTypes: any[] = [];
    await axios
      .get('https://boresha.live:19443/products')
      .then((response: any) => {
        response.data.map((productType: any) => {
          productTypes.push(productType.name);
        });
      })
      .catch((error: any) => {
        console.log(error.message);
        this.error = error.message;
      });

    // get all productTransactions
    const allProductTransactions: Promise<
      ProductTransaction[]
    >[] = productTypes.map((productType: string) => {
      // get all productTransactions of particular productType
      return axios
        .get('https://boresha.live:19443/transactions/products/' + productType)
        .then((response: any) => {
          // construct each product transaction
          return response.data.map((transaction: any) => {
            // construct product transaction
            return {
              productType: transaction.productType,
              datetime: new Date(transaction.datetime).toUTCString(),
              amountOfProduct: transaction.amountOfProduct,
              productUnits: transaction.productUnits,
              costPerUnit: transaction.costPerUnit,
              currency: transaction.currency,
              lastModified: new Date(transaction.lastModified).toUTCString(),
            };
          });
        })
        .catch((error: any) => {
          console.log(error.message);
          this.error = error.message;
        });
    });

    const allProductTransactionsFlat = (await Promise.all(
      allProductTransactions,
    )).reduce(function (prev: ProductTransaction[], curr: ProductTransaction[]) {
      return prev.concat(curr);
    });

    // update list
    this.productTransactions = allProductTransactionsFlat;
  },
  data() {
    return {
      productTransactions: [],
      error: '',
    };
  },
});
</script>

<style lang='scss' scoped>
.md-field {
  max-width: 300px;
}

.md-title {
  text-align: left;
  font-size: 2em;
  padding: 1rem;
  line-height: 3em;
}

.md-content {
  height: 1vh;
}

.error {
  text-align: center;
  margin: auto;
  color: red;
}
</style>

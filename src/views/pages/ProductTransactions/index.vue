<template>
  <div class='ProductTransactions'>
    <md-table class="table" v-model="productTransactions" md-sort="name" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"><md-icon class="md-size-2x icon">receipt</md-icon> Product Transactions</h1>
        </div>
        <md-button v-on:click="downloadCsv" class="md-raised md-accent download_csv_button">Download CSV</md-button>
      </md-table-toolbar>

      <h2 class="error md-subheader">{{error}}</h2>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Date" md-sort-by="datetime">{{item.datetime}}</md-table-cell>
        <md-table-cell md-label="From" md-sort-by="from">{{item.from}}</md-table-cell>
        <md-table-cell md-label="To" md-sort-by="to">{{item.to}}</md-table-cell>
        <md-table-cell :md-label="`Amount (${item.productUnits})`" md-sort-by="amountOfProduct">{{item.amountOfProduct}}</md-table-cell>
        <md-table-cell :md-label="`Rate (${item.productUnits}/${item.currency})`" md-sort-by="costPerUnit">{{item.costPerUnit}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

import TokenService from '@/services/Token';

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
      const auth = `Bearer ${TokenService.token}`;
      const response = await fetch(
        new Request(
          'https://boresha.live:19433/transactions/products/milk/download',
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
      .get('https://boresha.live:19433/products')
      .then((response: any) => {
        response.data.map((productType: any) => {
          productTypes.push(productType.name);
        });
      })
      .catch((error: any) => {
        this.error = error.message;
      });

    // get all productTransactions
    const allProductTransactions: Promise<
      ProductTransaction[]
    >[] = productTypes.map((productType: string) => {
      // get all productTransactions of particular productType
      return axios
        .get('https://boresha.live:19433/transactions/products/' + productType)
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
              to: transaction.to,
              from: transaction.from,
            };
          });
        })
        .catch((error: any) => {
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
@import 'src/styles.scss';
.md-title {
  text-align: left;
  font-size: 2em;
  padding: 1rem 0rem;
  line-height: 3em;
  vertical-align: center;
}


.error {
  text-align: center;
  margin: auto;
  color: red;
}

.table {
  padding: 0vh  2vw;
}

.icon {
  color: $icon-color !important;
}
</style>

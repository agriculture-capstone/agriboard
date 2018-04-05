<template>
  <div class='ProductTransactions'>
    <md-table class="table" v-model="productTransactions" md-sort="name" md-sort-order="asc" @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"><md-icon class="md-size-2x icon">receipt</md-icon> Product Transactions</h1>
        </div>
        <md-button v-on:click="downloadCsv" class="md-raised md-accent download_csv_button">Download CSV</md-button>
      </md-table-toolbar>

      <h2 class="error md-subheader">{{error}}</h2>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select>
        <md-table-cell md-label="Date" md-sort-by="datetime">{{item.datetime}}</md-table-cell>
        <md-table-cell md-label="From" md-sort-by="from">{{item.from}}</md-table-cell>
        <md-table-cell md-label="To" md-sort-by="to">{{item.to}}</md-table-cell>
        <md-table-cell :md-label="`Amount (${item.productUnits})`" md-sort-by="amountOfProduct">{{item.amountOfProduct}}</md-table-cell>
        <md-table-cell :md-label="`Rate (${item.currency}/${item.productUnits})`" md-sort-by="costPerUnit">{{item.costPerUnit}}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="view-dialog-wrapper">
      <md-dialog v-if="selectedRow" :md-active.sync="showViewDialog">
        <md-dialog-title>Transaction Details</md-dialog-title>
          <md-dialog-content>
            <div class="md-subhead">
              <md-icon>access_time</md-icon>
              <span>Date: {{ selectedRow.datetime }}</span>
            </div>
            <h3><b>From</b></h3>
            {{ selectedRow.from }}
            <h3><b>To</b></h3>
            {{ selectedRow.to }}
            <h3><b>Amount ({{ selectedRow.productUnits }})</b></h3>
            {{ selectedRow.amountOfProduct }}
            <h3><b>Rate ({{ selectedRow.currency }}/{{ selectedRow.productUnits }})</b></h3>
            {{ selectedRow.costPerUnit }}
          </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="onCancelView">Cancel</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import * as moment from 'moment';

import CoreAPI from '@/utils/CoreAPI';
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
      try {
        await CoreAPI.downloadMilk();
      } catch (err) {
        this.error = 'Unable to download data.';
      }
    },
    onSelect(item: any) {
      this.selectedRow = item;
      this.showViewDialog = true;
    },
    onCancelView() {
      this.showViewDialog = false;
      this.selectedRow = {};
    },
  },
  computed: {
    productTransactions (): any {
      return this.$store.state.milk.rows.map((row: any) => {
        return {
          ...row, 
          datetime: moment(row.datetime).format('YYYY-MM-DD h:mm:ss a'),
        };
      });
    },
  },
  data() {
    return {
      error: '',
      showViewDialog: false,
      selectedRow: {},
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

.md-dialog {
  min-width: 443px;
}

.md-dialog-title {
  margin-bottom: 0;
  padding: 24px;
  line-height: 2em;
}

.md-dialog-content {
  display: inline-block;
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

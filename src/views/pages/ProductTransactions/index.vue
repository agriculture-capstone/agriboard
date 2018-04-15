<template>
  <div class='ProductTransactions'>
    <md-table class="table" v-model="rows" @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"><md-icon class="md-size-2x icon">receipt</md-icon> Product Transactions</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end search">
          <md-input placeholder="Search" v-model="search" />
        </md-field>
      </md-table-toolbar>

      <h2 class="error md-subheader">{{error}}</h2>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select>
        <md-table-cell md-label="Date">{{item.datetime}}</md-table-cell>
        <md-table-cell md-label="From">{{item.from}}</md-table-cell>
        <md-table-cell md-label="To">{{item.to}}</md-table-cell>
        <md-table-cell :md-label="`Amount (${item.productUnits})`">{{item.amountOfProduct}}</md-table-cell>
        <md-table-cell :md-label="`Rate (${item.currency}/${item.productUnits})`">{{item.costPerUnit}}</md-table-cell>
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
    <md-button class="md-fab md-primary download-csv">
      <md-icon>file_download</md-icon>
    </md-button>
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
    productTransactions (): any[] {
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
      search: '',
      rows: [],
    };
  },
  created () {
    this.rows = this.productTransactions;
  },
  watch: {
    search () {
      this.rows = this.search ?
        this
          .productTransactions
          .filter((row: any) => {
            const values = Object.values(row);

            return values.find(v => String(v).toLowerCase().includes(this.search.toLowerCase()));
          }) :
        this.productTransactions;
    },
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
  max-width: 100%;
  min-width: 35%;
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

.download-csv {
  position: fixed;
  right: 24px;
  bottom: 20px;

  @media screen and (max-device-width: 480px) {
    right: 16px;
  }
}

.search {
  max-width: 300px;
}
</style>

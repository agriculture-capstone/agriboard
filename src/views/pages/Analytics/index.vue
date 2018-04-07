<template>
  <div>
    <!-- Stats Section -->
    <div class="md-layout stats md-gutter">
        <md-card class="md-layout-item md-elevation-6">
          <md-card-header>
            <md-card-header-text>
              <div class="stat-heading">Milk Collected (Month)</div>
              <div class="stat">{{collected}} L</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
        <md-card class="md-layout-item md-elevation-6">
          <md-card-header>
            <md-card-header-text>
              <div class="stat-heading">Milk Delivered (Month)</div>
              <div class="stat">{{delivered}} L</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
        <md-card class="md-layout-item md-elevation-6">
          <md-card-header>
            <md-card-header-text>
              <div class="stat-heading">Loans Dispensed (Month)</div>
              <div class="stat">{{this.grouped}} UGX</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
    </div>
    <!-- Graphs -->
    <md-card class='md-elevation-10 graph'>
      <graph 
        v-bind:values="productTranscations" 
        title="Milk-Collections-and-Deliveries" 
        xUnits="Date" 
        yUnits="Litres"
      />
    </md-card>
    <md-card class='md-elevation-10 graph'>
      <graph 
        v-bind:values="moneyTranscations" 
        title="Loans-and-Payments" 
        xUnits="Date" 
        yUnits="UGX"
      />
    </md-card>
  </div>
</template>

<script>
import graph from "../../components/AnalyticsGraph";
import dataGenerator from "../../../utils/dataGenerator"
import moment from "moment";
import * as d3 from "d3";
import { mapGetters } from 'vuex'


export default {
  name: "analytics",
  data() {
    return {
      productTranscations: [],
      moneyTranscations: [],
      collected: 0,
      delivered: 0,
      dispensed: 0,
      milkTransactions:this.milk,
      grouped:this.grouped,
    };
  },
  components: {
    graph,
  },

  created() {
  // generate data 
    this.productTranscations.push(dataGenerator.fillCollections());
    this.productTranscations.push(dataGenerator.fillExports ());
    this.moneyTranscations.push(dataGenerator.fillLoans ());
    this.moneyTranscations.push(dataGenerator.fillPayments ());

  // calculate the stats
    this.collected = this.calculateCollected ();
    this.delivered = this.calculateDelivered ();
    this.dispensed = this.calculateLoans ();
  },
  computed: {
    ...mapGetters({
      // Mounts the "getAllMilkTransactions" getter to the scope of your component.
      milk:'milk/getAllMilkTransactions',
      grouped:'milk/getSummedValues'
    })
  },
  methods: {

    calculateCollected () {
      let collections = this.productTranscations[0];
      let collected = collections.reduce((sum, transaction) => 
        this.inSameMonth(transaction.datetime) ? sum + transaction.amountOfProduct : sum + 0, 0).toFixed(3);
      return collected;
    },

    calculateDelivered () {
      let deliveries = this.productTranscations[1];
      let delivered = deliveries.reduce((sum, transaction) => 
        this.inSameMonth(transaction.datetime) ? sum + transaction.amountOfProduct : sum + 0, 0).toFixed(3);
      return delivered;    
    },

    calculateLoans () {
      let loans = this.moneyTranscations[0];
      let dispensed = loans.reduce((sum, transaction) => 
        this.inSameMonth(transaction.datetime) ? sum + transaction.amountOfProduct : sum + 0, 0).toFixed(3);
      return dispensed;    
    },

    calculatePayments () {
      let payments = this.moneyTranscations[1];
      let payed = payments.reduce((sum, transaction) => 
        this.inSameMonth(transaction.datetime) ? sum + transaction.amountOfProduct : sum + 0, 0).toFixed(3);
      return payed;    
    },

    inSameDay(date) {
      return moment(date).utc().isSame(moment().local(), 'day') ? true : false;
      },

    inLastWeek(date) {
      return moment(date).utc().isSame(moment().local(), 'week') ? true : false;
    },

    inSameMonth(date) {
      return moment(date).utc().isSame(moment().local(), 'month') ? true : false;
    },
  }
};
</script>

<style scoped>
.md-card {
  width: 90vw;
  margin: auto;
  justify-content: center;
  align-items: center;
}

.center {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
.graph {
  height: 33vh;
  margin-top:.5%;
}

.stats {
  margin-top:1%;
  height: 16vh;
  width: 90vw;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.stat {
  font-size:1.8vh;
  color: grey;
  font-weight: bold;
  text-align: center;
}

.stat-heading {
  font-size:2vh;
  color: steelblue;
  font-weight: bold;
  text-align: center;
}
</style>
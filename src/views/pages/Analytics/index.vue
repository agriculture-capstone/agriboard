<template>
  <div class='center'>
      <md-card class='md-elevation-10 stats'>
            <div class="md-title"> Monthly Statistics </div>
          <div class="md-layout">
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="stat-heading">Milk Collected</div>
                    <div class="stat">{{collected}} L</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="stat-heading">Milk Delivered</div>
                    <div class="stat">{{delivered}} L</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="stat-heading">Loans Dispensed</div>
                    <div class="stat">{{disperesed}} UGX</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
          </div>
      </md-card>

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
          title="Loan-Dispersals-and-Payments" 
          xUnits="Date" 
          yUnits="UGX"
        />
      </md-card>
  </div>
</template>

<script>
import graph from "../../components/AnalyticsGraph";
import moment from "moment";
import * as d3 from "d3";

export default {
  name: "analytics",
  data() {
    return {
      productTranscations: [],
      moneyTranscations: [],
      collected: 0,
      delivered: 0,
      dispensed: 0,
      payed: 0,
    };
  },
  components: {
    graph,
  },

  created() {
  // generate data 
    this.productTranscations.push(this.fillCollections ());
    this.productTranscations.push(this.fillExports ());
    this.moneyTranscations.push(this.fillLoans ());
    this.moneyTranscations.push(this.fillPayments ());

  // calculate the stats
    this.collected = this.calculateCollected ();
    this.delivered = this.calculateDelivered ();
    this.disperesed = this.calculateLoans ();
    this.payed = this.calculatePayments ();

  },
  methods: {
    fillCollections () {
      let data = [];
      for(let i=0; i<110; i++) {
        let currentDate = new Date("2018-01-20T18:58:51-06:00");
        currentDate.setDate(currentDate.getDate() + i);
        let currentValue = d3.randomUniform(10, 200)();

        data.push({
          type: 'collections',
          productType: 'milk',
          datetime: currentDate,
          amountOfProduct: currentValue,
          productUnits: 'L',
          costPerUnit: '54',
          currency: 'UGX',
          lastModified: currentValue,
        });
      }
      return data;
    },
    
    fillExports () {
      let data = [];
      for(let i=0; i<110; i++) {
        let currentDate = new Date("2018-01-20T18:58:51-06:00");
        currentDate.setDate(currentDate.getDate() + i);
        let currentValue = d3.randomUniform(10, 200)();

        data.push({
          type: 'deliveries',
          productType: 'milk',
          datetime: currentDate,
          amountOfProduct: currentValue,
          productUnits: 'L',
          costPerUnit: '54',
          currency: 'UGX',
          lastModified: currentValue,
        });
      }
      return data;
    },
    
    fillLoans () {
      let data = [];
      for(let i=0; i<110; i++) {
        let currentDate = new Date("2018-01-20T18:58:51-06:00");
        currentDate.setDate(currentDate.getDate() + i);
        let currentValue = d3.randomUniform(300, 2000)();

        data.push({
          type: 'loans',
          datetime: currentDate,
          amountOfProduct: currentValue,
          currency: 'UGX',
          lastModified: currentValue,
        });
      }
      return data;
    },

    fillPayments () {
      let data = [];

      for(let i=0; i<110; i++) {
        let currentDate = new Date("2018-01-20T18:58:51-06:00");
        currentDate.setDate(currentDate.getDate() + i);
        let currentValue = d3.randomUniform(100, 2000)();

        data.push({
          type: 'payments',
          datetime: currentDate,
          amountOfProduct: currentValue,
          currency: 'UGX',
          lastModified: currentValue,
        });
      }
      return data;
    },

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
  height: 35vh;
  margin-top:.5%;
}

.stats {
  margin-top:1%;
  height: 16vh;
  align-items: center;
}

.stat {
  font-size:1.8vh;
  color: grey;
  font-weight: bold;
}

.stat-heading {
  font-size:2vh;
  color: steelblue;
  font-weight: bold;
}

#stats-title {
  font-size:3vh;
  font-weight: '900';

}
</style>
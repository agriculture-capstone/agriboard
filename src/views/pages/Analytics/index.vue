<template>
  <div>
    <!-- Stats Section -->
    <div class="md-layout stats md-gutter">
        <md-card class="md-layout-item md-elevation-6">
          <md-card-header>
            <md-card-header-text>
              <div class="stat-heading">Milk Collected (Month)</div>
              <div class="stat">{{collectedSum}} L</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
        <md-card class="md-layout-item md-elevation-6">
          <md-card-header>
            <md-card-header-text>
              <div class="stat-heading">Milk Delivered (Month)</div>
              <div class="stat">{{deliverySum}} L</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
        <md-card class="md-layout-item md-elevation-6">
          <md-card-header>
            <md-card-header-text>
              <div class="stat-heading">Loans Dispensed (Month)</div>
              <div class="stat">{{loanSum}} UGX</div>
            </md-card-header-text>
          </md-card-header>
        </md-card>
    </div>
    <!-- Graphs -->
    <md-card class='md-elevation-10 graph'>
      <graph 
        v-bind:values="productTransactions" 
        title="Milk-Collections-and-Deliveries" 
        xUnits="Date" 
        yUnits="Litres"
      />
    </md-card>
    <md-card class='md-elevation-10 graph'>
      <graph 
<<<<<<< HEAD
        v-bind:values="moneyTranscations" 
        title="Loans-and-Payments-Dispersed" 
=======
        v-bind:values="moneyTransactions" 
        title="Loans-and-Payments" 
>>>>>>> jamesinglis/payment-module
        xUnits="Date" 
        yUnits="UGX"
      />
    </md-card>
  </div>
</template>

<script>
import graph from "../../components/AnalyticsGraph";
import dataGenerator from "../../../utils/dataGenerator";
import moment from "moment";
import * as d3 from "d3";
import { mapGetters } from "vuex";

export default {
  name: "analytics",
  data() {
    return {
      // productTranscations: [],
      // moneyTranscations: [],
      collected: 0,
      delivered: 0,
      dispensed: 0
    };
  },
  components: {
    graph
  },

  created() {
    // generate data
    // this.productTranscations.push(dataGenerator.fillCollections());
    // this.productTranscations.push(dataGenerator.fillExports ());
    // this.moneyTranscations.push(dataGenerator.fillLoans ());
    // this.moneyTranscations.push(dataGenerator.fillPayments ());
    // calculate the stats
    // this.collected = this.calculateCollected ();
    // this.delivered = this.calculateDelivered ();
    // this.dispensed = this.calculateLoans ();
  },
  computed: {
    // ...mapGetters({
    //   // Mounts the "getAllMilkTransactions" getter to the scope of your component.
    //   milk:'milk/getAllMilkTransactions',
    //   grouped:'milk/getSumOfValues'
    // }),

    productTransactions: function() {
      let transactions = [];
      const milkTransactions = this.$store.state.milk.rows.map(row => {
        return {
          amountOfProduct: row.amountOfProduct,
          datetime: moment(row.datetime).format("YYYY-MM-DD")
        };
      });
      const deliveryTransactions = this.$store.state.delivery.rows.map(row => {
        return {
          amountOfProduct: row.amountOfProduct*.4, // TODO remove scaling for non rand data
          datetime: moment(row.datetime).format("YYYY-MM-DD")
        };
      });
      transactions.push(
        this.sortAscending(this.getSummedValuesByDate(milkTransactions, "datetime", "collections"))
      );
      transactions.push(
        this.sortAscending(this.getSummedValuesByDate(deliveryTransactions, "datetime", "deliveries"))
      );
      return transactions;
    },
    moneyTransactions: function() {
      let transactions = [];
      const loanTransactions = this.$store.state.loan.rows.map(row => {
        return {
          amountOfProduct: Math.trunc(row.amount),
          datetime: moment(row.datetime).format("YYYY-MM-DD")
        };
      });
      const paymentTransactions = this.$store.state.milk.rows.map(row => {
        return {
          amountOfProduct: row.amountOfProduct, // TODO remove scaling for non rand data
          datetime: moment(row.datetime).format("YYYY-MM-DD")
        };
      });
      transactions.push(
        this.sortAscending(this.getSummedValuesByDate(loanTransactions, "datetime", "loans"))
      );
      transactions.push(
        this.sortAscending(this.getSummedValuesByDate(paymentTransactions, "datetime", "payments"))
      );
      return transactions;
    },
    collectedSum: function() {
      let collections = this.$store.state.milk.rows.map(row => {
        return {
          amountOfProduct: row.amountOfProduct,
          datetime: moment(row.datetime).format("YYYY-MM-DD h:mm:ss a")
        };
      });
      return this.calculateSum(collections);
    },
    deliverySum: function() {
      let deliveries = this.$store.state.delivery.rows.map(row => {
        return {
          amountOfProduct: row.amountOfProduct,
          datetime: moment(row.datetime).format("YYYY-MM-DD h:mm:ss a")
        };
      });
      return this.calculateSum(deliveries);
    },
    loanSum: function() {
      let loans = this.$store.state.loan.rows.map(row => {
        return {
          amountOfProduct: row.amount,
          datetime: moment(row.datetime).format("YYYY-MM-DD h:mm:ss a")
        };
      });
      return this.calculateSum(loans);
    }
  },
  methods: {
    calculateSum(data) {
      let sum = 0;
      if (data.length > 0) {
        sum = data
          .reduce(
            (sum, transaction) =>
              this.inSameMonth(transaction.datetime)
                ? sum + transaction.amountOfProduct
                : sum + 0,0);
      } else {
        sum = 0;
      }
      return Math.trunc(sum);
    },
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
    groupBy(data, prop) {
      return data.reduce((groups, item) => {
        const val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
      }, {});
    },

    getSumOfValues(data) {
      let sum = 0;
      if (data.length > 0) {
        sum = data.reduce((sum, entry) => sum + entry.amountOfProduct, 0);
      } else sum = 0;
      return sum;
    },

    getSummedValuesByDate(data, prop, type) {
      let summedTransaction = [];
      const groupedValues = this.groupBy(data, prop);
      const keys = Object.keys(groupedValues);
      keys.forEach(function(date) {
          let sum = groupedValues[date].reduce(
            (sum, entry) => sum + entry.amountOfProduct,0);
          summedTransaction.push({
            type: type,
            datetime: new Date(date),
            amountOfProduct: sum
          });
      });
      return summedTransaction;
    },

    inSameDay(date) {
      return moment(date)
        .utc()
        .isSame(moment().local(), "day")
        ? true
        : false;
    },

    inLastWeek(date) {
      return moment(date)
        .isSame(moment().local(), "week")
        ? true
        : false;
    },

    inSameMonth(date) {
      return moment(date, "YYYY-MM-DD")
        .isSame(moment().local(), "month")
        ? true
        : false;
    },
    sortAscending(array) {
      return array.sort(function(a, b) {
        let d1 = moment(a.datetime, "YYYY-MM-DD");
        let d2 = moment(b.datetime, "YYYY-MM-DD");
        return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
      });
    }
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
  margin-top: 0.5%;
}

.stats {
  margin-top: 1%;
  height: 16vh;
  width: 90vw;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.stat {
  font-size: 1.8vh;
  color: grey;
  font-weight: bold;
  text-align: center;
}

.stat-heading {
  font-size: 2vh;
  color: steelblue;
  font-weight: bold;
  text-align: center;
}
</style>
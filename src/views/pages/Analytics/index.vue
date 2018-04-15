<template>
  <div id="analytics">
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
        v-bind:values="moneyTransactions"
        title="Loans-and-Payments"
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
  components: {
    graph,
  },
  computed: {
    /**
    * @description combine the milk and delivery data into one array for the graph
    *
    * @returns array containing processed milk and delivery data
    */
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
    /**
    * @description combine the loan and payment data into one array for the graph
    *
    * @returns array containing processed loan and payment data
    */
    moneyTransactions: function() {
      let transactions = [];
      const loanTransactions = this.$store.state.loan.rows.map(row => {
        return {
          amountOfProduct: Math.trunc(row.amount),
          datetime: moment(row.datetime).format("YYYY-MM-DD")
        };
      });
      const paymentTransactions = this.$store.state.payment.rows.map(row => {
        return {
          amountOfProduct: Math.trunc(row.amount),
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
    /**
    * @description calculate the collected sum of delivery values
    *
    * @returns sum of collected for current month
    */
    collectedSum: function() {
      let collections = this.$store.state.milk.rows.map(row => {
        return {
          amountOfProduct: row.amountOfProduct,
          datetime: moment(row.datetime).format("YYYY-MM-DD h:mm:ss a")
        };
      });
      return this.calculateMonthSum(collections);
    },
    /**
    * @description calculate the monthly sum of delivery values
    *
    * @returns sum of delivery for current month
    */
    deliverySum: function() {
      let deliveries = this.$store.state.delivery.rows.map(row => {
        return {
          amountOfProduct: row.amountOfProduct,
          datetime: moment(row.datetime).format("YYYY-MM-DD h:mm:ss a")
        };
      });
      return this.calculateMonthSum(deliveries);
    },
    /**
    * @description calculate the monthly sum of loan values
    *
    * @returns sum of loans for current month
    */
    loanSum: function() {
      let loans = this.$store.state.loan.rows.map(row => {
        return {
          amountOfProduct: row.amount,
          datetime: moment(row.datetime).format("YYYY-MM-DD h:mm:ss a")
        };
      });
      return this.calculateMonthSum(loans);
    }
  },
  methods: {
    /**
    * @description calculates the some of values in the current month
    *
    * @returns the sum from the current month
    */
    calculateMonthSum(data) {
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
    * @description method which takes a data set and the prop to group it by
    *
     * @example
      var myList = [
        {time: '12:00', location: 'mall'    },
        {time: '9:00',  location: 'store'   },
        {time: '9:00',  location: 'mall'    },
        {time: '12:00', location: 'store'   },
        {time: '12:00', location: 'market'  },
      ];

      var byLocation = myList.groupBy('location');
    *@returns an object who's properties are the array groups
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
    /**
    * @description sum all values in a data set
    *
    * @returns the sume of values
    */
    getSumOfValues(data) {
      let sum = 0;
      if (data.length > 0) {
        sum = data.reduce((sum, entry) => sum + entry.amountOfProduct, 0);
      } else sum = 0;
      return sum;
    },
    /**
    * @description given a data array it will group by the prop (in this case date)
    * and create a new array with the data relevant to the graphs
    * @returns array of objects for the graphs
    */
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
    /**
    * @description checks if passed date is in the current month
    *
    * @returns True if date is in current month
    */
    inSameMonth(date) {
      return moment(date, "YYYY-MM-DD")
        .isSame(moment().local(), "month")
        ? true
        : false;
    },
    /**
    * @description sorts an array into ascending order by date
    *
    * @returns sorted array
    */
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

<style lang="scss" scoped>
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

@media screen and (max-device-width: 480px) {
  #analytics {
    > * {
      margin: 0;
      width: 100vw;
    }
  }
}
</style>

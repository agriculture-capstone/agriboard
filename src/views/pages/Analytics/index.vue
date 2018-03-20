<template>
  <div class='center'>
      <md-card class='md-elevation-10 stats'>
            <div class="md-title"> Weekly Statistics </div>
          <div class="md-layout">
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="stat-heading">Milk Collected</div>
                    <div class="stat">341 L</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="stat-heading">Milk Delivered</div>
                    <div class="stat">333 L</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="stat-heading">Loans Dispersed</div>
                    <div class="stat">3454 L</div>
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

import * as d3 from "d3";

export default {
  name: "analytics",
  data() {
    return {
      productTranscations: [],
      moneyTranscations: [],
      error: '',
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
    //add more pushes for more lines


    // function fillData () {
    //   let data = [];

    //   let currentValue = 100;
    //   let random = d3.randomNormal(200, 1000);

    //   for(let i=0; i<40; i++) {
    //     let currentDate = new Date("February 10, 2018 01:15:00");
    //     currentDate.setDate(currentDate.getDate() + i);
    //     currentValue = d3.randomUniform(10, 200)();

    //     data.push({
    //       productType: 'milk',
    //       datetime: currentDate,
    //       amountOfProduct: currentValue,
    //       productUnits: 'L',
    //       costPerUnit: '54',
    //       currency: 'UGX',
    //       lastModified: currentValue,
    //     });

    //     data.push([currentDate, currentValue]);
    //   }
    // return data;
    // }

  },
  methods: {

    fillCollections () {
      let data = [];
      for(let i=0; i<40; i++) {
        let currentDate = new Date("February 10, 2018 01:15:00");
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
      for(let i=0; i<40; i++) {
        let currentDate = new Date("February 10, 2018 01:15:00");
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
      for(let i=0; i<40; i++) {
        let currentDate = new Date("February 10, 2018 01:15:00");
        currentDate.setDate(currentDate.getDate() + i);
        let currentValue = d3.randomUniform(10, 200)();

        data.push({
          type: 'loans',
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

    fillPayments () {
      let data = [];

      for(let i=0; i<40; i++) {
        let currentDate = new Date("February 10, 2018 01:15:00");
        currentDate.setDate(currentDate.getDate() + i);
        let currentValue = d3.randomUniform(10, 200)();

        data.push({
          type: 'payments',
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
  color: grey
}

.stat-heading {
  font-size:2vh;
  color: blue;
}

#stats-title {
  font-size:3vh;
}
</style>
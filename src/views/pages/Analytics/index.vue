<template>
  <div class='center'>
      <md-card class='md-elevation-10 stats'>
          <div class="md-layout">
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Collected this Week</div>
                    <div class="md-subhead">3453 L</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Exported this Week</div>
                    <div class="md-subhead">3453 L</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Loans Dispersed this Week</div>
                    <div class="md-subhead">3453 L</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
          </div>
      </md-card>
      <md-card class='md-elevation-10 graph'>
        <product v-bind:values="productTransactions"/>
      </md-card>

      <md-card class='md-elevation-10 graph'>
        <money/>
      </md-card>
    <!-- <div class='"md-layout md-gutter md-alignment-center"'>
      <div class="md-layout-item">
        <md-card class='md-elevation-10'>
          <product/>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card class='md-elevation-10'>
          <money/>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card class='md-elevation-10'>
          <users/>
        </md-card>
      </div>
      </div> -->
  </div>
</template>

<script>
import product from "../../components/graphs/Product";
import money from "../../components/graphs/Money";
import users from "../../components/graphs/Users";
import * as d3 from "d3";

export default {
  name: "analytics",
  data() {
    return {
      productTransactions: [],
      error: '',
    };
  },
  components: {
    product,
    money,
    users
  },
  created() {
  // generate data
    this.productTransactions.push(fillData ());
    this.productTransactions.push(fillData ());
    //add more pushes for more lines

    function fillData () {

      let data = [];

      let currentValue = 100;
      let random = d3.randomNormal(200, 1000);

      for(let i=0; i<40; i++) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);

        data.push([currentDate, currentValue]);
        currentValue = d3.randomUniform(10, 200)();

      }

    return data;

    }

  },
  methods: {}
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
  height: 12vh;
  align-items: center;

}
</style>
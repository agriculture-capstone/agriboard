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
        <product/>
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

export default {
  name: "analytics",
  data() {
    return {};
  },
  components: {
    product,
    money,
    users
  },
  mounted() {},
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
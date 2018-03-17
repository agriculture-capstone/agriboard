<template>
  <div class='center'>
      <md-card class='md-elevation-10 stats'>
          <div class="md-layout">
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-title">collected</div>
                    <div class="md-subhead">3453</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-title">exported</div>
                    <div class="md-subhead">3453</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-title">loans</div>
                    <div class="md-subhead">3453</div>
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

.graph {
  height: 35vh;
}

.stats {
  height: 13vh;
  align-items: center;

}
</style>
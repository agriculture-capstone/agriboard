<template>
  <div class='center'>
      <md-card class='md-elevation-10 stats'>
          <div class="md-layout">
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <div class="md-subheading">Collected this Week</div>
                </md-card-header>
                <md-card-content>
                  9778
                </md-card-content>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <div class="md-subheading">Exported this Week</div>
                </md-card-header>
                <md-card-content>
                  9778
                </md-card-content>
              </md-card>
              <md-card class="md-layout-item md-elevation-0">
                <md-card-header>
                  <div class="md-subheading">Loand Dispursed this Week</div>
                </md-card-header>
                <md-card-content>
                  9778
                </md-card-content>
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
  margin: 0.5%;
  justify-content: center;
  align-items: center;
}

.graph {
  width: 80vw;
  height: 40vh;
  align-items: center;

}

.stats {
  height: 10vh;
  width: 80vw;
  order: 0;
  align-items: center;

}
</style>
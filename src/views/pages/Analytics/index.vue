<template>
  <div>
      <md-card id='stats'>
          <div class='md-layout'>
            <div class="md-layout-item">
              test
            </div>
            <div class="md-layout-item">
              test2
            </div>
            <div class="md-layout-item">
              test3
            </div>
          </div>
      </md-card>
    <div class='md-layout'>
      <div class="md-layout-item">
        <md-card>
          <product/>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
          <money/>
        </md-card>
      </div>
      <div class="md-layout-item">
        <md-card>
          <users/>
        </md-card>
      </div>
      </div>
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
  width: 30vw;
  height: 60vh;
  display: inline-block;
  vertical-align: top;
}

#stats {
  height: 10vh;
  width: 100vw;
  display: inline-block;
  vertical-align: top;
}
</style>
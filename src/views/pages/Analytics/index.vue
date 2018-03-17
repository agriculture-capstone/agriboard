<template>
  <div>
    <md-field id='stats'>
      <md-card>
      </md-card>
    </md-field>
    <md-field id='graphs'>
      <md-card>
        <product/>
      </md-card>
      <md-card>
        <money/>
      </md-card>
      <md-card>
        <users/>
      </md-card>
    </md-field>
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
  height: 90vh;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
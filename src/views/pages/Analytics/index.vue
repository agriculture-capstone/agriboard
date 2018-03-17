<template>
  <div>
    <product/>
    <money/>
  </div>
</template>

<script>
import product from "../../components/graphs/Product";
import money from '../../components/graphs/Money';

export default {
  name: "analytics",
  data() {
    return {};
  },
  components: {
    product,
    money,
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>

</style>
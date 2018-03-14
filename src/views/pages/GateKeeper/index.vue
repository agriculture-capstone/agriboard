<template>
  <div class="content">
    <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate">
    </md-progress-spinner>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GateKeeper',
  data () {
    return {
    };
  },
  created(){
    if (localStorage.getItem("token")) {
      this.$router.push({ path: 'home'});
    } else {
      this.$router.push({ path: 'login'});
    }
    
  },
});
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

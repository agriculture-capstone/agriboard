<template>
  <div class="content">
    <md-progress-spinner class="md-accent" :md-stroke="3" md-mode="indeterminate">
    </md-progress-spinner>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';

import TokenService from '@/services/Token';

export default Vue.extend({
  name: 'GateKeeper',
  created () {
    if (TokenService.token) {
      this.$router.push({ name: 'Home' });
    } else {
      this.$router.push({ name: 'Login' });
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

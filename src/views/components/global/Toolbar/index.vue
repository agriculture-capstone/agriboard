<template>
  <span>
    <md-toolbar id="toolbar" class="md-primary" md-elevation="0">
      <logo :title="title" :size="20" />
      <div class="md-toolbar-section-end">
        <md-button v-if="loggedIn" @click="logOut">
          Sign Out
        </md-button>
      </div>
    </md-toolbar>
    <md-tabs class="md-primary" md-alignment="fixed" v-if="loggedIn">
      <md-tab id="tab-home" md-label="Home" :to="{ name: 'Home' }"></md-tab>
      <md-tab id="tab-analytics" md-label="Analytics" :to="{ name: 'Analytics' }"></md-tab>
      <md-tab id="tab-transactions" md-label="Transactions" :to="{ name: 'Transactions' }"></md-tab>
      <md-tab id="tab-people" md-label="People" :to="{ name: 'ManagePeople' }"></md-tab>
    </md-tabs>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

import TokenService from '@/services/Token';

const name = 'toolbar';

export default Vue.component(name, {
  name,

  computed: {
    title(): string {
      return this.$store.state.app.title;
    },
    loggedIn(): boolean {
      // TODO properly extract whether a user is logged in or not
      return true;
    },
  },

  methods: {
    logOut() {
      TokenService.token = '';
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";
.centered {
  justify-content: center;
  align-content: center;
};
</style>

<style lang="scss">
@import "~vue-material/dist/theme/engine";
.md-toolbar.md-theme-default.md-primary {
  background-color: md-get-palette-color(bluegrey, 800);
}
.md-toolbar.md-theme-default.md-primary .md-button:not([disabled]):not(.md-raised) {
  color: white;
}
</style>


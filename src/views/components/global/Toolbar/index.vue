<template>
  <span>
    <md-toolbar id="toolbar" class="md-primary" md-elevation="0">
      <h1 class="md-title title">{{title}}</h1>
      <div class="md-toolbar-section-end">
        <md-button v-if="loggedIn" @click="logOut">
          Sign Out
        </md-button>
      </div>
    </md-toolbar>
    <md-tabs class="md-accent" md-alignment="fixed" v-if="loggedIn">
      <md-tab id="tab-home" md-label="Home" :to="{ name: 'Home' }"></md-tab>
      <md-tab id="tab-analytics" md-label="Analytics" :to="{ name: 'Analytics' }"></md-tab>
      <md-tab id="tab-transactions" md-label="Transactions" :to="{ name: 'Transactions' }"></md-tab>
      <md-tab id="tab-people" md-label="People" :to="{ name: 'ManagePeople' }"></md-tab>
    </md-tabs>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

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
    }
  },

  methods: {
    logOut() {
      // TODO implement logging out
    }
  },
});
</script>

<style lang="scss" scoped>
  .centered {
    justify-content: center;
    align-content: center;
  };
  .title {
    font-family: 'Fjalla One', sans-serif;
    letter-spacing: 1.3px;
  }
</style>


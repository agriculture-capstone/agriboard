<template>
  <span>
    <md-toolbar id="toolbar" class="md-primary" md-elevation="0">
      <svg id="logo" viewBox="0 0 24 24">
        <path id="logoPath" d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z" />
      </svg>
      <h1 class="title">{{title}}</h1>
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
  @import "~vue-material/dist/theme/engine";
  .centered {
    justify-content: center;
    align-content: center;
  };
  .title {
    font-family: 'Fjalla One', sans-serif;
    letter-spacing: 2px;
    color: white;
    padding: 10px;
    font-size: 2.7vh;
    vertical-align: center;
    justify-self: center;
    align-self: center;
  };
  #logo {
    width: 5vh;
    height: 5vh;
  };
  #logoPath {
    fill: #ffffff;
  }
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


<template>
  <div id="app">
    <header class="header">
      <toolbar class="toolbar" v-if="toolbarShown"/>
      <div class="spacer"></div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import { RootState } from '@/store/types';
import { MutationType as AppMutation } from '@/store/modules/app/types';
import SyncService from '@/services/Sync';
import TokenService from '@/services/Token';

export default Vue.extend({
  name: 'app',

  computed: mapState<RootState>({
    toolbarShown: state => state.app.toolbarShown,
  }),

  mixins: [
    TokenService.clearedTokenListenerMixin(),
  ],

  created () {
    // Handle initial toolbar render
    switch (this.$router.currentRoute.name) {
      case 'Login': {
        // Hide toolbar (do nothing, initial state is hidden)
        this.$store.commit(AppMutation.SET_TOOLBAR_SHOWN, { shown: false });
        break;
      }
      case 'Gatekeeper': {
        // Do nothing (allow gatekeeper to decide)
        break;
      }
      default: {
        // Show toolbar
        this.$store.commit(AppMutation.SET_TOOLBAR_SHOWN, { shown: true });
        break;
      }
    }

    // Handle future toolbar renders
    this.$router.afterEach((to) => {
      if (to.name === 'Login') {
        this.$store.state.app.toolbarShown && this.$store.commit(AppMutation.SET_TOOLBAR_SHOWN, { shown: false });
      } else {
        !this.$store.state.app.toolbarShown && this.$store.commit(AppMutation.SET_TOOLBAR_SHOWN, { shown: true });
      }
    });
    if (TokenService.token) {
      SyncService().start();
    }
    TokenService.addListener((value) => {
      // Deal with sync service
      if (value && !SyncService.running) {
        SyncService().start();
      } else if (!value && SyncService.running) {
        SyncService.stop();
      }
    });
  },

  /** Handle the token being cleared */
  onEmptyToken () {
    this.$router.push({ name: 'Login' });
  },
});
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine
@include md-register-theme("default", (
  primary: md-get-palette-color(cyan, 500), // The primary color of your application
  accent: md-get-palette-color(blue, 500), // The accent or secondary color
  theme: "light"
));
@import "~vue-material/dist/theme/all"; // Apply the theme

body {
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    position: relative;
  }

  header {
    z-index: 10;
  }

  .toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .spacer {
    height: 112px;

    @media screen and (max-width: 944px) {
      height: 104px;
    }
  }

  margin: 0;
  position: relative;
  height: 100vh;
  width: 100vw;

  main {
    flex: 1;
  }
}
</style>

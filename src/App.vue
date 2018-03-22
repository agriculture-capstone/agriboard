<template>
  <div id="app">
    <header>
      <toolbar />
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
});
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine
@include md-register-theme("default", (
  primary: md-get-palette-color(bluegrey, 800), // The primary color of your application
  accent: md-get-palette-color(cyan, 500), // The accent or secondary color
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

  margin: 0;
  position: relative;
  height: 100vh;
  width: 100vw;

  main {
    flex: 1;
  }
}
</style>

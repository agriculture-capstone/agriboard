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
  primary: md-get-palette-color(lightblue, 700), // The primary color of your application
  accent: md-get-palette-color(cyan, 800), // The accent or secondary color
  theme: "light"
));

@import "~vue-material/dist/theme/all"; // Apply the theme

body {
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  margin: 0;

  main {
    text-align: center;
  }
}
</style>

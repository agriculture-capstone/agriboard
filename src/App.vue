<template>
  <div id="app">
    <toolbar :title="message"></toolbar>
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      message: 'Hello World',
    };
  },
  computed: {
    // a computed getter
    reversedMessage(): string {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('');
    },
  },
});
</script>

<style lang="scss">
body {
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  margin: 0;
    main {
    text-align: center;
    margin-top: 40px;
  }
  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
    span {
      display: block;
      position: relative;
      font-size: 20px;
      line-height: 1;
      letter-spacing: .02em;
      font-weight: 400;
      box-sizing: border-box;
      padding-top: 16px;
    }
  }
}
</style>

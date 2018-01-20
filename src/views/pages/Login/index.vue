<template>
  <div class="Login">
    <h1>{{ msg }}</h1>
    <div class="login_form">
      <md-field>
        <label>Username</label>
        <md-input v-model="initial"></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input v-model="initial"></md-input>
      </md-field>
      <md-button class="md-raised md-primary login_button">Login</md-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  data () {
    return {
      msg: 'Login',
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login_form {
  width: 20em;
  margin: auto;
  margin-top: 4em;
  flex-direction: column;
  display: flex;
  align-items: flex-end;
}

.login_button {
  width: 4em;
}
</style>

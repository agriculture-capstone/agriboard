<template>
  <div id="login-page">
    <div class="login_form">
      <logo class="login-logo" color="rgba(0, 0, 0, 0.6)" :size="28" />
      <md-field>
        <label>Username</label>
        <md-input v-model="credentials.username" @keyup.enter="login"></md-input>
      </md-field>
      <md-field :md-toggle-password="false">
        <label>Password</label>
        <md-input v-model="credentials.password" type="password" @keyup.enter="login"></md-input>
      </md-field>
      <div class="login_form_feedback">
        <p class="error">{{ error }}</p>
        <md-button v-on:click="login" class="md-raised md-accent login_button">Login</md-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import TokenService from '@/services/Token';
import CoreAPI from '@/utils/CoreAPI';
import SyncService from '@/services/Sync';

export default Vue.extend({
  name: 'Login',
  mixins: [TokenService.tokenMixin()],
  methods: {
    async login() {
      try {
        await CoreAPI.login(this.credentials);
        this.$router.push({ name: 'Home' });
      } catch (err) {
        this.error = 'Invalid username or password';
      }
    },
  },
  data () {
    return {
      credentials: {
        username: '',
        password: '',
      },
      error: '',
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~vue-material/dist/theme/engine";
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: md-get-palette-color(cyan, 200);

  .login-logo {
    align-self: center;
    margin-bottom: 50px;
  }

  .login_form {
    width: 22em;
    flex-direction: column;
    display: flex;
    align-items: flex-end;
    margin-bottom: 15vh;
  }

  .login_form_feedback {
    display: flex;
    width: 22em;
    justify-content: space-between;
  }

  .login_button {
    width: 4em;
  }

  .error {
    display: flex;
    margin: 0;
    color: red;
    text-align: left;
    align-items: center;
  }
}
</style>

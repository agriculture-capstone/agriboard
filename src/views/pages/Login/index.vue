<template>
  <div class="Login">
    <h1>Login</h1>
    <div class="login_form">
      <md-field>
        <label>Username</label>
        <md-input v-model="credentials.username"></md-input>
      </md-field>
      <md-field :md-toggle-password="false">
        <label>Password</label>
        <md-input v-model="credentials.password" type="password"></md-input>
      </md-field>
      <div class="login_form_feedback">
        <p class="error">{{ error }}</p>
        <md-button v-on:click="login" class="md-raised md-primary login_button">Login</md-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const axios = require('axios');

export default Vue.extend({
  name: 'Login',
  methods: {
    async login() {
      console.log('attempting login');
      const self = this;
      await axios.post('http://boresha.tech:9090/actions/authenticate', {
        username: self.credentials.username,
        password: self.credentials.password,
      })
      .then(function (response: any) {
        localStorage.setItem('token', response.data.token);
        self.$router.push('/');
      })
      .catch(function (error: any) {
        self.error = 'Invalid username or password';
      });
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
<style lang="scss" scoped>
.login_form {
  width: 22em;
  margin: auto;
  margin-top: 4em;
  flex-direction: column;
  display: flex;
  align-items: flex-end;
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
</style>

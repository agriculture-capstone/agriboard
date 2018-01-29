<template>
  <div class="Home">
    <h1>{{ msg }}</h1>
    <md-card class="actions_section">
      <router-link :to="{ path: '/manage/people' }">
        <md-card md-with-hover class="action_card">
          <md-ripple>
            <md-card-header>
              <div class="md-title">Manage</div>
            </md-card-header>
            <md-card-content>
              Register and delete users, change their permissions and passwords.
            </md-card-content>
          </md-ripple>
        </md-card>
      </router-link>
      <md-card md-with-hover class="action_card">
        <md-ripple>
          <md-card-header>
            <div class="md-title">Analytics</div>
          </md-card-header>
          <md-card-content>
            View analytics and statistics on traders, farmers, and exports.
          </md-card-content>
        </md-ripple>
      </md-card>
    </md-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  methods: {
    test() {
      return 'hi';
    },
  },
  data () {
    return {
      msg: 'Home',
    };
  },
});
</script>

<style lang="scss" scoped>
.action_card {
  width: 320px;
  margin: 0.8em;
  display: inline-block;
  vertical-align: top;
}

.actions_section {
  margin: auto;
  padding: 1em;
  width: 90%;
  display: flex;
}
</style>
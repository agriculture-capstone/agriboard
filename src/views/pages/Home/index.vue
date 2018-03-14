<template>
  <div class="home">
    <h1 class="md-headline"> Services </h1>
    <div class="actions_section">
      
      <router-link :to="{ path: '/manage/people' }">
        <md-card md-with-hover class="action_card">
          <md-ripple>
            <div class="service">
              <md-icon class="md-size-3x serviceIcon">supervisor_account</md-icon>
              <div class="serviceInfo">
              <h2 class="serviceLabel">Manage Accounts</h2>
              <span class="md-caption serviceDesc">Create new accounts and change user settings.</span>
              </div>
            </div>
          </md-ripple>
        </md-card>
      </router-link>

      <md-card md-with-hover class="action_card">
        <md-ripple>
          <div class="service">
              <md-icon class="md-size-3x serviceIcon">trending_up</md-icon>
              <div class="serviceInfo">
              <h2 class="serviceLabel">Analytics</h2>
              <span class="md-caption serviceDesc">View analytics and statistics on products, traders, and farmers.</span>
              </div>
            </div>
        </md-ripple>
      </md-card>

      <router-link :to="{ path: '/transactions/products' }">
      <md-card md-with-hover class="action_card">
        <md-ripple>
          <div class="service">
              <md-icon class="md-size-3x serviceIcon">receipt</md-icon>
              <div class="serviceInfo">
              <h2 class="serviceLabel">Transactions</h2>
              <span class="md-caption serviceDesc">View all transactions and download reports.</span>
              </div>
            </div>
        </md-ripple>
      </md-card>
      </router-link>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  data () {
    return {
    };
  },
});
</script>

<style lang="scss" scoped>
.actions_section {
  margin: auto;
  padding: 1em;
  // width: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.action_card {
  width: 300px;
  min-width: 300px;
  margin: 0.8em;
  display: inline-block;
  vertical-align: center;
}

.home {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.serviceLabel {
  padding: 5px;
  margin: 0px;
}

.service {
  margin: 10px 5px;
  display: flex;
  flex-direction: row;
  align-content: center;
}

.serviceInfo {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 5px;
  
}

.serviceDesc {
  padding: 5px;
}

.serviceIcon {
  padding: 5px;
}
</style>

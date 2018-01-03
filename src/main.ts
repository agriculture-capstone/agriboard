import 'babel-polyfill';
import Vue from 'vue';
import 'vue-material/dist/vue-material.min.css';
import {
  MdToolbar,
  MdButton,
  MdIcon,
} from 'vue-material/dist/components';

import App from '@/App.vue';
import router from './router';
import '@/views/components';
import store from '@/store';

Vue.config.productionTip = false;

// Use material components
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});

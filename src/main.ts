import 'babel-polyfill';
import Vue from 'vue';
import 'vue-material/dist/vue-material.min.css';
import {
  MdToolbar,
  MdButton,
  MdField,
  MdCard,
  MdIcon,
  MdTable,
  MdRipple,
  MdContent,
  MdTabs,
  MdProgress,
} from 'vue-material/dist/components';

import App from '@/App.vue';
import router from './router';
import '@/views/components';
import store from '@/store';
import SyncService from '@/services/Sync';
import TokenService from '@/services/Token';

Vue.config.productionTip = false;

// Use material components
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdCard);
Vue.use(MdIcon);
Vue.use(MdTable);
Vue.use(MdField);
Vue.use(MdRipple);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdProgress);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
  mixins: [
    SyncService().mixin(),
    TokenService.clearedTokenListenerMixin(),
  ],
  onEmptyToken() {
    router.push({ name: 'Login' });
  },
  created () {
    if (!TokenService.token) {
      router.push({ name: 'Login' });
    }
  },
});

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
  MdDialog,
  MdRadio,
  MdTabs,
  MdProgress,
} from 'vue-material/dist/components';
import VeeValidate from 'vee-validate';

import App from '@/App.vue';
import router from './router';
import '@/views/components';
import store from '@/store';

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
Vue.use(MdDialog);
Vue.use(MdRadio);
Vue.use(MdTabs);
Vue.use(MdProgress);

// Use VeeValidate for form validation
Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});

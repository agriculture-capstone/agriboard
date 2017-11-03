// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vue from 'vue';

import App from './App';
import router from './router';

vue.config.productionTip = false;

new vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
});

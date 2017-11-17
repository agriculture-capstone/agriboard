import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/views/pages/Hello.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
  ],
});

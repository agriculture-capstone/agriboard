import Vue from 'vue';
import Router from 'vue-router';
import Agriboard from '@/views/pages/Agriboard/Agriboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Agriboard',
      component: Agriboard,
    },
  ],
});

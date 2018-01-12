import Vue from 'vue';
import Router from 'vue-router';
import Agriboard from '@/views/pages/Agriboard.vue';
import Lookup from '@/views/pages/Lookup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Agriboard',
      component: Agriboard,
    },
    {
    	path: '/lookup',
    	name: 'Lookup',
    	component: Lookup,
    },
  ],
});

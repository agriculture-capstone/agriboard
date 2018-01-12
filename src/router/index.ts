import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/views/pages/Hello.vue';
import Lookup from '@/views/pages/Lookup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
    	path: '/lookup',
    	name: 'Lookup',
    	component: Lookup,
    },
  ],
});

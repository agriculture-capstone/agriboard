import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/pages/Home/index.vue';
import Login from '@/views/pages/Login/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/pages/Home/index.vue';
import Login from '@/views/pages/Login/index.vue';
import ManagePeople from '@/views/pages/ManagePeople/index.vue';
import ProductTransactions from '@/views/pages/ProductTransactions/index.vue';
import Analytics from '@/views/pages/Analytics/index.vue';


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
    {
      path: '/manage/people',
      name: 'ManagePeople',
      component: ManagePeople,
    },
    {
      path: '/transactions/products',
      name: 'ProductTransactions',
      component: ProductTransactions,
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics,
    },
  ],
});

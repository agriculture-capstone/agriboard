import Vue from 'vue';
import Router from 'vue-router';
import GateKeeper from '@/views/pages/GateKeeper/index.vue';
import Home from '@/views/pages/Home/index.vue';
import Login from '@/views/pages/Login/index.vue';
import ManagePeople from '@/views/pages/ManagePeople/index.vue';
import ProductTransactions from '@/views/pages/ProductTransactions/index.vue';
import Loans from '@/views/pages/Loans/index.vue';
import Analytics from '@/views/pages/Analytics/index.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GateKeeper',
      component: GateKeeper,
    },
    {
      path: '/home',
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
      path: '/transactions',
      name: 'Transactions',
      component: ProductTransactions,
    },
    {
      path: '/loans',
      name: 'Loans',
      component: Loans,
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics,
    },
  ],
});

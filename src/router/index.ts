import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/pages/Home/index.vue';
import ManagePeople from '@/views/pages/ManagePeople/index.vue';

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
      path: '/manage/people',
      name: 'ManagePeople',
      component: ManagePeople,
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/pages/Home/index.vue';
<<<<<<< HEAD
import ManagePeople from '@/views/pages/ManagePeople/index.vue';
=======
import Login from '@/views/pages/Login/index.vue';
>>>>>>> master

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
  ],
});

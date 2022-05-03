import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import AppMain from '../views/AppMain.vue';
import AppHome from '../views/AppHome.vue';
import AppTad from '../views/AppTad.vue';
import AppProfile from '../views/AppProfile.vue';
import AppLogin from '../views/AppLogin.vue';
import AppCadaster from '../views/AppCadaster.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: AppMain,
    children: [
      {
        path: '/',
        name: 'Home',
        component: AppHome,
      },
      {
        path: '/TAD',
        name: 'TAD',
        component: AppTad,
      },
      {
        path: '/profile',
        name: 'Profile',
        component: AppProfile,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: AppLogin,
  },
  {
    path: '/cadaster',
    name: 'Cadaster',
    component: AppCadaster,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (
    !localStorage.getItem('token') &&
    to.name != 'Login' &&
    to.name != 'Cadaster' &&
    to.name != 'ForgotPassword'
  )
    store.dispatch('logout', true);
});

export default router;

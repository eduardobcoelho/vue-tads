import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
import AppMain from '../views/AppMain.vue';
import AppHome from '../views/AppHome.vue';
import AppTad from '../views/AppTad.vue';
import AppProfile from '../views/AppProfile.vue';
import AppLogin from '../views/AppLogin.vue';

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (!localStorage.getItem('token') && to.name != 'Login')
    store.dispatch('logout', true);
});

export default router;

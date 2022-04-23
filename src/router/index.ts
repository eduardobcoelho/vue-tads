import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import AppTad from '../views/AppTad.vue';
import AppLogin from '../views/AppLogin.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/TAD',
    name: 'TAD',
    component: AppTad,
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
  if (!localStorage.getItem('token')) {
    if (to.name != 'Login') router.push({ name: 'Login' });
    localStorage.clear();
  }
});

export default router;

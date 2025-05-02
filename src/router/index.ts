import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "home" */ '../pages/about.vue'),
  },
  {
    path: '/vuepring',
    name: 'Vuepring',
    component: () => import(/* webpackChunkName: "home" */ '../pages/vuepring/vuepring.vue'),
  },
  {
    path: '/vuepring/develop',
    name: 'VuepringDevelop',
    component: () =>
      import(/* webpackChunkName: "vuepringdevelop" */ '../pages/vuepring/develop.vue'),
  },
  {
    path: '/nuxt3',
    name: 'Nuxt3',
    component: () => import(/* webpackChunkName: "home" */ '../pages/nuxt3/nuxt3.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

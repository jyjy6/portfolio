import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../pages/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/about.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () =>
      import(/* webpackChunkName: "contact" */ '../pages/contact.vue'),
  },
  {
    path: '/vuepring',
    name: 'Vuepring',
    component: () =>
      import(/* webpackChunkName: "vuepring" */ '../pages/vuepring/vuepring.vue'),
  },
  {
    path: '/vuepring/develop',
    name: 'VuepringDevelop',
    component: () =>
      import(
        /* webpackChunkName: "vuepringdevelop" */ '../pages/vuepring/develop.vue'
      ),
  },
  {
    path: '/nuxt3',
    name: 'Nuxt3',
    component: () =>
      import(/* webpackChunkName: "nuxt3" */ '../pages/nuxt3/nuxt3.vue'),
  },
  {
    path: '/nuxt3/develop',
    name: 'NuxtDevelop',
    component: () =>
      import(
        /* webpackChunkName: "nuxt3develop" */ '../pages/nuxt3/develop.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

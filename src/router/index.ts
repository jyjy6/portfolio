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
      import(
        /* webpackChunkName: "vuepring" */ '../pages/vuepring/vuepring.vue'
      ),
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
  {
    path: '/imgbell',
    name: 'Imgbell',
    component: () =>
      import(/* webpackChunkName: "imgbell" */ '../pages/imgbell/imgbell.vue'),
  },
  {
    path: '/musicbell',
    name: 'Musicbell',
    component: () =>
      import(
        /* webpackChunkName: "musicbell" */ '../pages/musicbell/musicbell.vue'
      ),
  },
  {
    path: '/musicbell/develop',
    name: 'MusicbellDevelop',
    component: () =>
      import(
        /* webpackChunkName: "musicbelldevelop" */ '../pages/musicbell/develop.vue'
      ),
  },
  {
    path: '/imgbell/develop',
    name: 'ImgbellDevelop',
    component: () =>
      import(
        /* webpackChunkName: "imgbelldevelop" */ '../pages/imgbell/develop.vue'
      ),
  },
  {
    path: '/timer',
    name: 'Timer',
    component: () =>
      import(/* webpackChunkName: "timer" */ '../pages/timer.vue'),
  },
  {
    path: '/sadari',
    name: 'Sadari',
    component: () =>
      import(/* webpackChunkName: "sadari" */ '../pages/sadari.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

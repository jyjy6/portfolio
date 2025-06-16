// store/menuStore.ts
import { defineStore } from 'pinia';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
}

export const useMenuStore = defineStore('menu', () => {
  const menuItems: MenuItem[] = [
    { title: 'June Young', icon: 'mdi-home', route: '/' },
    { title: 'About Me', icon: 'mdi-account', route: '/about' },
    { title: 'Vue3+Spring Project', icon: 'mdi-leaf', route: '/vuepring' },
    { title: 'NUXT3 Project', icon: 'mdi-nuxt', route: '/nuxt3' },
    {
      title: 'ImageBell(Vue3+SpringBoot + Gemini API)',
      icon: 'mdi-image-filter-none',
      route: '/imgbell',
    },
    { title: 'CONTACT', icon: 'mdi-email', route: '/contact' },
  ];

  return {
    menuItems,
  };
});

// store/menuStore.ts
import { defineStore } from 'pinia';

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  link?: string;
  recommended?: boolean;
}

export const useMenuStore = defineStore('menu', () => {
  const menuItems: MenuItem[] = [
    { title: 'June Young', icon: 'mdi-home', route: '/' },
    { title: 'About Me', icon: 'mdi-account', route: '/about' },
    { title: 'Vue3+Spring Project', icon: 'mdi-leaf', route: '/vuepring' },
    {
      title: 'NUXT3 Project',
      icon: 'mdi-nuxt',
      route: '/nuxt3',
    },
    {
      title: 'ImageBell(Vue3+SpringBoot + Gemini API)',
      icon: 'mdi-image-filter-none',
      route: '/imgbell',
      recommended: true,
    },
    {
      title: 'MusicBell (MSA + SSO)',
      icon: 'mdi-music',
      route: '/musicbell',
      recommended: true,
    },
    {
      title: 'nano-banana AI Image Service',
      icon: 'mdi-brain',
      route: '/nano-banana',
      recommended: true,
    },
    {
      title: 'AI 개발자맞춤형 커리어 챗봇API',
      icon: 'mdi-robot',
      link: 'https://github.com/jyjy6/jkaitest',
      recommended: true,
    },
    { title: 'CONTACT', icon: 'mdi-email', route: '/contact' },
  ];

  return {
    menuItems,
  };
});

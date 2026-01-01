// store/menuStore.ts
import { defineStore } from "pinia";

// 1. 프로젝트 단계 타입 정의 (오타 방지 및 자동완성 지원)
export type ProjectLevel = "beginner" | "intermediate" | "current";

// 2. 단계별 UI 설정 (View에서 가져다 쓰기 편하게)
export const LEVEL_INFO: Record<
  ProjectLevel,
  { label: string; color: string }
> = {
  beginner: { label: "초보", color: "success" }, // 초록색 (Vuetify 기준)
  intermediate: { label: "중급", color: "warning" }, // 주황색
  current: { label: "현재", color: "error" }, // 빨간색 (강조)
};

interface MenuItem {
  title: string;
  icon: string;
  route?: string;
  link?: string;
  recommended?: boolean;
  // 3. level 필드 추가 (모든 메뉴가 프로젝트는 아니므로 optional '?' 처리)
  level?: ProjectLevel;
}

export const useMenuStore = defineStore("menu", () => {
  const menuItems: MenuItem[] = [
    { title: "June Young", icon: "mdi-home", route: "/" },
    { title: "About Me", icon: "mdi-account", route: "/about" },
    {
      title: "Vue3+Spring Project",
      icon: "mdi-leaf",
      route: "/vuepring",
      level: "beginner",
    },
    {
      title: "NUXT3 Project",
      icon: "mdi-nuxt",
      route: "/nuxt3",
      level: "beginner",
    },
    {
      title: "ImageBell(Vue3+SpringBoot + Gemini API)",
      icon: "mdi-image-filter-none",
      route: "/imgbell",
      recommended: true,
      level: "beginner",
    },
    {
      title: "MusicBell (MSA + SSO)",
      icon: "mdi-music",
      route: "/musicbell",
      recommended: true,
      level: "intermediate",
    },
    {
      title: "nano-banana AI Image Service",
      icon: "mdi-brain",
      route: "/nano-banana",
      recommended: true,
      level: "current",
    },
    {
      title: "개발자맞춤형 커리어 AI챗봇 API",
      icon: "mdi-robot",
      link: "https://github.com/jyjy6/jkaitest",
      recommended: true,
      level: "intermediate",
    },
    {
      title: "LangChain4j 프로젝트",
      icon: "mdi-link-variant",
      route: "/langchain4j",
      recommended: true,
      level: "current",
    },
    { title: "CONTACT", icon: "mdi-email", route: "/contact" },
  ];

  return {
    menuItems,
  };
});

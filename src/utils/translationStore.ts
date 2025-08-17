import { ref } from 'vue';

// 번역 설정을 위한 전역 상태
export const translationConfig = ref({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  defaultTargetLanguage: import.meta.env.VITE_DEFAULT_TARGET_LANGUAGE || 'ko',
});

// API 키 설정 함수
export const setApiKey = (key: string) => {
  translationConfig.value.apiKey = key;
};

// 타겟 언어 설정 함수
export const setDefaultTargetLanguage = (language: string) => {
  translationConfig.value.defaultTargetLanguage = language;
};

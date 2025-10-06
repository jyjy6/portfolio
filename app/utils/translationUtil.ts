import { ref } from "vue";
// 번역 설정을 위한 전역 상태

export const translationConfig = ref({
  apiKey: "",
  defaultTargetLanguage: "ko",
});

// API 키 설정 함수
export const setApiKey = (key: string) => {
  translationConfig.value.apiKey = key;
};

// 타겟 언어 설정 함수
export const setDefaultTargetLanguage = (language: string) => {
  translationConfig.value.defaultTargetLanguage = language;
};

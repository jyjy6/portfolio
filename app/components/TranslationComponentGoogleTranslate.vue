<template>
  <div class="translation-wrapper">
    <!-- 원본 텍스트 -->
    <div v-if="!isTranslated" class="original-text">
      <slot></slot>
    </div>

    <!-- 번역된 텍스트 -->
    <div v-if="isTranslated" class="translated-text">
      <div class="translation-header">
        <v-chip size="small" color="primary" variant="outlined">
          {{ detectedLanguage }} → {{ targetLanguage }}
        </v-chip>
      </div>
      <div class="translation-content">
        {{ translatedText }}
      </div>
    </div>

    <!-- 번역 버튼 -->
    <v-btn
      v-if="hasText"
      size="small"
      variant="text"
      :loading="isTranslating"
      @click="toggleTranslation"
      class="translation-btn"
    >
      <v-icon left size="16">
        {{ isTranslated ? 'mdi-translate-off' : 'mdi-translate' }}
      </v-icon>
      {{ isTranslated ? '원문 보기' : '번역하기' }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';

  interface Props {
    text?: string;
    apiKey?: string;
    autoDetect?: boolean;
    targetLanguage?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    autoDetect: true,
    targetLanguage: 'ko', // 기본값: 한국어로 번역
  });

  const isTranslated = ref(false);
  const isTranslating = ref(false);
  const translatedText = ref('');
  const detectedLanguage = ref('');
  const targetLanguage = ref(props.targetLanguage);
  const originalText = ref('');

  // 텍스트가 있는지 확인
  const hasText = computed(() => {
    return originalText.value && originalText.value.trim().length > 0;
  });

  // 슬롯에서 텍스트 추출
  onMounted(() => {
    const slotElement = document.querySelector(
      '.translation-wrapper .original-text'
    );
    if (slotElement) {
      originalText.value = slotElement.textContent || props.text || '';
    } else {
      originalText.value = props.text || '';
    }
  });

  // 언어 감지 함수
  const detectLanguage = (text: string): string => {
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const japaneseRegex = /[ひらがなカタカナ]/;
    const chineseRegex = /[\u4e00-\u9fff]/;

    if (koreanRegex.test(text)) return 'ko';
    if (japaneseRegex.test(text)) return 'ja';
    if (chineseRegex.test(text)) return 'zh';
    return 'en';
  };

  // Google Translate API로 번역하기
  const translateWithGoogle = async (
    text: string,
    from: string,
    to: string
  ): Promise<string> => {
    if (!props.apiKey) {
      throw new Error('Google Translate API 키가 필요합니다.');
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${props.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            source: from,
            target: to,
            format: 'text',
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 응답 오류:', errorText);
        throw new Error(`번역 API 오류: ${response.status}`);
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('번역 오류:', error);
      throw error;
    }
  };

  // 무료 번역 API 사용 (MyMemory API)
  const translateWithMyMemory = async (
    text: string,
    from: string,
    to: string
  ): Promise<string> => {
    try {
      const langPair = `${from}|${to}`;
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`
      );

      if (!response.ok) {
        throw new Error(`번역 API 오류: ${response.status}`);
      }

      const data = await response.json();

      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      } else {
        throw new Error('번역 실패');
      }
    } catch (error) {
      console.error('번역 오류:', error);
      throw error;
    }
  };

  // 번역 토글 함수
  const toggleTranslation = async () => {
    if (isTranslated.value) {
      isTranslated.value = false;
      return;
    }

    try {
      isTranslating.value = true;

      const sourceLanguage = detectLanguage(originalText.value);
      detectedLanguage.value = getLanguageName(sourceLanguage);

      let targetLang = props.targetLanguage;
      if (sourceLanguage === 'ko') {
        targetLang = 'en';
      } else {
        targetLang = 'ko';
      }

      targetLanguage.value = getLanguageName(targetLang);

      // API 키가 있으면 Google Translate, 없으면 무료 API 사용
      let translated;
      if (props.apiKey) {
        translated = await translateWithGoogle(
          originalText.value,
          sourceLanguage,
          targetLang
        );
      } else {
        translated = await translateWithMyMemory(
          originalText.value,
          sourceLanguage,
          targetLang
        );
      }

      translatedText.value = translated;
      isTranslated.value = true;
    } catch (error) {
      console.error('번역 실패:', error);
      alert('번역에 실패했습니다. API 키나 네트워크를 확인해주세요.');
    } finally {
      isTranslating.value = false;
    }
  };

  // 언어 코드를 언어명으로 변환
  const getLanguageName = (code: string): string => {
    const languages: { [key: string]: string } = {
      ko: '한국어',
      en: '영어',
      ja: '일본어',
      zh: '중국어',
    };
    return languages[code] || code;
  };
</script>

<style scoped>
  .translation-wrapper {
    position: relative;
  }

  .translated-text {
    background-color: rgba(29, 155, 240, 0.1);
    border-left: 3px solid #1d9bf0;
    padding: 12px;
    border-radius: 8px;
    margin: 8px 0;
  }

  .translation-header {
    margin-bottom: 8px;
  }

  .translation-content {
    line-height: 1.5;
  }

  .translation-btn {
    margin-top: 8px;
    font-size: 12px !important;
    text-transform: none !important;
    opacity: 0.7;
  }

  .translation-btn:hover {
    opacity: 1;
  }
</style>

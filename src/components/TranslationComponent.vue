<template>
  <div class="translation-wrapper" :id="componentId" :class="$attrs.class">
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
      color="white"
      size="small"
      variant="outlined"
      :loading="isTranslating"
      @click.stop="toggleTranslation"
      class="translation-btn"
    >
      <v-icon left size="16">
        {{ isTranslated ? 'mdi-translate-off' : 'mdi-translate' }}
      </v-icon>
      {{ isTranslated ? '한글' : '日本語' }}
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
    targetLanguage: 'ja', // 기본값: 일본어로 번역
  });

  const isTranslated = ref(false);
  const isTranslating = ref(false);
  const translatedText = ref('');
  const detectedLanguage = ref('');
  const targetLanguage = ref(props.targetLanguage);
  const originalText = ref('');
  const componentId = ref(
    `translation-wrapper-${Math.random().toString(36).substring(2)}`
  );

  // 텍스트가 있는지 확인
  const hasText = computed(() => {
    return originalText.value && originalText.value.trim().length > 0;
  });

  // 슬롯에서 텍스트 추출
  onMounted(() => {
    // 슬롯의 텍스트 내용을 추출 (고유 ID 사용)
    const slotElement = document.querySelector(
      `#${componentId.value} .original-text`
    );
    if (slotElement) {
      originalText.value = slotElement.textContent || props.text || '';
    } else {
      originalText.value = props.text || '';
    }
  });

  // 언어 감지 함수
  const detectLanguage = (text: string): string => {
    // 간단한 언어 감지 로직
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const japaneseRegex = /[ひらがなカタカナ]/;
    const chineseRegex = /[\u4e00-\u9fff]/;

    if (koreanRegex.test(text)) return 'ko';
    if (japaneseRegex.test(text)) return 'ja';
    if (chineseRegex.test(text)) return 'zh';
    return 'en'; // 기본값
  };

  // Gemini API로 번역하기
  const translateWithGemini = async (
    text: string,
    from: string,
    to: string
  ): Promise<string> => {
    if (!props.apiKey) {
      throw new Error('Gemini API 키가 필요합니다.');
    }

    const prompt = `다음 텍스트를 ${from}에서 ${to}로 자연스럽게 번역해주세요. 번역된 결과만 출력하고 다른 설명은 하지 마세요:
    ${text}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${props.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 응답 오류:', errorText);

        // 429 에러 (Too Many Requests) 처리
        if (response.status === 429) {
          throw new Error(
            'Gemini 번역 일일 사용량이 초과되었습니다. 내일 다시 시도해주세요.'
          );
        }

        throw new Error(`번역 API 오류: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      // API 응답 구조 확인
      console.log('API 응답:', data);

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        throw new Error('API 응답 형식이 올바르지 않습니다.');
      }

      return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
      console.error('번역 오류:', error);
      throw error;
    }
  };

  // 번역 토글 함수
  const toggleTranslation = async () => {
    if (isTranslated.value) {
      // 원문으로 돌아가기
      isTranslated.value = false;
      return;
    }

    try {
      isTranslating.value = true;

      const sourceLanguage = detectLanguage(originalText.value);
      detectedLanguage.value = getLanguageName(sourceLanguage);

      // 타겟 언어 결정
      let targetLang = props.targetLanguage;
      if (sourceLanguage === 'ko') {
        targetLang = 'ja'; // 한국어면 일본어로
      } else {
        targetLang = 'ko'; // 다른 언어면 한국어로
      }

      targetLanguage.value = getLanguageName(targetLang);

      if (translatedText.value != '') {
        isTranslated.value = true;
        return;
      }
      const translated = await translateWithGemini(
        originalText.value,
        getLanguageName(sourceLanguage),
        getLanguageName(targetLang)
      );

      translatedText.value = translated;
      isTranslated.value = true;
    } catch (error) {
      console.error('번역 실패:', error);
      alert('번역에 실패했습니다. API 키를 확인해주세요.');
    } finally {
      isTranslating.value = false;
    }
  };

  // 언어 코드를 언어명으로 변환
  const getLanguageName = (code: string): string => {
    const languages: { [key: string]: string } = {
      ko: '한국어',
      en: 'English',
      ja: '日本語',
      zh: 'Chinese',
    };
    return languages[code] || code;
  };
</script>

<style scoped>
  .translation-wrapper {
    position: relative;
  }

  .translation-wrapper.inline-translation {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .translation-wrapper.inline-translation .translation-btn {
    margin-top: 0;
    margin-left: 8px;
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

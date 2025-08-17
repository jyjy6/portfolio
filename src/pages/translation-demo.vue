<template>
  <div class="translation-demo">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-white mb-8 text-center">자동번역 기능 데모</h1>

          <!-- API 키 설정 -->
          <v-card class="mb-6" color="grey-darken-3">
            <v-card-title class="text-white">
              <v-icon left>mdi-key</v-icon>
              Gemini API 키 설정
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="apiKey"
                label="Gemini API Key"
                type="password"
                variant="outlined"
                color="primary"
                @input="updateApiKey"
                hint="https://aistudio.google.com/app/apikey 에서 발급받으세요"
                persistent-hint
              />
            </v-card-text>
          </v-card>

          <!-- 샘플 텍스트들 -->
          <v-card class="mb-4" color="grey-darken-4">
            <v-card-text>
              <h3 class="text-white mb-4">한국어 텍스트 샘플</h3>
              <TranslationComponent :api-key="apiKey">
                <p class="text-white">
                  안녕하세요! 이것은 자동번역 기능을 테스트하기 위한 한국어
                  텍스트입니다. 번역하기 버튼을 클릭하면 영어로 번역됩니다.
                </p>
              </TranslationComponent>
            </v-card-text>
          </v-card>

          <v-card class="mb-4" color="grey-darken-4">
            <v-card-text>
              <h3 class="text-white mb-4">English Text Sample</h3>
              <TranslationComponent :api-key="apiKey">
                <p class="text-white">
                  Hello! This is an English text sample for testing the
                  automatic translation feature. Click the translate button to
                  translate it into Korean.
                </p>
              </TranslationComponent>
            </v-card-text>
          </v-card>

          <v-card class="mb-4" color="grey-darken-4">
            <v-card-text>
              <h3 class="text-white mb-4">일본어 텍스트 샘플</h3>
              <TranslationComponent :api-key="apiKey">
                <p class="text-white">
                  こんにちは！これは自動翻訳機能をテストするための日本語のテキストです。
                  翻訳ボタンをクリックすると韓国語に翻訳されます。
                </p>
              </TranslationComponent>
            </v-card-text>
          </v-card>

          <!-- 실시간 번역 테스트 -->
          <v-card class="mb-4" color="grey-darken-3">
            <v-card-title class="text-white">
              <v-icon left>mdi-chat</v-icon>
              실시간 번역 테스트
            </v-card-title>
            <v-card-text>
              <v-textarea
                v-model="customText"
                label="번역할 텍스트를 입력하세요"
                variant="outlined"
                rows="3"
                color="primary"
              />
              <TranslationComponent
                v-if="customText.trim()"
                :api-key="apiKey"
                :text="customText"
                :key="customText"
              >
                <p class="text-white">{{ customText }}</p>
              </TranslationComponent>
            </v-card-text>
          </v-card>

          <!-- 사용법 안내 -->
          <v-card color="blue-darken-3">
            <v-card-title class="text-white">
              <v-icon left>mdi-information</v-icon>
              사용법
            </v-card-title>
            <v-card-text class="text-white">
              <ol>
                <li class="mb-2">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    class="text-blue-lighten-2"
                  >
                    Google AI Studio </a
                  >에서 Gemini API 키를 발급받으세요.
                </li>
                <li class="mb-2">위의 입력 필드에 API 키를 입력하세요.</li>
                <li class="mb-2">
                  각 텍스트 블록 아래의 "번역하기" 버튼을 클릭하세요.
                </li>
                <li class="mb-2">
                  번역된 텍스트가 표시되며, "원문 보기"를 클릭하면 원문으로
                  돌아갑니다.
                </li>
                <li>
                  실시간 번역 섹션에서는 직접 텍스트를 입력해서 테스트할 수
                  있습니다.
                </li>
              </ol>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import TranslationComponent from '../components/TranslationComponent.vue';
  import { setApiKey } from '../utils/translationStore';

  const apiKey = ref('');
  const customText = ref('');

  const updateApiKey = () => {
    setApiKey(apiKey.value);
  };
</script>

<style scoped>
  .translation-demo {
    min-height: 100vh;
    background-color: black;
    padding: 20px 0;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>

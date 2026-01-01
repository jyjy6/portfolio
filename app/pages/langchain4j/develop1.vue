<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { onBeforeUnmount } from "vue";
import { ref } from "vue";
import { nextTick } from "vue";
import { onMounted } from "vue";
import TranslationComponent from "../../components/TranslationComponent.vue";
import { translationConfig } from "../../utils/translationUtil";

const sections = [
  {
    id: 1,
    title:
      "1. ImgBell 모놀리식 -> AuthBell+MusicBell 추가 MSA로 확장, SSO구현, 메인페이지",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/32133.png",
        comment:
          "백엔드 아키텍쳐. 틀 을그리고 GPT에 생성요청했는데 좀 빠진게 듬성듬성.. 아무튼 기본적으론 Docker Compose위에서 이러한 MSA를 이루고 있다",
      },
    ],
    description:
      "꽤나 고생한거같다 사실 시간이야1~2일만에 MSA구축을 완료했지만 AI한계를 느껴서 정신적인 데미지를 받은 듯 한 느낌이다\n\n",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSO+ResponseCookie.jpg",
      ],
      comment: "",
    },
    imageRight: false,
  },
];

// 현재 활성화된 섹션 ID
const activeSection = ref<number | null>(null);

// 섹션으로 스크롤 이동하는 함수
const scrollToSection = (sectionId: number) => {
  const el = sectionRefs.value[sectionId];
  const domElement = el instanceof HTMLElement ? el : (el as any)?.$el;

  if (domElement) {
    // 부드러운 스크롤 효과
    domElement.scrollIntoView({ behavior: "smooth" });
    activeSection.value = sectionId;
  }
};

// 이미지를 새창에서 여는 함수
const openImageInNewTab = (imageUrl: string) => {
  window.open(imageUrl, "_blank");
};

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ인터섹션옵저버ㅡㅡㅡㅡㅡㅡㅡㅡㅡ
type DOMElement = Element | ComponentPublicInstance | null;

// 반응형 상태 정의
const visibleSections = ref<number[]>([]);
const sectionRefs = ref<Record<number, DOMElement>>({});
const observers = ref<IntersectionObserver[]>([]);

// Intersection Observer 설정 함수
const setupIntersectionObservers = () => {
  // 기존 옵저버 정리
  observers.value.forEach((observer) => observer.disconnect());
  observers.value = [];

  // 각 섹션에 대한 새 옵저버 생성
  sections.forEach((section) => {
    const el = sectionRefs.value[section.id];
    // 요소 또는 컴포넌트에서 실제 DOM 요소 가져오기
    const domElement = el instanceof HTMLElement ? el : (el as any)?.$el;

    if (!domElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 화면에 보이면 visibleSections에 ID 추가
            if (!visibleSections.value.includes(section.id)) {
              visibleSections.value.push(section.id);
            }
            // 한 번 나타나면 관찰 중지 (선택사항)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // 10% 이상 보이면 트리거
        rootMargin: "0px 0px -10% 0px", // 화면 하단 10% 지점에서 트리거
      }
    );

    observer.observe(domElement);
    observers.value.push(observer);
  });
};

// 컴포넌트 마운트 시 옵저버 설정
onMounted(() => {
  nextTick(() => {
    setupIntersectionObservers();
  });
});

// 컴포넌트 언마운트 시 옵저버 해제
onBeforeUnmount(() => {
  (observers as any).value.forEach((observer: any) => observer.disconnect());
});
</script>

<template>
  <v-container>
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-music" class="mr-2" size="x-large"></v-icon>
      MusicBell (MSA + SSO)
    </h1>

    <!-- 나무위키 스타일의 섹션 목록 -->
    <v-card class="mb-8 wiki-toc" dark>
      <v-card-title
        class="text-center pb-2"
        style="
          color: #90caf9;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        "
      >
        <v-icon left color="#64B5F6" class="mr-2"
          >mdi-format-list-bulleted</v-icon
        >
        목차
      </v-card-title>
      <v-card-text class="py-2">
        <ul class="toc-list">
          <li v-for="section in sections" :key="section.id" class="toc-item">
            <div class="toc-item-content">
              <a
                href="#"
                @click.prevent="scrollToSection(section.id)"
                :class="{ 'active-section': activeSection === section.id }"
                class="toc-link"
              >
                <v-icon
                  small
                  class="mr-2"
                  color="#64B5F6"
                  icon="mdi-chevron-right"
                />
                <TranslationComponent
                  :api-key="translationConfig.apiKey"
                  class="inline-translation"
                >
                  {{ section.title }}
                </TranslationComponent>
              </a>
            </div>
          </li>
        </ul>
      </v-card-text>
    </v-card>

    <!-- v-for를 사용한 반복 렌더링 -->
    <v-row
      v-for="section in sections"
      :key="section.id"
      class="d-flex justify-center my-6 position-relative fade-section"
      style="text-align: center"
      :class="{ visible: visibleSections.includes(section.id) }"
      :ref="
        (el) => {
          if (el) sectionRefs[section.id] = el;
        }
      "
    >
      <template v-if="!section.imageRight">
        <!-- 왼쪽 컬럼 (이미지) -->
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column align-center justify-center"
        >
          <v-alert type="success" variant="outlined" class="mb-2">{{
            section.title
          }}</v-alert>
          <div v-for="(image, i) in section.images" :key="i">
            <img
              :src="image.image"
              :alt="`image-${section.id}`"
              style="
                max-width: 100%;
                max-height: 450px;
                object-fit: contain;
                cursor: pointer;
              "
              @click="openImageInNewTab(image.image)"
            />
            <TranslationComponent
              :key="`image-comment-${section.id}-${i}`"
              :api-key="translationConfig.apiKey"
              style="margin-bottom: 30px"
            >
              <p style="margin-bottom: 20px">{{ image.comment }}</p>
            </TranslationComponent>
          </div>
        </v-col>

        <!-- 오른쪽 컬럼 (설명) - 스티키 적용 -->
        <v-col cols="12" md="6">
          <v-card
            class="pa-10 text-left description-card"
            :class="section.isSpecial ? 'special-card' : ''"
            style="position: sticky; top: 150px"
          >
            <TranslationComponent
              :key="`translation-${section.id}`"
              :api-key="translationConfig.apiKey"
            >
              <div>{{ section.description }}</div>
            </TranslationComponent>
          </v-card>
        </v-col>
      </template>

      <template v-else>
        <!-- 왼쪽 컬럼 (설명) -->
        <v-col cols="12" md="6">
          <v-card
            class="pa-4 description-card"
            :class="section.isSpecial ? 'special-card' : ''"
            style="position: sticky; top: 150px"
          >
            <TranslationComponent
              :key="`translation-${section.id}`"
              :api-key="translationConfig.apiKey"
            >
              <div>{{ section.description }}</div>
            </TranslationComponent>
          </v-card>
        </v-col>

        <!-- 오른쪽 컬럼 (이미지) -->
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column align-center justify-center"
        >
          <v-alert type="info">{{ section.title }}</v-alert>
          <!-- v-bind 없이 직접 이미지 경로 사용 -->
          <div v-for="(image, i) in section.images" :key="i">
            <img
              :src="image.image"
              :alt="`image-${section.id}`"
              style="
                max-width: 100%;
                height: 550px;
                object-fit: contain;
                cursor: pointer;
              "
              @click="openImageInNewTab(image.image)"
            />
            <TranslationComponent
              :key="`image-comment-right-${section.id}-${i}`"
              :api-key="translationConfig.apiKey"
            >
              <p>{{ image.comment }}</p>
            </TranslationComponent>
          </div>
        </v-col>
      </template>

      <!-- 특별한 섹션에만 추가되는 컨텐츠 -->
      <v-col v-if="section.isSpecial" cols="12" class="mt-4">
        <img
          v-for="spImg in section.spDescription?.image"
          :src="spImg"
          :alt="`image-${section.id}`"
          style="
            max-width: 100%;
            height: auto;
            object-fit: contain;
            cursor: pointer;
          "
          @click="openImageInNewTab(spImg)"
        />
        <TranslationComponent
          :key="`sp-translation-${section.id}`"
          :api-key="translationConfig.apiKey"
        >
          <v-alert
            type="info"
            variant="tonal"
            style="white-space: pre-line !important"
            v-if="section.spDescription?.comment"
          >
            {{ section.spDescription?.comment }}
          </v-alert>
        </TranslationComponent>
      </v-col>
      <hr style="width: 100%; margin: 16px auto; border: 1px solid white" />
    </v-row>
  </v-container>
</template>

<style scoped>
.description-card {
  white-space: pre-line !important;
}
.fade-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.fade-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 나무위키 스타일의 목차 - 다크 모드 */
.wiki-toc {
  background-color: rgba(30, 30, 30, 0.8);
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.toc-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  padding: 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toc-item:last-child {
  border-bottom: none;
}

.toc-item a {
  color: #64b5f6; /* 더 밝은 파란색 */
  text-decoration: none;
  display: block;
  transition: all 0.2s ease;
}

.toc-item a:hover {
  color: #90caf9;
  background-color: rgba(33, 150, 243, 0.2);
  border-radius: 4px;
  padding-left: 8px;
}

.active-section {
  font-weight: bold;
  color: #90caf9 !important;
  background-color: rgba(33, 150, 243, 0.25);
  border-radius: 4px;
  padding-left: 8px;
}
</style>

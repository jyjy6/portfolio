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
      "1. nano-banana (Google Gemini-Flash2.5-Image-Preview) 를 활용한 이미지 수정 서비스",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/01.ali_usyk_together.webp",
        comment:
          '서비스 시연영상. 전설적인 두 프로복서 THE GOAT "무하마드 알리", 헤비급 역대 최강의 프로복서 "올렉산드르 우식"을 한 이미지에 넣어보고 싶었다. 프롬프트는 영어로.',
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/01.ali_usyk_results.png",
        comment:
          "완성된 결과물. 두 선수가 복서라는 말도 하지 않았음에도 불구하고 이미지의 분위기를 파악하고 링의 분위기를 상당히 일관성있고 정확하게 표현하고있다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/01.trump_request.jpg",
        comment:
          "이번엔 1개의 이미지만으로 요청해보자. 도널드 트럼프에게 시그니쳐 모자를 씌워주자",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/01.trump_results.png",
        comment:
          "완성된 도널드 트럼프 결과물. 프롬프트를 좀 상세하게 작성해야만했다 이미지 모델의 개선필요한 점 일지도..",
      },
    ],
    description:
      "2025년 8월 27일 구글이 새로운 이미지 AI모델을 공개했다. Gemini-Flash2.5-Image-Preview라고하는데 최근 엄청난 정확도와 일관성으로 화제를 모았던 nano-banana의 정체가 바로 이 모델이었다.\n\n" +
      "엄청난 정교성을 가진 AI모델이기에 나도 출시된 당일에 바로 현업에서 사용 가능할만한 서비스를 간단하게 NUXT3만으로 구현해봤다. \n\n" +
      "유저가 이미지 1개or2개를 업로드 하고 프롬프트를 입력하면 해당이미지를 만들어주는 서비스다. \n 여태까지 구현해온 AI서비스 경험이 있었기에 구현까지 하루도 채 걸리지 않았고, 추후 수정이나 보강할 수 있는 요소들이 여럿 있었다." +
      "\n\n 1. 이 AI모델은 이미지 모델이기에 사용자의 프롬프트 입력 인식이 한정적이다. 예를들어 영어 이외의 인식을 잘 하지 못한다." +
      " 이를 위한 보완점으론 -> 사용자가 form에 영어 이외의 언어를 입력하면 서버측에서 해당언어를 Gemini에게 영어로 번역요청 후 그 번역결과물을 ImagePreview 모델에게 전달하는 식으로 보완 가능하리라 생각했다." +
      '\n\n 2. 굳이 프롬프트 입력이 아닌 한정된 서비스를 만드는 것도 가능하다고 생각했다. 예를들어 유튜버 "조코딩"님도 이 AI모델로 재빠르게 "이미지 가챠, 피규어화 서비스를 만들었는데" 그것 처럼 나도 고인이된 사람의 사진과 그 사람과 생전 친했던 사람의 사진을 함께하게 해주는 서비스, 유명인과의 투샷 서비스 등을 만들 수 있지 않을까 생각했다. 이는 물론 윤리의식과 법적문제 등을 고려해서 신중하게 만들어야 한다.' +
      '\n\n\n 이렇게 API로 공개된 모델들은 개발자 입장에서는 "딸깍"한번으로 정말간단하게 있어보이는 서비스를 만들 수 있게되었다. 그렇기에 앞으로의 개발자의 역할은 주어진 AI도구로 얼마나 창의적인걸 만들어내느냐, 디자이너의 요구를 어떤식으로 이뤄낼 수 있느냐를 생각하는게 중요한 역량이 되리라 생각되었다.',
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/02.requestToAI.jpg",
      ],
      comment:
        "이런식으로 AI에게 서비스의 큰그림을 요구하면 코드를 뱉어내준다 이를테면 Gemini API사용법 같은 외울필요도 없고 복붙해야할 만한것과, 디자인이 안되어있는 기초적인틀.. 그걸 세세하게 수정해서 단시간에 서비스개발을 완료했다.",
    },
    imageRight: false,
  },
  {
    id: 2,
    title: "2. 무료 Nano Banana 이용 플랫폼 - Bano Nanana 배포",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/banonanademo.webp",
        comment:
          "서비스 시연영상. 한국어, 일본어, 영어 3개의 언어를 지원한다. 두 복서를 원피스풍의 캐릭터로 변경요청해봤다. ",
      },
    ],
    description:
      "실제로 서비스를 만들었다. 프론트는 Nuxt4기반의 SSR, 구글 검색어 노출을 위한 SEO설정 및 구글 애드센스+구글 서치봇 등록 등의 작업을 했고 도메인 구매 후 Vercel로 배포 및 CI/CD를 구현했다. \n 백엔드는 Spring Boot 기반으로 Redis, MongoDB와 연동, Redis의 API Limiting 기능으로 API요청수 제한, JWT로그인으로 어드민 페이지->API리셋 등의 기능이 있다." +
      "\n\n 원피스, 지브리, 피규어화, 넨도로이드화 등 각 카테고리를 설정하여 편리한 UX를 구현했으며 EC2로 배포 + Github Actions를 도입하여 초기설정 후 git push만으로 간편하게 CI/CD를 구축했다." +
      "실제 유저가 있는 서비스인만큼 X-Forwarded-For, X-Real-IP 헤더 등으로 IP를 추출하여 MongoDB 에 기록으로도 남겨봤다.",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      comment: "https://banonana.shop/",
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
  <v-container class="pa-10">
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-music" class="mr-2" size="x-large"></v-icon>
      nano-banana AI Image Service
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
          :key="`section-special-comment-${section.id}`"
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

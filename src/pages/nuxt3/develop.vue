<script setup lang="ts">
  import type { ComponentPublicInstance } from 'vue';
  import { onBeforeUnmount } from 'vue';
  import { ref } from 'vue';
  import { nextTick } from 'vue';
  import { onMounted } from 'vue';

  const sections = [
    {
      id: 1,
      title: '1.사이트 첫 페이지',
      // 방법 3: public 폴더에 이미지를 넣은 경우 (권장)
      images: [{ image: '/images/1.webp', comment: '메인페이지 시연영상' }],
      description:
        '홈페이지는 복싱답게 랭킹 TOP3를 대문에 걸어놓고 뉴스, 추천영상등을 양방향으로 배치했다. 랭킹은 Intersection Observer사용해서 약간의 디자인.',
      isSpecial: false,
      specialStyle: {},
      imageRight: false,
    },

    {
      id: 2,
      title: '2. 로그인, 로그아웃',
      images: [
        {
          image: '/images/login-accessTokenb.webp',
          comment: '로그인했을 시 액세스토큰 확인',
        },
        {
          image: '/images/logout-refreshToken.webp',
          comment: '로그아웃 시 리프레시토큰 제거',
        },
        {
          image: '/images/oauthLogin.webp',
          comment: 'Google OAuth 로그인시 액세스토큰 저장',
        },
      ],
      description:
        '로그인, 로그아웃기능은 JWT를 사용했고, 로그인 시 accessToken은 localstorage에, ' +
        'refreshToken은 쿠키에 저장했다.\n\n' +
        'OAuth또한 Spring Boot의 OAuth2AuthenticationSuccessHandler로 동일방식으로 저장.\n' +
        '다만, OAuth의 accessToken의 경우 url쿼리로 1분짜리의 짧은 accessToken을 넣어서 발급, 추후 사이트이용시 프론트의 plugins/axios.ts 인터셉터를 거쳐서, 자동 재발급 되게끔 작성하였다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: ['/images/tokenRefreshPlugins.PNG'],
        comment: '프론트 accessToken재발급 예시코드 ',
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
      domElement.scrollIntoView({ behavior: 'smooth' });
      activeSection.value = sectionId;
    }
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
          rootMargin: '0px 0px -10% 0px', // 화면 하단 10% 지점에서 트리거
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
    <h1 class="text-center mb-10">Vue3 + Spring Project DevelopmentLog</h1>

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
            <a
              href="#"
              @click.prevent="scrollToSection(section.id)"
              :class="{ 'active-section': activeSection === section.id }"
            >
              <v-icon small class="mr-2" color="#64B5F6"
                >mdi-chevron-right</v-icon
              >
              {{ section.title }}
            </a>
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
              style="max-width: 100%; max-height: 450px; object-fit: contain"
            />
            <p style="margin-bottom: 20px">{{ image.comment }}</p>
          </div>
        </v-col>

        <!-- 오른쪽 컬럼 (설명) - 스티키 적용 -->
        <v-col cols="12" md="6">
          <v-card
            class="pa-10 text-left description-card"
            :class="section.isSpecial ? 'special-card' : ''"
            style="position: sticky; top: 150px"
          >
            {{ section.description }}
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
            {{ section.description }}
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
              style="max-width: 100%; height: 550px; object-fit: contain"
            />
            <p>{{ image.comment }}</p>
          </div>
        </v-col>
      </template>

      <!-- 특별한 섹션에만 추가되는 컨텐츠 -->
      <v-col v-if="section.isSpecial" cols="12" class="mt-4">
        <img
          v-for="spImg in section.spDescription?.image"
          :src="spImg"
          :alt="`image-${section.id}`"
          style="max-width: 100%; height: auto; object-fit: contain"
        />
        <v-alert
          type="info"
          variant="tonal"
          style="white-space: pre-line !important"
          v-if="section.spDescription?.comment"
        >
          {{ section.spDescription?.comment }}
        </v-alert>
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
    transition:
      opacity 1.2s ease,
      transform 1.2s ease;
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

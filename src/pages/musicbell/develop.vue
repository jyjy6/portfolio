<script setup lang="ts">
  import type { ComponentPublicInstance } from 'vue';
  import { onBeforeUnmount } from 'vue';
  import { ref } from 'vue';
  import { nextTick } from 'vue';
  import { onMounted } from 'vue';
  import TranslationComponent from '../../components/TranslationComponent.vue';
  import { translationConfig } from '../../utils/translationStore';

  const sections = [
    {
      id: 1,
      title:
        '1. ImgBell 모놀리식 -> AuthBell+MusicBell 추가 MSA로 확장, SSO구현',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSOLogin.webp',
          comment:
            'SSO완성 결과 1. ImgBell에 로그인해서 Cookie에 refresh, Access토큰을 저장 후 user정보도 localstorage에 저장하고있다. MSA의 한 서비스인 MusicBell도 쿠키에 저장된 모습. 새로고침 시 user정보도 역시 localstorage에 저장되고있다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/2.SSOLogout.webp',
          comment:
            'SSO완성 결과 2. 이번엔 MusicBell에서 로그아웃 시 Cookie와 user정보가 삭제되고 ImgBell에서도 Cookie가 삭제되어있다. user정보는 새로고침 시 삭제되고 토큰만료 안내alert를 출력하고있다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSO+keys.jpg',
          comment:
            'privateKey와 publicKey를 생성자로 로드하고있는모습. 저걸 뭐 누가 어떻게 외우나? 외울이유가 없다 이런건. 중요한건 작동원리.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSO+keys2.jpg',
          comment:
            'Claude의 키생성과정 설명. 저게 뭔소린지 알아듣는사람 없을거다 중요한건 이 PrivateKey는 AuthBell만 갖고있는 도장이고, PublicKey는 모든 MSA서비스에 뿌리고 저 도장이 진짜인지 확인하는 "기계"같은것이다. 이렇게 JWT의 유효성을 안전하게 검증하는 것.',
        },

        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.MSA+Docker.jpg',
          comment:
            'MSA의 도커환경. 정말.. 초대형 웹서비스는 어떻게 돌아가고 있을지 감도 안온다',
        },
      ],
      description:
        '꽤나 고생한거같다 사실 시간이야1~2일만에 MSA구축을 완료했지만 AI한계를 느껴서 정신적인 데미지를 받은 듯 한 느낌이다\n\n' +
        '우선 개발 흐름. MSA가 네이버쇼핑, 네이버웹툰 뭐 이런 것 처럼 각 서비스가 독립적으로 -이하생략- 라는 서비스는 알고있었다. 그래서 나도 MusicBell프로젝트를 추가하고 AI제공 Vuetify코드와 적절한 지시, 수정으로 프론트를 완성했다. 이제 봉착한 문제는 로그인이다. 어떻게 A서비스에서 로그인해야 B서비스도 그 로그인(유저)정보를 공유할 수 있는가에 봉착했고 AI에 솔루션을 요청했다.\n' +
        '하지만.. app.cookie.domain=.localhost <- 이와같이 뭔 이상한 로컬호스트 도메인설정을 생판 처음보는 식으로 하라고 하질 않나, \n 서비스A에서 로그인 한걸 서비스B로 쿠키 복사를 하라고 하질 않나 정말.. 많은 일이 있었다..\n' +
        '기본적으로 인증을 담당하는 AuthBell백엔드를 하나 더 추가하고 RSA비대칭 키를 활용한 JWT발급을 채택했다. 큰 흐름으로는\n' +
        '1. 사용자 → 운영되고있는 아무 MSA서비스에서 -> AuthBell에 로그인 요청.\n' +
        '2. AuthBell: Private Key로 JWT 서명 후 발행\n' +
        '3. 사용자(ImgBell이용중) JWT와 함께 요청\n' +
        '4. ImgBell서버는 Public Key로 JWT 검증\n' +
        '이거와는 별개로\n' +
        '5. 사용자(이번엔 MusicBell이용중) 같은 JWT로 요청\n' +
        '6. MusicBell서버 또한 Public Key로 JWT 검증\n' +
        '이렇게 각 서비스의 JWTFilter를 거쳐서 검증하는 방식이 되시겠다. 쿠키공유는 domain을 알맞게(여기선 localhost, 실제서비스면 최상위도메인(예: .naver.com 같은)을 지정하여 accessToken refreshToken을 공유하는 방식이다.' +
        '\n\n글로는 정말 간단하게 구현한것 처럼 보이는데 난 애초에 "이런게 있다" 라는 지식이 없는상태로 0부터 기술을 파내는 작업이었기에 AI를 끊임없이 의심해야했다. 그 과정에서 docker compose 포트설정을 이상하게 하질 않나, 프론트의 axios interceptor를 이상하게 등록해서 무한반복이 일어나질않나 내 코드를 삭제하질 않나 정말 고생했다. 심지어 유료 Cursor Pro는 요금제 오버가 돼서 사용하지 못한 상태로. \n\n' +
        '하지만 이런 과정들을 더 겪고 2~3년 전만 해도 생각하기 힘들었을, 실질 경력 1년 언저리의 개발자가 MSA SSO구현을 1~2일 만에 스스로 해냈다는데에 달성감을 느낄 수 있었다. 이렇듯 AI활용을 통해 지식을 흡수해가면 더욱 나은 개발자가 될 수 있다는 자신감을 얻을 수 있었다.' +
        '\n\n 자랑그만하고 이제 구현하면서 의심, 생각해본건 우선 accessToken이 쿠키로 옮겨짐으로써 csrf보안에 취약해지지 않았을까? 하는 생각과, AuthBell을 추가함으로써 회원정보테이블을 하나 더 만들어야 한다는 현실. 개인적으론 이게 효율적일까? 최선일까? 하는 생각이 자꾸들었다. \n만약 이렇게 회원정보테이블이 하나 더 필요하다면 회원가입 -> ImgBell의 DB에 유저정보 저장 -> Kafka등을 활용하여 AuthBell에 이벤트 알림을 하여 AuthBellDB에 비동기적으로 유저정보 저장을 해야겠다는 생각도 들었다. 그리고 테스트코드.. 에러핸들러 등등.. 함수 하나하나에도 정말 공을들여야 하는 것 같다\n\n' +
        '하지만 가장 뼈저리게 느낀 의구심은 모두들 MSA를 막상 시작하지말고 모놀리식부터 시작하라고한다. 뭐 물론 맞는말인것 같긴 하지만 적어도 이 프로젝트의 AuthBell처럼 회원정보나 인증을 담당하는 백엔드를 처음부터 만들면 마이그레이션이나 코드 리팩토링등의 비용을 더 줄일 수 있지 않을까? 하는 생각도 들었다. 물론 모놀리식에서 끝나게 된다면 비용낭비가 될 수 있겠지만 웹서비스를 시작함에 있어서 언젠간 고려해볼 사항이라고 생각했다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSO+ResponseCookie.jpg',
        ],
        comment:
          '쿠키로 옮겨간 액세스토큰. sameSite=Strict로 CSRF공격을 방지하는것과, 쿠키도메인 설정을 프론트로하고 nginx로 백엔드에 프록시 하는 등 여러가지 보안 설정을 다시금 머리에 집어넣었다.',
      },
      imageRight: false,
    },
    // {
    //   id: 2,
    //   title: '2. 로그인, 로그아웃, JWT검증, 회원기능',
    //   images: [
    //     {
    //       image:
    //         'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/login1.webp',
    //       comment: '통상 회원가입 로그인',
    //     },
    //     {
    //       image:
    //         'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/login2oauth.webp',
    //       comment: 'Google, Kakao Oauth 로그인',
    //     },
    //     {
    //       image:
    //         'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/NewJWTFilter.PNG',
    //       comment:
    //         '새로워진 JWTFilter 코드. JWT토큰에서 유저정보추출, CustomUserDetail로 인증객체를 생성하고있다. 매 필터마다 DB조회 할 필요X',
    //     },
    //   ],
    //   description: '',
    //   isSpecial: false,
    //   specialStyle: {},
    //   spDescription: {
    //     image: [''],
    //     comment: '',
    //   },
    //   imageRight: false,
    // },
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
              style="max-width: 100%; height: 550px; object-fit: contain"
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

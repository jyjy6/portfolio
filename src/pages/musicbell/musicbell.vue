<script setup lang="ts">
  import TranslationComponent from '../../components/TranslationComponent.vue';
  import { translationConfig } from '../../utils/translationStore';

  const features = [
    {
      title: '모놀리식 -> MSA로 확장, SSO구현',
      icon: 'mdi-check-circle-outline',
      contents:
        'ImgBell단독 모놀리식에서 ImgBell+MusicBell 통합 인증서버 AuthBell, MusicBell이 추가된 MSA도입과 SSO 구현',
    },
    {
      title: '회원 관리 및 인증 JWT',
      icon: 'mdi-check-circle-outline',
      contents: ' Google, Kakao OAuth2 로그인 지원',
    },
    {
      title: 'AWS S3 업로드 기능(axios 사용).',
      icon: 'mdi-check-circle-outline',
      contents: ' AWS S3를 이용한 파일업로드.',
    },

    {
      title: 'Redis를 활용한 일간, 주간랭킹',
      icon: 'mdi-check-circle-outline',
      contents: 'DB사용대신 Redis를 활용하여 빠르고 효율좋게 데이터 처리',
    },
    {
      title: '페이지 관리기능',
      icon: 'mdi-check-circle-outline',
      contents: 'ADMIN페이지의 회원목록, 이미지 관리, 대쉬보드 기능',
    },
    {
      title: 'ElasticSearch를 활용한 음악 검색기능',
      icon: 'mdi-check-circle-outline',
      contents:
        'ElasticSearch를 활용한 복잡한쿼리, 자동완성, 빠른검색기능 구현',
    },
    {
      title: 'Docker 및 Github Actions를활용한 CI/CD 환경 구축',
      icon: 'mdi-check-circle-outline',
      contents:
        'Docker compose, Github Actions를 활용한 CI/CD 자동화 환경 구축',
    },
    {
      title: 'Kafka를 활용한 선택적 로직 비동기 처리',
      icon: 'mdi-check-circle-outline',
      contents: 'Kafka를 활용한 기존로직 비동기 처리',
    },
  ];

  const frontTechStack = [
    'Nuxt4',
    'Vuetify',
    'TypeScript',
    'Pinia',
    'Axios',
    'AWS S3',
    'Docker',
    'Kafka',
  ];

  const backTechStack = [
    'SpringBoot',
    'SpringSecurity',
    'OAuth2',
    'Redis',
    'AWS S3',
    'AWS EC2',
    'MySQL',
    'Elastic Search',
    'Docker',
    'Github Action',
    'Kafka',
    'SSO(Single Sign-On)',
    'MSA',
  ];
</script>

<template>
  <v-container class="pa-10">
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-music" class="mr-2" size="x-large"></v-icon>
      MusicBell (MSA + SSO)
    </h1>

    <v-card class="mb-10 pa-6">
      <v-btn :to="'/musicbell/develop'" class="ma-2" color="red"
        >Detail Development Log</v-btn
      >
      <v-tooltip
        text="서버비 너무 비쌈"
        location="bottom"
        style="max-width: 70%"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }" style="">
          <v-btn
            v-bind="props"
            href=""
            target="_blank"
            color="primary"
            class="ma-2"
            >사이트 방문(현재 접속불가)
          </v-btn>
        </template>
      </v-tooltip>

      <v-btn
        class="ma-2"
        href="https://github.com/jyjy6/musicbellfront"
        target="_blank"
        color="success"
        >프론트 Github</v-btn
      >
      <v-btn
        href="https://github.com/jyjy6/musicbellback"
        target="_blank"
        color="success"
        class="ma-2"
        >백엔드 Github</v-btn
      >
      <v-btn
        href="https://github.com/jyjy6/authbell"
        target="_blank"
        color="success"
        class="ma-2"
        >AuthBell Github</v-btn
      >
    </v-card>

    <v-card class="mb-10 pa-6">
      <h3 class="text-h5 mb-4">📌 프로젝트 시작 이유, 구현</h3>
      <TranslationComponent :api-key="translationConfig.apiKey">
        <p>
          ImgBell 프로젝트가 ES, Kafka등 백엔드에 필요한 대부분의 기능, 스택들을
          사용했다고 생각 될 즈음.. 이 이상 뭘 할 수 있을까? 라고 생각해봤는데
          요즘 백엔드 밥줄이라고 하는 MSA를 구현해보고자 시작했다. <br />사실 내
          개발연차를 생각했을때 빨라도 너무 빠른게 아닐까? 싶기도 했지만 이
          MSA를 구현하는데 까지가 미드개발자의 끝과 같은 영역이라고 AI도 조언을
          줘서 자신감 있게 도전해봤다.
          <br />
          SSO도 구현해봤다 처음엔 이 SSO라는 용어가 내 머리속엔 없었고
          네이버같은데 활용하다보면 웹툰페이지 쇼핑페이지 치지직 이런데 다
          하나의 네이버 아이디로 활용할 수 있지 않은가? 하는 생각으로 구현에
          도전해봤는데 이걸 SSO라고 부르는듯 하다.
          <br />
          이렇듯 개발용어를 상세하게 몰라도 지금까지의 인터넷, 컴퓨터 경험으로
          어떤 기능을 접했을때 "관련된 다른 기능도 구현할 수 있겠다" 라고
          생각하는게 중요한 아키텍쳐링 능력인 것 같다.
        </p>
      </TranslationComponent>

      <v-tooltip
        text="Cursor의 PRO요금제가 끝나버린것이다! Gemini, ChatGPT, Claude 등을 웹에서 활용하고 몸비틀어가면서 열심히 구현했고 결국엔 답을 찾아냈다."
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }" style="">
          <v-chip style="margin-top: 30px; margin-right: 10px" v-bind="props"
            >사실 구현하는데 많이는 아니고 좀 성가신 점이 있었다.</v-chip
          >
        </template>
      </v-tooltip>
    </v-card>

    <v-card class="mb-10 pa-6">
      <h4 class="mb-4">🚀주요 기능</h4>
      <v-list>
        <v-list-item v-for="(feature, index) in features" :key="index">
          <v-list-item-icon>
            <v-icon>{{ feature.icon }}</v-icon>
          </v-list-item-icon>
          <v-tooltip
            :text="feature.contents"
            location="right"
            style="max-width: 70%"
            open-on-hover
            open-on-click
          >
            <template #activator="{ props }" style="">
              <v-list-item-content v-bind="props">
                {{ feature.title }}
              </v-list-item-content>
            </template>
          </v-tooltip>
        </v-list-item>
      </v-list>
    </v-card>
    <v-card class="mb-10 pa-6">
      <h4 class="mb-4">🛠️ Front-End 사용 기술</h4>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="(tech, index) in frontTechStack"
          :key="index"
          class="ma-2"
        >
          {{ tech }}
        </v-chip>
      </div>
    </v-card>

    <v-card class="mb-10 pa-6">
      <h4 class="mb-4">🛠️ Back-End 사용 기술</h4>
      <div class="d-flex flex-wrap">
        <v-chip
          v-for="(tech, index) in backTechStack"
          :key="index"
          class="ma-2"
        >
          {{ tech }}
        </v-chip>
      </div>
    </v-card>
  </v-container>
  <router-view></router-view>
</template>

<style scoped></style>

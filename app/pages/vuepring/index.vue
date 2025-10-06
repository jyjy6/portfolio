<script setup lang="ts">
  import TranslationComponent from '../../components/TranslationComponent.vue';
  import { translationConfig } from '../../utils/translationStore';

  const features = [
    {
      title: '회원 관리 및 인증 JWT',
      icon: 'mdi-check-circle-outline',
      contents: ' Google OAuth2 로그인 지원',
    },
    {
      title: '게시판(글작성) 기능',
      icon: 'mdi-check-circle-outline',
      contents:
        'TipTap 기반  WYSIWYG 에디터를 통한 게시글 작성/수정, 이미지 첨부',
    },
    {
      title: 'AWS S3 이미지 업로드 기능(axios 사용).',
      icon: 'mdi-check-circle-outline',
      contents: ' AWS S3를 이용한 파일업로드.',
    },
    {
      title: '반응형 웹, 모달, 페이지네이션, 검색 기능 구현',
      icon: 'mdi-check-circle-outline',
      contents: '반응형 웹, 모달, 페이지네이션, 검색 기능 구현',
    },
    {
      title: '상점(전자상거래)기능',
      icon: 'mdi-check-circle-outline',
      contents: '상품 등록 및 조회 (Shop 기능)',
    },
    {
      title: '상담기능',
      icon: 'mdi-check-circle-outline',
      contents:
        'WebSocket을 활용한 유저와의 실시간 채팅상담기능. 백엔드와 연계로 해당유저의 이전상담내용 DB저장,',
    },
    {
      title: 'Docker 및 유지보수 환경 구축',
      icon: 'mdi-check-circle-outline',
      contents: 'Docker compose, nginx',
    },
  ];

  const frontTechStack = [
    'Vue3',
    'Vuetify',
    'TypeScript',
    'Vite',
    'Axios',
    'TipTap',
    'Pinia',
    'AWS S3',
    'Docker',
  ];

  const backTechStack = [
    'SpringBoot',
    'SpringSecurity',
    'OAuth2',
    'AWS S3',
    'AWS EC2',
    'MySQL',
    'nginx',
    'Docker',
  ];
</script>

<template>
  <v-container class="pa-10">
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-vuejs" class="mr-2" size="x-large"></v-icon>
      <v-icon icon="mdi-leaf" class="mr-2" size="x-large"></v-icon>
      Vue3+ Spring Project
    </h1>

    <v-card class="mb-10 pa-6">
      <v-btn :to="'/vuepring/develop'" class="ma-2" color="red"
        >Detail Development Log</v-btn
      >
      <v-tooltip
        text="현재 인스턴스 꺼져있음..->EC2 요금이슈"
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
        href="https://github.com/jyjy6/vuepringnewfront"
        target="_blank"
        color="success"
        >프론트 Github</v-btn
      >
      <v-btn
        href="https://github.com/jyjy6/vuepring"
        target="_blank"
        color="success"
        class="ma-2"
        >백엔드 Github</v-btn
      >
    </v-card>

    <v-card class="mb-10 pa-6">
      <h3 class="text-h5 mb-4">📌 프로젝트 시작 이유</h3>
      <TranslationComponent :api-key="translationConfig.apiKey">
        <p>
          Vue3+Spring을 막 배운참에 대한민국에선 마이너한 스포츠인 복싱관련
          홈페이지를 만들어보고싶었다.<br />
          <br />
          기본적으론 프론트엔드+백엔드를 분리된 웹개발을 목표로<br />
          ADMIN페이지와 유저에게 보여지는 로직, AWS S3를 이용한 외부서비스를
          통한 파일업로드 학습,
          <br />
          상점(전자상거래)기능, 실시간 상담기능 등 종합적인 모던 웹페이지 설계
          공부를 할 수 있다고 판단하였기에 시작했다.<br /><br />
          더 나아가 코드 전체의 리팩토링, Docker등의 도입등으로 유지,보수에관한
          실력도 늘릴 수 있었다.
        </p>
      </TranslationComponent>

      <v-tooltip
        text="React는 선점효과로인한 개발시장의 고용률이 높다는 것과 넓은 생태계로 얻을 수 있는 지식(구글링) 이외의 큰 장점을 못얻었음.
        하지만 Vue3는 꾸준한 업데이트, 정해져 있는 코딩방식으로 인한 타 개발자와의 협업+유지보수 용이, 간단한 코드 구조 등 많은 장점이 보였기때문에 선택함"
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }" style="">
          <v-chip style="margin-top: 30px; margin-right: 10px" v-bind="props"
            >왜 React아니고 Vue3를 선택?</v-chip
          >
        </template>
      </v-tooltip>

      <v-tooltip
        text="Spring Boot는 선점효과뿐만아니라 Java의 객체지향프로그래밍 학습과 대규모 트래픽, 복잡한 트랜잭션을 견디는 데 최적화돼 있고 에러 나도 구글링하면 대부분 해결됨 → 유지보수 쉬움. Controller-Service-Repository 구조로 계층화하기 쉬워서 협업도 체계적이다."
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }">
          <v-chip style="margin-top: 30px" v-bind="props"
            >Spring Boot도 선점효과뿐인거 아님? 왜고름</v-chip
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

<script setup lang="ts">
  const features = [
    {
      title: '회원 관리 및 인증 JWT',
      icon: 'mdi-check-circle-outline',
      contents: ' Google OAuth2 로그인 지원, 로그인 횟수제한',
    },
    {
      title: '글작성 기능',
      icon: 'mdi-check-circle-outline',
      contents:
        'TipTap 기반 WYSIWYG 에디터를 통한 게시글 작성/수정, 이미지 첨부',
    },
    {
      title: '페이지 관리기능',
      icon: 'mdi-check-circle-outline',
      contents: 'ADMIN페이지의 회원목록 관리기능, 공지 및 배너 관리기능',
    },
    {
      title: '동영상, 오디오 제공',
      icon: 'mdi-check-circle-outline',
      contents: '라디오 웹사이트의 플레이목록, 스트리밍',
    },
    {
      title: 'AWS S3 영상, 이미지 업로드 기능(axios 사용).',
      icon: 'mdi-check-circle-outline',
      contents: ' AWS S3를 이용한 파일업로드.',
    },
    {
      title: '반응형 웹, 모달, 페이지네이션, 검색 기능 구현',
      icon: 'mdi-check-circle-outline',
      contents: '반응형 웹, 모달, 페이지네이션, 검색 기능 구현',
    },
    {
      title: '미들웨어를 사용한 jwt,csrf인증 ip출력',
      icon: 'mdi-check-circle-outline',
      contents: '미들웨어를 사용한 jwt csrf ip출력',
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
    'NUXT3',
    'OAuth2',
    'AWS S3',
    'AWS EC2',
    'MongoDB',
    'Mongoose',
    'nginx',
    'Docker',
  ];
</script>

<template>
  <v-container class="pa-10">
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-nuxt" class="mr-2" size="x-large"></v-icon>
      NUXT3 Project
    </h1>
    <v-card class="mb-10 pa-6">
      <v-btn :to="'/nuxt3/develop'" class="ma-2" color="red"
        >상세개발로그</v-btn
      >
      <v-tooltip
        text="(현재 접속가능 -> EC2에서 Vercel로 배포 플랫폼 변경)"
        location="right"
        style="max-width: 70%"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            href="https://nuxt-onsen-1mkdru8pc-jung-juneyoungs-projects.vercel.app/"
            target="_blank"
            color="primary"
            class="ma-2"
            >사이트 방문
          </v-btn>
        </template>
      </v-tooltip>

      <v-btn
        class="ma-2"
        href="https://github.com/jyjy6/nuxt-onsen"
        target="_blank"
        color="success"
        >Github</v-btn
      >
    </v-card>

    <v-card class="mb-10 pa-6">
      <h3 class="text-h5 mb-4">📌 프로젝트 시작 이유</h3>
      <p>
        Vue3+Spring 프로젝트를 끝내고 서버사이드 렌더링 기술도 갖춰두고 싶었는데
        React사용자가 NextJS를 쓰듯 Vue는 NuxtJS를 사용한다고 하기에 선택했다.
        <br /><br />
        컨텐츠적인 측면으론 본인은 12월 시력교정수술로 인해 약 3~4개월간
        컴퓨터나 스마트폰 등의 화면을 거의 못보는 상태였는데 그 동안 외국어 청해
        능력이라도 강화하고자 일본 웹 라디오(onsen.com)를 자주 듣게 되었고 그 웹
        페이지와 비슷한 페이지를 만들면 역량강화에 도움이 되겠다고 생각하여
        시작했다.
      </p>

      <v-tooltip
        text="물론 express+mongoDB의 기초개발경험도 있고 고민도 많이 했지만 NUXT3가 훨씬 더 편한 설정, 정해진 구조(유지보수 하기 좋은)로 설계돼있는 프레임워크여서 선택했다."
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }">
          <v-chip style="margin-top: 30px; margin-right: 10px" v-bind="props"
            >express.js 안씀?</v-chip
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

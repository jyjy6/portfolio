<script setup lang="ts">
  const features = [
    {
      title: '회원 관리 및 인증 JWT',
      icon: 'mdi-check-circle-outline',
      contents: ' Google, Kakao OAuth2 로그인 지원',
    },
    {
      title: 'Google Gemini API를 활용한 이미지 자동 분석, 태그 추가 기능',
      icon: 'mdi-check-circle-outline',
      contents:
        '이미지를 분석하고 태그제공, 클라이언트가 태그추가 가능. AI제공 등급에 따른 이미지 등급 선정 가능.',
    },
    {
      title:
        'Google Gemini API를 활용한 만화/애니메이션 캐릭터가 분석해주는 이미지!',
      icon: 'mdi-check-circle-outline',
      contents:
        '원피스의 캐릭터 마샬 D. 티치(검은수염이) 어떤 이미지인지 분석해줍니다!',
    },
    {
      title: 'AWS S3 이미지 업로드 기능(axios 사용).',
      icon: 'mdi-check-circle-outline',
      contents: ' AWS S3를 이용한 파일업로드.',
    },
    {
      title: '이미지 커뮤니티',
      icon: 'mdi-check-circle-outline',
      contents:
        '이미지 커뮤니티 기능(이미지 당 좋아요, 댓글, 그에 따른 일간, 주간랭킹 제공 등)',
    },
    {
      title: '게시판(글작성) 기능',
      icon: 'mdi-check-circle-outline',
      contents:
        'TipTap 기반  WYSIWYG 에디터를 통한 게시글 작성/수정, 이미지 첨부, 댓글 기능',
    },
    {
      title: '댓글 알림 기능',
      icon: 'mdi-check-circle-outline',
      contents: 'Websocket을 활용한 댓글 실시간 스낵바 알림기능',
    },
    {
      title: 'Redis를 활용한 일간, 주간랭킹, 최근 본 항목',
      icon: 'mdi-check-circle-outline',
      contents: 'DB사용대신 Redis를 활용하여 빠르고 효율좋게 데이터 처리',
    },
    {
      title: '페이지 관리기능',
      icon: 'mdi-check-circle-outline',
      contents: 'ADMIN페이지의 회원목록, 이미지 관리, 대쉬보드 기능',
    },
    {
      title: '이미지 검색기능',
      icon: 'mdi-check-circle-outline',
      contents:
        'JPA Specification을 활용한 이미지 검색기능(태그, 이미지명, Artist명 등 통합 검색)',
    },
    {
      title: 'Docker 및 유지보수 환경 구축',
      icon: 'mdi-check-circle-outline',
      contents: 'Docker compose, 도커를 사용한 Redis',
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
    'Gemini API',
    'SpringBoot',
    'SpringSecurity',
    'OAuth2',
    'Redis',
    'Websocket',
    'JPA Specification',
    'AWS S3',
    'AWS EC2',
    'MySQL',
    'Docker',
  ];
</script>

<template>
  <v-container class="pa-10">
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-vuejs" class="mr-2" size="x-large"></v-icon>
      <v-icon icon="mdi-leaf" class="mr-2" size="x-large"></v-icon>
      ImageBell (Vue3+SpringBoot)
    </h1>

    <v-card class="mb-10 pa-6">
      <v-btn :to="'/imgbell/develop'" class="ma-2" color="red"
        >상세개발로그</v-btn
      >
      <v-tooltip
        text="개발 진행중"
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
        href="https://github.com/jyjy6/imgbellfront"
        target="_blank"
        color="success"
        >프론트 Github</v-btn
      >
      <v-btn
        href="https://github.com/jyjy6/imgbell"
        target="_blank"
        color="success"
        class="ma-2"
        >백엔드 Github</v-btn
      >
    </v-card>

    <v-card class="mb-10 pa-6">
      <h3 class="text-h5 mb-4">📌 프로젝트 시작 이유</h3>
      <p>
        Vue3+Spring을 더 심화시키고싶어서 시작했다. <br />
        <br />
        이전 프로젝트에서 더 발전의 여지가 있었던 JWT 완전한 Stateless 발급,
        OneToMany ManyToOne 등의 어노테이션을 활용한 테이블간의 조인,
        외부서비스를 통한 파일업로드 최적화, 새로이 Redis를 도입한 DB사용
        최적화, 여러 쿼리 조건에 따른 검색기능, kakao Oauth 추가 등 종합적인
        모던 웹페이지의 전반적인 개발 실력 향상이 가능하다고 생각했다.
        <br /><br />
        <strong
          >추가로 Google Gemini AI를 활용하여 AI와의 연계 서비스를 구현할 수
          있을 것이라고 생각했다.</strong
        >
      </p>

      <v-tooltip
        text="그냥 별 이유는 없고 스프링부트에 종 모양이 있어서.. 따왔다.."
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }" style="">
          <v-chip style="margin-top: 30px; margin-right: 10px" v-bind="props"
            >뭐 왜 ImgBell이란 이름을 지음?</v-chip
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

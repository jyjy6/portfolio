<script setup lang="ts">
  import { ref } from 'vue';

  const panels = ref<string[]>(['intro']);

  const frontEndStacks = [
    {
      label: 'Vue3',
      description:
        'Composition API, script setup lang="ts" 주로사용. Option API도 개발초기엔 사용했으나 Vue3에서 권장X',
    },
    {
      label: 'Vuetify',
      description: 'Vue용 Material Design UI 라이브러리. Tailwind보다 훨씬 좋다고 생각한다',
    },
    {
      label: 'TypeScript',
      description:
        '정적 타입을 지원하는 JavaScript. 최초엔 코드량만늘고 왜 쓰나 싶었지만 발전해가면서 큰 프로젝트일수록 타입스크립트 없이는 유지보수가 불가능 할거란 느낌을 많이 받음. 데이터 주고 받을때 특히.',
    },
    { label: 'Axios', description: 'Promise 기반 HTTP 클라이언트.' },
    { label: 'Pinia', description: 'Vue 공식 상태 관리 라이브러리' },
    {
      label: 'Vuex',
      description:
        '(구버전) Vue용 상태 관리 라이브러리 Pinia가 더 직관적이고 깔끔하기에 Pinia주력으로 사용하지만 개발초기에 사용했으므로 코드 이해가능',
    },
  ];

  const backEndStacks = [
    {
      section: '공통',
      chips: [
        {
          label: 'JWT',
          description:
            '토큰 기반 인증 방식. refreshToken, accessToken을 이용한 Stateless 로그인 구현 가능',
        },
        { label: 'socket.io', description: 'WebSocket 실시간 통신. 채팅(상담)기능 구현' },
        {
          label: 'AWS S3',
          description: '클라우드 스토리지 서비스. 파일업로드 기능은 주로 이 서비스를 사용함',
        },
        {
          label: 'AWS EC2',
          description:
            '가상 서버 서비스. Git Action과의 연계도 가능하지만 EC2의 메모리 한계로 빌드된 프로젝트의 Docker파일을 옮겨서 EC2인스턴스 에서 직접 실행하거나 git clone하는 방식을 주로 사용했음.',
        },
        { label: 'OAuth', description: 'SNS 로그인 인증 프로토콜. Google 서비스를 주로 사용' },
        {
          label: 'nginx',
          description:
            '웹 서버 및 리버스 프록시 서버. 리버스 프록시는 적극적으로 활용했고 로드밸런싱, IP출력등의 기능도 사용가능하지만 실제 서비스 단계가 아니어서 실용적인느낌은 없었음.',
        },
      ],
    },
    {
      section: 'SpringBoot',
      chips: [
        { label: 'Spring Security', description: 'Spring 기반 보안 프레임워크. 최신버전 사용.' },
        { label: 'Oracle', description: '오라클 데이터베이스' },
        {
          label: 'MySQL',
          description:
            '오픈소스 데이터베이스. Azure를 사용했으나 프리티어 종료되어서 사용하던 데이터베이스 다 백업 후 본인의 현재 로컬컴퓨터를 MySQL DB서버로 사용중.',
        },
        {
          label: 'JPA(Hibernate)',
          description:
            'ORM 프레임워크. Java Persistence API, 자바 어플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 인터페이스이고, Hibernate는 그걸 구현한 구현체인데 요즘은 그냥 둘 다 동의어로 쓰나보다. 개발 초창기엔 Derived Query Method가 혁명처럼 느껴졌다.',
        },
      ],
    },
    {
      section: 'NUXT3',
      chips: [
        { label: 'MongoDB', description: 'NoSQL 데이터베이스' },
        { label: 'Pinia', description: 'NUXT에서도 사용 가능한 상태 관리' },
      ],
    },
  ];

  const etcStacks = [
    {
      label: 'Docker',
      description:
        '리눅스 컨테이너 기술. 휘발성이 강하고, 가볍고, 여러개의 서비스 구동하기에 용이하다. Docker-compose 까지 활용가능. NUXT프로젝트에선 도커파일을 tar.gz 압축해서 EC2로 scp -i 명령어로 전송 후 docker-compose로 해당 이미지를 사용하는 등 정말 활용법이 무궁무진한 좋은 기술 이라고 생각한다.',
    },
    { label: 'Git', description: '주로 Trunk-based 사용합니다.' },
    {
      label: 'Git Action',
      description:
        'CI/CD 자동화 플랫폼..인데 Ec2 프리티어의경우 메모리부족으로 적극적인 사용이 불가능했음. 개념, 사용법이해는 완료',
    },
    {
      label: 'JLPT N1',
      description: '국제 일본어 능력 시험 최고 등급. 177/180점. 일본 1년 거주 경험있음',
    },
    { label: '정보처리산업기사', description: '2024년도 과정평가형 취득' },
  ];
</script>

<template>
  <v-container>
    <h1 class="text-center pa-10 d-inline-flex align-center">
      About Me
      <v-tooltip
        text="각 기술 위에 마우스를 올리면 상세내용을 확인할 수 있습니다"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-icon small class="ml-2" v-bind="props"> mdi-information </v-icon>
        </template>
      </v-tooltip>
    </h1>

    <v-expansion-panels v-model="panels" multiple>
      <!-- Front-End -->
      <v-expansion-panel value="front">
        <v-expansion-panel-title> <h2>Front-End</h2></v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col v-for="item in frontEndStacks" :key="item.label" cols="auto">
              <v-tooltip :text="item.description">
                <template #activator="{ props }">
                  <v-chip v-bind="props" class="my-chip">{{ item.label }}</v-chip>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Back-End -->
      <v-expansion-panel value="back">
        <v-expansion-panel-title> <h2>Back-End</h2> </v-expansion-panel-title>
        <v-expansion-panel-text v-for="section in backEndStacks" :key="section.section">
          <h5 class="sub-title">{{ section.section }}</h5>
          <v-row>
            <v-col v-for="chip in section.chips" :key="chip.label" cols="auto">
              <v-tooltip :text="chip.description">
                <template #activator="{ props }">
                  <v-chip v-bind="props" class="my-chip">{{ chip.label }}</v-chip>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- 기타 기술, 자격증 -->
      <v-expansion-panel value="etc">
        <v-expansion-panel-title> <h2>기타 기술, 자격증</h2> </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col v-for="item in etcStacks" :key="item.label" cols="auto">
              <v-tooltip :text="item.description">
                <template #activator="{ props }">
                  <v-chip v-bind="props" class="my-chip">{{ item.label }}</v-chip>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- 소개 및 목표 -->
      <v-expansion-panel value="intro">
        <v-expansion-panel-title> <h2>간략소개, 목표</h2> </v-expansion-panel-title>
        <v-expansion-panel-text>
          AI 시대이기 때문에 개발자의 밥그릇이 위험하다. 라는 말이 많이 나오지만 산업혁명 마다 그 말
          나오지 않았을까..?<br /><br />
          사회 변화에 맞추어 순응, 적응하려하지 않는 사람이 도태된다고 생각하고<br /><br />부족한
          인간의 지능, 기억력을 AI가 메꿔준다면 <br /><br />타고난 센스로 활용하는 능력을 발휘하는게
          인간이 AI시대에 맞춰 해야할 일이라고 생각합니다🚀
          <br />
          <br />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<style scoped>
  .my-chip {
    margin: 6px;
  }

  .sub-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }
</style>

<script setup lang="ts">
import TranslationComponent from "../../components/TranslationComponent.vue";
import { translationConfig } from "../../utils/translationUtil";

const features = [
  {
    title: "LanghChain4j",
    icon: "mdi-link-variant",
    contents:
      "LangChain4j의 기반의 기능에 대한 기록과, 실제로 개발한 서비스를 설명한다.",
  },
  {
    title: "Embedding",
    icon: "mdi-link-variant",
    contents:
      "백엔드와 벡터 DB의 연결고리가되는 주요 기능. Gemini, OpenAI를 사용했고 기본 768차원.",
  },
  {
    title: "VectorDB",
    icon: "mdi-link-variant",
    contents:
      "쉽게말해 자연어를 컴퓨터가 알아듣기, 찾기 쉬운방식의 '값'으로 변환한 DB. pincone, postgres기반의 pgvetctor를 사용했다.",
  },
  {
    title: "Tools",
    icon: "mdi-link-variant",
    contents:
      "LangChain4j의 기능을 확장하기 위해 사용하는 핵심기술. 주로 내 백엔드 함수를 사용하게나, 외부 API를 호출하는 기능이다.",
  },
];

const frontTechStack = [
  "Nuxt4",
  "Vuetify",
  "TypeScript",
  "Pinia",
  "Axios",
  "AWS S3",
  "Docker",
];

const backTechStack = [
  "SpringBoot",
  "LangChain4j",
  "OpenAI Embedding",
  "Gemini Embedding",
  "Pinecone",
  "pgvector DB",
  "MySQL",
  "Docker",
  "Kafka",
  "Redis",
];
</script>

<template>
  <v-container>
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-link-variant" class="mr-2" size="x-large"></v-icon>
      LangChain4j
    </h1>

    <v-card class="mb-10 pa-6">
      <v-tooltip
        text="♡♥준비중♡♥"
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }" style="">
          <v-btn
            v-bind="props"
            class="ma-2 text-wrap py-2"
            color="red"
            height="auto"
            min-height="36"
          >
            LangChain4j DevLog
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip
        text="♡♥준비중♡♥"
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }" style="">
          <v-btn
            v-bind="props"
            class="ma-2 text-wrap py-2"
            color="primary"
            height="auto"
            min-height="36"
          >
            LangChain4j DevLog(Advanced)
          </v-btn>
        </template>
      </v-tooltip>

      <!-- <v-tooltip
        text=""
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
      </v-tooltip> -->

      <v-btn
        href="https://github.com/jyjy6/woaback"
        target="_blank"
        color="success"
        class="ma-2"
        >백엔드 Github</v-btn
      >
    </v-card>

    <v-card class="mb-10 pa-6">
      <h3 class="text-h5 mb-4">📌 프로젝트 시작 이유, 구현</h3>
      <TranslationComponent :api-key="translationConfig.apiKey">
        <p>
          NanoBanana. 즉 외부AI API를 활용한 서비스를 완성하고 배포한 후에 이
          이상 내가 어떤방향으로 성장할 수 있을지 고민을 했고 분기점이 2개로
          나뉘었다.
        </p>
        <br />
        <h4>
          1. Kubernetes를 활용하여 MSA와 AWS, GCP 등 Native Cloud환경에 대한
          역량강화. 즉 DevOps의 길로 나아간다.
        </h4>
        <h4>2. 요즘 HOT한 LLM을 활용한 AI서비스 개발자가 된다.</h4>
        <br />

        <p>
          이 페이지의 존재자체가 그 결과지만 AI서비스 개발자를 선택했다.
          <br />
          그 이유로는 LangChain4j개발을 마이크로소프트에서 지원하고 있다는 점,
          2025년 출시되었기에 불안정하지만 기술의 선점이 가능하다는 점, 내가
          현재 가지고있는 Spring Boot기반의 Kafka Redis에 바로 LangChain4j를
          탑재하여 서비스 확장이 가능하고, <br />LangChain4j 자체의 수요가
          부족하더라도 LLM, RAG, Embedding, VectorDB 등의 여러 AI기반 신신기술을
          체험할 수 있다는 점이 매력으로 다가왔다.
        </p>

        <br />
        <br />
        <p>
          아무튼 LangChain4j.. 선택한건 좋은데 역시 기술관련 정보가 워낙
          없었다.<br />
          AI Agent역시 버전, 지원 AI모델 혼동 등 여러가지 시행착오가 있었고
          결국엔 그 트러블 슈팅들이 다 내 뼈가되고 살이된 기분이다.
        </p>
        <br />
        <p>
          상세 개발로그에선 LangChain4j의 기본적인 기능에대한 기록과, 실제로
          개발한 서비스를 설명한다.
        </p>
      </TranslationComponent>

      <v-tooltip
        text="첫번째 선택지는 DevOps의 수요는 높으나 백엔드+DevOps 인재풀이 현
          IT시장에서 워낙 탄탄하고 MSA를 사용하지않고 그냥 EC2에서 모놀리식으로
          서버운영 하는 곳에는 거의 유효하지 않다는점, 두번째 선택지는 LLM시장이
          나온지 3년 정도 밖에 되지 않은 불안정한 시장이기에 리스크가 애초에
          높다는점 + AI, LLM서비스는 주로 Python을 사용한다는 점과 LangChain4j
          라는 기술스택의 수요가 아직까진 없다는 점 등 상당한 고민을 했다."
        location="bottom"
        max-width="500px"
        open-on-hover
        open-on-click
      >
        <template #activator="{ props }" style="">
          <v-chip style="margin-top: 30px; margin-right: 10px" v-bind="props"
            >분기점에서 고민했던 이유는..</v-chip
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

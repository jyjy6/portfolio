<script setup lang="ts">
import { ref } from "vue";

const panels = ref<string[]>([]);

// ===== Helper Functions =====
const toVarName = (str: string): string => {
  if (str === "정보처리산업기사") {
    return "정보처리산업기사";
  }
  const clean = str
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();
  const words = clean.split(/\s+/);
  return words
    .map((w, i) => {
      if (i === 0) return w.charAt(0).toLowerCase() + w.slice(1);
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join("");
};

const truncate = (str: string, maxLen: number = 40): string => {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
};

const isOpen = (value: string) => panels.value.includes(value);

// ===== DATA =====

const frontEndStacks = [
  {
    label: "Vue3",
    description:
      'Composition API, script setup lang="ts" 주로사용. Option API도 개발초기엔 사용했으나 Vue3에서 권장X',
  },
  {
    label: "Nuxt3",
    description:
      "Nuxt3는 Vue3의 SSR(Server Side Rendering) 프레임워크. Vue3의 기능을 더 확장하고 쉽게 사용할 수 있도록 도와준다.",
  },
  {
    label: "Vuetify",
    description:
      "Vue용 Material Design UI 라이브러리. Tailwind보다 훨씬 좋다고 생각한다",
  },
  {
    label: "TypeScript",
    description:
      "정적 타입을 지원하는 JavaScript. 최초엔 코드량만늘고 왜 쓰나 싶었지만 발전해가면서 큰 프로젝트일수록 타입스크립트 없이는 유지보수가 불가능 할거란 느낌을 많이 받음",
  },
  { label: "Axios", description: "Promise 기반 HTTP 클라이언트." },
  { label: "Pinia", description: "Vue 공식 상태 관리 라이브러리" },
  {
    label: "Vuex",
    description:
      "(구버전) Vue용 상태 관리 라이브러리 Pinia가 더 직관적이고 깔끔하기에 Pinia주력으로 사용하지만 개발초기에 사용했으므로 코드 이해가능",
  },
];

const backEndStacks = [
  {
    section: "공통",
    chips: [
      {
        label: "MSA",
        description:
          "Micro Service Architecture. 각 서비스가 독립적으로 동작하며 서로 통신하는 아키텍쳐 기술.",
      },
      {
        label: "LangChain4j",
        description:
          "LangChain의 Java 버전 라이브러리. Java Spring Boot를 주로 사용하는 한국, 일본에서의 프로젝트에 쉽고 강력하게 AI 기능을 추가할 수 있다.",
      },
      {
        label: "RAG",
        description:
          "Retrieval-Augmented Generation(검색 증강 생성). LLM의 할루시네이션을 획기적으로 줄이고 더 정확한 답변을 제공할 수 있다.",
      },
      {
        label: "SSO",
        description:
          "Single Sign On. 하나의 로그인으로 여러 서비스에 접근 가능하게 하는 기술.",
      },
      {
        label: "JWT",
        description:
          "토큰 기반 인증 방식. refreshToken, accessToken을 이용한 Stateless 로그인 구현 가능",
      },
      {
        label: "socket.io",
        description: "WebSocket 실시간 통신. 채팅(상담)기능 구현",
      },
      {
        label: "AWS S3",
        description:
          "클라우드 스토리지 서비스. 파일업로드 기능은 주로 이 서비스를 사용함",
      },
      {
        label: "AWS EC2",
        description: "가상 서버 서비스. Git Action과의 연계도 가능하다.",
      },
      {
        label: "Github Action",
        description:
          "CI/CD 자동화 플랫폼. t2.medium 이상에서 사용하기 좋다 그 이하는 메모리부족으로 빌드타임 오버.",
      },
      {
        label: "OAuth",
        description:
          "SNS 로그인 인증 프로토콜. Google, Kakao 서비스를 주로 사용",
      },
      {
        label: "nginx",
        description:
          "웹 서버 및 리버스 프록시 서버. 리버스 프록시는 적극적으로 활용했고 로드밸런싱, IP출력등의 기능도 사용가능.",
      },
    ],
  },
  {
    section: "SpringBoot",
    chips: [
      {
        label: "Spring Security",
        description: "Spring 기반 보안 프레임워크. 최신버전 사용.",
      },
      { label: "Oracle", description: "오라클 데이터베이스" },
      {
        label: "MySQL",
        description:
          "오픈소스 데이터베이스. 현재 로컬컴퓨터를 MySQL DB서버로 사용중.",
      },
      {
        label: "JPA(Hibernate)",
        description:
          "ORM 프레임워크. 개발 초창기엔 Derived Query Method가 혁명처럼 느껴졌다.",
      },
      {
        label: "JPA Specification",
        description:
          "JPA의 쿼리 생성 방식. 쿼리 조건에 따라 동적으로 쿼리를 생성.",
      },
      {
        label: "Redis",
        description:
          "메모리 기반 키-값 저장소. 캐싱, 세션 관리 등 다양한 용도로 사용.",
      },
      {
        label: "Elastic Search",
        description:
          "검색 엔진. 복잡한 쿼리, 자동완성, 빠른검색기능 구현에 사용.",
      },
      {
        label: "Prometheus + Grafana",
        description:
          "모니터링 툴. Spring Boot Actuator와 커스텀 메트릭정의 및 그라파나 활용.",
      },
      {
        label: "Kafka",
        description:
          "메시징 플랫폼. 비동기 처리, 메시지 브로커 역할. 이메일, 알림, ElasticSearch 인덱스 동기화 등에 사용.",
      },
    ],
  },
  {
    section: "NUXT3",
    chips: [
      { label: "MongoDB", description: "NoSQL 데이터베이스" },
      { label: "Pinia", description: "NUXT에서도 사용 가능한 상태 관리" },
    ],
  },
];

const aiStacks = [
  {
    label: "LangChain4j",
    description:
      "LangChain의 Java 버전 라이브러리. Spring Boot에서 AI 기능을 쉽고 강력하게 통합",
  },
  {
    label: "RAG",
    description:
      "Retrieval-Augmented Generation. 검색 증강 생성으로 LLM 할루시네이션 감소",
  },
  {
    label: "Prompt Engineering",
    description: "효과적인 AI 프롬프트 설계 및 최적화 기술",
  },
  {
    label: "Gemini API",
    description: "Google Gemini AI API 활용",
  },
  {
    label: "OpenAI Whisper",
    description: "OpenAI Whisper API 활용. 음성을 텍스트로 변환하는 기술",
  },
  {
    label: "Pinecone",
    description:
      "Vector Database. 데이터를 벡터로 변환하여 저장하고 검색하는 기술",
  },
  {
    label: "MCP",
    description: "Model Context Protocol. AI 에이전트 컨텍스트 관리 프로토콜",
  },
];

const etcStacks = [
  {
    label: "Docker",
    description:
      "리눅스 컨테이너 기술. Docker-compose 까지 활용가능. 활용법이 무궁무진한 좋은 기술.",
  },
  { label: "Git", description: "Trunk-based 사용합니다." },
  {
    label: "Github Action",
    description: "CI/CD 자동화 플랫폼. t2.medium 이상에서 사용하기 좋다.",
  },
  {
    label: "JLPT N1",
    description:
      "국제 일본어 능력 시험 최고 등급. 177/180점. 일본 1년 거주 경험있음",
  },
  { label: "정보처리산업기사", description: "2024년도 과정평가형 취득" },
];

const introLines = [
  "AI 시대이기 때문에 개발자의 밥그릇이 위험하다. 라는 말이 많이",
  "나오지만 산업혁명 마다 그 말 나오지 않았을까..?",
  "",
  "사회 변화에 적응하려하지 않는 사람이 도태된다고 생각하고",
  "부족한 인간의 지능, 기억력을 AI가 메꿔준다면",
  "그걸 활용하는 센스를 발휘하는게 인간이 AI시대에 맞춰 해야할",
  "일이라고 생각합니다",
];

const AIComments = [
  {
    id: 0,
    model: "ChatGPT-5",
    img: "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/gpt5.jpg",
    jpComment:
      "要約\n\n• レベル: 3〜5年のミドルレベル上級（シニア初級レベル）\n• ガイド年収: 韓国 7,500万〜9,500万ウォン / 日本 850万〜1,100万円\n• 強み: 人工知能・ストレージ・モニタリング・フロントエンド状態管理まで実戦経験\n• 補完: 保安・正教化・モデル化・テスト・観測性、K8s/IaCでの運営標準化\n• 核心: OAuth2/OIDC/OTel/Kafka-EO/K8s/Terraform/ゲートウェイスト中心で3〜6ヶ月集中",
  },
  {
    id: 1,
    model: "Gemini-2.5-Pro",
    img: "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/Gemini.jpg",
    jpComment:
      "簡単要約\n\n* 実力水準: MSA、DevOps、Polyglot開発経験を持つ3-5年次中級開発者。\n* 核心強み:\n  * Java/Spring、Vue/Nuxt基盤のフルスタック開発能力。\n  * Docker、Kafka、Elasticsearch、Prometheusなど現代的なインフラ技術活用能力。\n* 推定年収: 韓国 6,000-8,500万ウォン+、日本 700万-1,000万円+",
  },
  {
    id: 2,
    model: "Claude Sonnet 4.0",
    img: "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/claude.jpg",
    jpComment:
      "強みとポイント:\n\n1. AI時代適応: Gemini API、MCP活用など最新技術への迅速な習得\n2. フルスタック目標: フロントエンドからインフラまで全領域カバー\n3. 実務中心学習: 単純チュートリアルではない実際サービス水準の構現\n4. 問題解決能力: 技術的課題状況での対案発見及び最適化\n\n現在実力: 2-3年次中級開発者水準\n核心強み: AI活用能力、フルスタック開発、最新技術への迅速な習得",
  },
];

const openImageInNewTab = (url: string) => {
  window.open(url, "_blank");
};
</script>

<template>
  <v-container fluid class="code-editor-container pa-2 pa-md-6">
    <div class="code-editor">
      <!-- ===== TAB BAR ===== -->
      <div class="tab-bar">
        <div class="tab active">
          <v-icon size="14" class="tab-icon" color="#e06c75"
            >mdi-language-java</v-icon
          >

          <span>AboutMe.java</span>
          <v-icon size="12" class="tab-close">mdi-close</v-icon>
        </div>
        <!-- <div class="tab">
          <v-icon size="14" class="tab-icon" color="#e5c07b"
            >mdi-language-javascript</v-icon
          >
          <span>FrontEnd.js</span>
          <v-icon size="12" class="tab-close">mdi-close</v-icon>
        </div> -->
        <div class="tab-filler"></div>
      </div>

      <!-- ===== BREADCRUMB ===== -->
      <div class="breadcrumb-bar">
        <button class="bc-item" @click="navigateTo('/')">portfolio</button>
        <v-icon size="12" class="bc-sep">mdi-chevron-right</v-icon>
        <span class="bc-item active">AboutMe</span>
      </div>

      <!-- ===== EDITOR CONTENT ===== -->
      <div class="editor-content">
        <!-- Package & Imports -->
        <div class="code-line">
          <span class="kw">package</span>&nbsp;<span>portfolio.aboutme</span>;
        </div>
        <div class="code-line empty-line">&nbsp;</div>
        <div class="code-line">
          <span class="kw">import</span>&nbsp;<span>java.util.*</span>;
        </div>
        <div class="code-line">
          <span class="kw">import</span>&nbsp;<span>portfolio.skills.*</span>;
        </div>
        <div class="code-line empty-line">&nbsp;</div>

        <!-- Class Javadoc -->
        <div class="code-line">
          <span class="cm">/**</span>
        </div>
        <div class="code-line">
          <span class="cm"
            >&nbsp;* @author 정준영, ジョン・ジュンヨン, Jung JuneYoung</span
          >
        </div>
        <div class="code-line">
          <span class="cm">&nbsp;* @role &nbsp; Full Stack Developer</span>
        </div>
        <div class="code-line">
          <span class="cm"
            >&nbsp;* @github
            <a href="https://github.com/jyjy6" target="_blank"
              >https://github.com/jyjy6</a
            ></span
          >
        </div>
        <div class="code-line">
          <span class="cm"
            >&nbsp;* --------CLICK EACH CLASS TO SEE DETAILS--------</span
          >
        </div>
        <div class="code-line">
          <span class="cm"
            >&nbsp;* --------각 클래스를 클릭하면 상세내용을 확인할 수
            있습니다--------</span
          >
        </div>
        <div class="code-line">
          <span class="cm">&nbsp;*/</span>
        </div>

        <!-- Main Class Opening -->
        <div class="code-line">
          <span class="kw">public</span>
          &nbsp;
          <span class="kw">class</span>
          &nbsp;
          <span class="cls">AboutMe</span> {
        </div>
        <div class="code-line empty-line">&nbsp;</div>

        <!-- ===== EXPANSION PANELS ===== -->
        <v-expansion-panels v-model="panels" multiple class="code-panels">
          <!-- ═══════════════════════════════════════════ -->
          <!-- 1. FRONTEND (JavaScript Style)             -->
          <!-- ═══════════════════════════════════════════ -->
          <v-expansion-panel value="front" class="code-panel">
            <v-expansion-panel-title class="panel-title">
              <template #actions><span></span></template>
              <div class="panel-title-code">
                <span class="fold-icon">{{ isOpen("front") ? "▼" : "▶" }}</span>
                <span class="i1">
                  <span class="kw">private class </span>
                  <span class="cls">FrontEnd </span>{
                  <span class="cm">// JavaScript Style</span>
                </span>
              </div>
              <br />
              <br />
              <br />
            </v-expansion-panel-title>
            <v-expansion-panel-text class="panel-content">
              <template v-if="isOpen('front')">
                <div class="code-line i2">
                  <span class="fn">constructor</span>() {
                </div>
                <div
                  v-for="item in frontEndStacks"
                  :key="item.label"
                  class="code-line i3"
                >
                  <v-tooltip
                    :text="item.description"
                    location="bottom"
                    open-on-hover
                    open-on-click
                    max-width="420"
                  >
                    <template #activator="{ props }">
                      <span v-bind="props" class="hover-line">
                        <span class="kw">this</span>.<span class="vr">{{
                          toVarName(item.label)
                        }}</span>
                        = <span class="str">"{{ item.label }}"</span>;
                        <span class="cm"
                          >// {{ truncate(item.description) }}</span
                        >
                      </span>
                    </template>
                  </v-tooltip>
                </div>
                <div class="code-line i2">}</div>
                <div class="code-line i1">}</div>
              </template>
            </v-expansion-panel-text>
            <br />
            <br />
            <br />
          </v-expansion-panel>

          <br />
          <br />
          <br />

          <!-- ═══════════════════════════════════════════ -->
          <!-- 2. BACKEND (Java Style)                    -->
          <!-- ═══════════════════════════════════════════ -->
          <v-expansion-panel value="back" class="code-panel">
            <v-expansion-panel-title class="panel-title">
              <template #actions><span></span></template>
              <div class="panel-title-code">
                <span class="fold-icon">{{ isOpen("back") ? "▼" : "▶" }}</span>
                <span class="i1">
                  <span class="kw">private </span>
                  <span class="kw">class </span>
                  <span class="cls">BackEnd </span> {
                </span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="panel-content">
              <template v-if="isOpen('back')">
                <template
                  v-for="section in backEndStacks"
                  :key="section.section"
                >
                  <div class="code-line i2">
                    <span class="cm">// ──── {{ section.section }} ────</span>
                  </div>
                  <div
                    v-for="chip in section.chips"
                    :key="chip.label"
                    class="code-line i2"
                  >
                    <v-tooltip
                      :text="chip.description"
                      location="bottom"
                      open-on-hover
                      open-on-click
                      max-width="420"
                    >
                      <template #activator="{ props }">
                        <span v-bind="props" class="hover-line">
                          <span class="tp">String </span>
                          <span class="vr">{{ chip.label }} </span>
                          = <span class="str">"{{ chip.label }}"</span>;
                          <span class="cm"
                            >// {{ truncate(chip.description) }}</span
                          >
                        </span>
                      </template>
                    </v-tooltip>
                  </div>
                  <div class="code-line empty-line">&nbsp;</div>
                </template>
                <div class="code-line i1">}</div>
              </template>
            </v-expansion-panel-text>
            <br />
            <br />
            <br />
          </v-expansion-panel>

          <!-- ═══════════════════════════════════════════ -->
          <!-- 3. AI STACK (Java Style)                   -->
          <!-- ═══════════════════════════════════════════ -->
          <v-expansion-panel value="ai" class="code-panel">
            <v-expansion-panel-title class="panel-title">
              <template #actions><span></span></template>
              <div class="panel-title-code">
                <span class="fold-icon">{{ isOpen("ai") ? "▼" : "▶" }}</span>
                <span class="i1">
                  <span class="kw">public </span>
                  <span class="kw">class </span>
                  <span class="cls">AIStack </span> {
                </span>
                <br />
                <br />
                <br />
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="panel-content">
              <template v-if="isOpen('ai')">
                <div
                  v-for="item in aiStacks"
                  :key="item.label"
                  class="code-line i2"
                >
                  <v-tooltip
                    :text="item.description"
                    location="bottom"
                    open-on-hover
                    open-on-click
                    max-width="420"
                  >
                    <template #activator="{ props }">
                      <span v-bind="props" class="hover-line">
                        <span class="tp">String </span>
                        <span class="vr">{{ toVarName(item.label) }}</span>
                        = <span class="str">"{{ item.label }}"</span>;
                        <span class="cm"
                          >// {{ truncate(item.description) }}</span
                        >
                      </span>
                    </template>
                  </v-tooltip>
                </div>
                <div class="code-line i1">}</div>
              </template>
            </v-expansion-panel-text>
            <br />
            <br />
            <br />
          </v-expansion-panel>

          <!-- ═══════════════════════════════════════════ -->
          <!-- 4. ETC & CERTIFICATIONS (Java Style)       -->
          <!-- ═══════════════════════════════════════════ -->
          <v-expansion-panel value="etc" class="code-panel">
            <v-expansion-panel-title class="panel-title">
              <template #actions><span></span></template>
              <div class="panel-title-code">
                <span class="fold-icon">{{ isOpen("etc") ? "▼" : "▶" }}</span>
                <span class="i1">
                  <span class="kw">public </span>
                  <span class="kw">class </span>
                  <span class="cls">EtcAndCertifications </span> {
                </span>
                <br />
                <br />
                <br />
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="panel-content">
              <template v-if="isOpen('etc')">
                <div
                  v-for="item in etcStacks"
                  :key="item.label"
                  class="code-line i2"
                >
                  <v-tooltip
                    :text="item.description"
                    location="bottom"
                    open-on-hover
                    open-on-click
                    max-width="420"
                  >
                    <template #activator="{ props }">
                      <span v-bind="props" class="hover-line">
                        <span class="tp">String </span>
                        <span class="vr">{{ toVarName(item.label) }}</span>
                        = <span class="str">"{{ item.label }}"</span>;
                        <span class="cm"
                          >// {{ truncate(item.description) }}</span
                        >
                      </span>
                    </template>
                  </v-tooltip>
                </div>
                <div class="code-line i1">}</div>
              </template>
            </v-expansion-panel-text>
            <br />
            <br />
            <br />
          </v-expansion-panel>

          <!-- ═══════════════════════════════════════════ -->
          <!-- 5. INTRODUCTION & GOALS (Javadoc Style)    -->
          <!-- ═══════════════════════════════════════════ -->
          <br />
          <br />
          <br />
          <v-expansion-panel value="intro" class="code-panel">
            <v-expansion-panel-title class="panel-title">
              <template #actions><span></span></template>
              <div class="panel-title-code">
                <span class="fold-icon">{{ isOpen("intro") ? "▼" : "▶" }}</span>
                <span class="i1">
                  <span class="kw">private </span>
                  <span class="kw">void </span>
                  <span class="fn">introduction</span>() {
                  <span class="cm">// 간략소개, 목표</span>
                </span>
                <br />
                <br />
                <br />
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="panel-content">
              <template v-if="isOpen('intro')">
                <div class="code-line i2">
                  <span class="cm">/*</span>
                </div>
                <div
                  v-for="(line, idx) in introLines"
                  :key="idx"
                  class="code-line i2"
                  style="font-size: 16px"
                >
                  <span class="cm">&nbsp;* {{ line || "&nbsp;" }}</span>
                </div>
                <div class="code-line i2">
                  <span class="cm">&nbsp;*/</span>
                </div>
                <div class="code-line i1">}</div>
              </template>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ═══════════════════════════════════════════ -->
          <!-- 6. AI EVALUATION (Java Style + Cards)      -->
          <!-- ═══════════════════════════════════════════ -->
          <br />
          <br />
          <br />
          <v-expansion-panel value="ai-eval" class="code-panel">
            <v-expansion-panel-title class="panel-title">
              <template #actions><span></span></template>
              <div class="panel-title-code">
                <span class="fold-icon">{{
                  isOpen("ai-eval") ? "▼" : "▶"
                }}</span>
                <span class="i1">
                  <span class="kw">public </span>
                  <span class="kw">static </span>
                  <span class="kw">class </span>
                  <span class="cls">AIEvaluation </span> {
                  <span class="cm">// 2025-09-01 기준</span>
                </span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="panel-content">
              <template v-if="isOpen('ai-eval')">
                <div class="code-line i2">
                  <span class="cm">// AI 모델별 포트폴리오 평가 결과</span>
                </div>
                <v-row class="ai-eval-row">
                  <v-col
                    v-for="aiComment in AIComments"
                    :key="aiComment.id"
                    cols="12"
                    md="4"
                  >
                    <v-card class="ai-card" elevation="0">
                      <v-card-title class="ai-model-title">
                        <span class="cm">/** @model </span>
                        <span class="cls">{{ aiComment.model }}</span>
                        <span class="cm"> */</span>
                      </v-card-title>
                      <v-card-text>
                        <div v-if="aiComment.img" class="text-center mb-3">
                          <v-img
                            :src="aiComment.img"
                            :alt="aiComment.model + ' 평가'"
                            class="ai-screenshot cursor-pointer"
                            contain
                            @click="openImageInNewTab(aiComment.img)"
                          />
                        </div>
                        <div class="ai-comment-text">
                          {{ aiComment.jpComment }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <div class="code-line i1">}</div>
              </template>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- Main Class Closing -->
        <div class="code-line empty-line">&nbsp;</div>
        <div class="code-line">}</div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
/* ============================= */
/*     CODE EDITOR CONTAINER     */
/* ============================= */
.code-editor-container {
  max-width: 1200px;
  margin: 0 auto;
}

.code-editor {
  background: #1e1e2e;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #313244;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  font-family:
    "JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", "Courier New",
    monospace;
  font-size: 13px;
  line-height: 1.7;
}

/* ============================= */
/*          TAB BAR              */
/* ============================= */
.tab-bar {
  display: flex;
  background: #181825;
  border-bottom: 1px solid #313244;
  height: 38px;
  align-items: stretch;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  color: #6c7086;
  border-right: 1px solid #313244;
  cursor: pointer;
  font-size: 12px;
  user-select: none;
  transition: background 0.2s;
}

.tab:hover {
  background: rgba(205, 214, 244, 0.04);
}

.tab.active {
  background: #1e1e2e;
  color: #cdd6f4;
  border-bottom: 2px solid #89b4fa;
}

.tab-icon {
  opacity: 0.8;
}

.tab-close {
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}

.tab:hover .tab-close {
  opacity: 0.5;
}

.tab-filler {
  flex: 1;
  background: #181825;
}

/* ============================= */
/*        BREADCRUMB BAR         */
/* ============================= */
.breadcrumb-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 20px;
  background: #1e1e2e;
  border-bottom: 1px solid #2a2a3c;
  font-size: 11px;
  color: #585b70;
}

.bc-item {
  cursor: pointer;
  transition: color 0.2s;
}

.bc-item:hover,
.bc-item.active {
  color: #cdd6f4;
}

.bc-sep {
  color: #45475a;
}

/* ============================= */
/*       EDITOR CONTENT          */
/* ============================= */
.editor-content {
  padding: 16px 0;
  color: #cdd6f4;
  overflow-x: auto;
}

/* ============================= */
/*         CODE LINES            */
/* ============================= */
.code-line {
  padding: 1px 20px 1px 24px;
  white-space: nowrap;
  min-height: 24px;
  display: flex;
  align-items: center;
  transition: background 0.15s;
}

.code-line:hover {
  background: rgba(205, 214, 244, 0.03);
}

.empty-line {
  min-height: 24px;
}

/* ============================= */
/*        INDENTATION            */
/* ============================= */
.i1 {
  padding-left: calc(24px + 2em) !important;
}
.i2 {
  padding-left: calc(24px + 4em) !important;
}
.i3 {
  padding-left: calc(24px + 6em) !important;
}

/* ============================= */
/*     SYNTAX HIGHLIGHTING       */
/* ============================= */
.kw {
  color: #cba6f7;
}
.tp {
  color: #89dceb;
}
.str {
  color: #a6e3a1;
}
.cm {
  color: #6a9955;
}
.vr {
  color: #89b4fa;
}
.cls {
  color: #f9e2af;
}
.nm {
  color: #fab387;
}
.fn {
  color: #89b4fa;
}

/* ============================= */
/*      HOVERABLE LINES          */
/* ============================= */
.hover-line {
  cursor: pointer;
  border-radius: 4px;
  padding: 2px 6px;
  margin: -2px -6px;
  transition: background 0.2s;
  display: inline-block;
}

.hover-line:hover {
  background: rgba(137, 180, 250, 0.1);
}

/* ============================= */
/*    EXPANSION PANELS RESET     */
/* ============================= */
.code-panels {
  background: transparent !important;
  gap: 0 !important;
}

:deep(.code-panel) {
  background: transparent !important;
  color: #cdd6f4 !important;
  margin: 0 !important;
  border-radius: 0 !important;
}

:deep(.code-panel::after) {
  display: none !important;
}

:deep(.code-panel .v-expansion-panel__shadow) {
  display: none !important;
}

:deep(
  .v-expansion-panels--variant-default
    > .v-expansion-panel:not(:first-child)::after
) {
  display: none !important;
}

/* Panel Title */
:deep(.panel-title) {
  padding: 0 !important;
  min-height: 0 !important;
  background: transparent !important;
  color: #cdd6f4 !important;
}

:deep(.panel-title:hover) {
  background: rgba(205, 214, 244, 0.03) !important;
}

:deep(.v-expansion-panel-title__overlay) {
  display: none !important;
}

.panel-title-code {
  display: flex;
  align-items: center;
  font-family: inherit;
  width: 100%;
  padding: 1px 20px 1px 24px;
  min-height: 24px;
  white-space: nowrap;
}

/* Fold Icon */
.fold-icon {
  color: #585b70;
  font-size: 10px;
  margin-right: 8px;
  transition: color 0.2s;
  user-select: none;
  flex-shrink: 0;
  width: 12px;
  text-align: center;
}

.panel-title:hover .fold-icon {
  color: #cdd6f4;
}

/* Panel Content */
:deep(.panel-content .v-expansion-panel-text__wrapper) {
  padding: 0 !important;
}

/* ============================= */
/*    AI EVALUATION SECTION      */
/* ============================= */
.ai-eval-row {
  padding: 12px 0;
  margin-left: 3em !important;
  margin-right: 1em !important;
}

.ai-card {
  background: #181825 !important;
  border: 1px solid #313244 !important;
  border-radius: 8px !important;
  height: 100%;
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.ai-card:hover {
  border-color: #45475a !important;
  transform: translateY(-2px);
}

.ai-model-title {
  font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;
  font-size: 13px !important;
  padding: 14px 16px 8px !important;
  line-height: 1.4;
}

.ai-screenshot {
  max-height: 400px;
  border-radius: 6px;
  border: 1px solid #313244;
}

.ai-comment-text {
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-line;
  color: #a6adc8;
  font-family: "JetBrains Mono", "Fira Code", "Consolas", monospace;
}

/* ============================= */
/*        RESPONSIVE             */
/* ============================= */
@media (max-width: 768px) {
  .code-editor {
    font-size: 11px;
    border-radius: 8px;
  }

  .code-line {
    padding-left: 12px;
    padding-right: 12px;
  }

  .panel-title-code {
    padding-left: 12px;
    padding-right: 12px;
  }

  .i1 {
    padding-left: calc(12px + 1.5em) !important;
  }
  .i2 {
    padding-left: calc(12px + 3em) !important;
  }
  .i3 {
    padding-left: calc(12px + 4.5em) !important;
  }

  .ai-eval-row {
    margin-left: 1em !important;
    margin-right: 0 !important;
  }
}

/* ============================= */
/*        SCROLLBAR              */
/* ============================= */
.editor-content::-webkit-scrollbar {
  height: 8px;
}

.editor-content::-webkit-scrollbar-track {
  background: #181825;
}

.editor-content::-webkit-scrollbar-thumb {
  background: #45475a;
  border-radius: 4px;
}

.editor-content::-webkit-scrollbar-thumb:hover {
  background: #585b70;
}
</style>

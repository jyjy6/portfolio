<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  useMenuStore,
  LEVEL_INFO,
  type ProjectLevel,
} from "../store/menuStore";

const menuStore = useMenuStore();
const router = useRouter();

// 아코디언 패널 상태 (기본적으로 'current' 레벨만 열림)
const openPanels = ref<number[]>([2]); // current는 index 2

// 레벨별로 프로젝트 그룹화
const projectsByLevel = computed(() => {
  const levels: ProjectLevel[] = ["beginner", "intermediate", "current"];

  return levels.map((level) => ({
    level,
    info: LEVEL_INFO[level],
    projects: menuStore.menuItems.filter((item) => item.level === level),
  }));
});

// 일반 메뉴 아이템 (level이 없는 항목들)
const generalMenuItems = computed(() => {
  return menuStore.menuItems.filter((item) => !item.level);
});

const navigateTo = (route?: string) => {
  if (!route || route.trim() === "") {
    console.warn("유효하지 않은 경로입니다.");
    return;
  }

  if (route.startsWith("https") || route.startsWith("http")) {
    window.open(route, "_blank");
    return;
  }

  router.push(route);
  window.scrollTo(0, 0);
};

// 프로젝트가 유효한 경로를 가지고 있는지 확인
const hasValidRoute = (project: any) => {
  const route = project.route || project.link;
  return route && route.trim() !== "";
};

// 애니메이션 효과
onMounted(() => {
  const mainTitle = document.querySelector(".main-title");
  const subTitle = document.querySelector(".sub-title");
  const divider = document.querySelector(".divider");

  if (mainTitle) mainTitle.classList.add("animate-in");

  setTimeout(() => {
    if (subTitle) subTitle.classList.add("animate-in");
  }, 300);

  setTimeout(() => {
    if (divider) divider.classList.add("animate-in");
  }, 600);

  // 패널 래퍼 순차적 애니메이션
  const panelWrappers = document.querySelectorAll(".panel-wrapper");
  panelWrappers.forEach((wrapper, index) => {
    setTimeout(() => {
      wrapper.classList.add("panel-visible");
    }, 900 + index * 150);
  });
});
</script>

<template>
  <v-main
    class="d-flex flex-column justify-center"
    style="min-height: 100vh; padding: 24px 0"
  >
    <v-container>
      <!-- 헤더 섹션 -->
      <div class="text-center mb-8">
        <h1 class="main-title">I'm Jung Juneyoung</h1>
        <p class="sub-title">FullStack WebProgrammer</p>
        <hr class="divider" />
      </div>

      <!-- 일반 메뉴 (Home, About, Contact) -->
      <div class="general-menu-container mb-6">
        <v-btn
          v-for="item in generalMenuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :to="item.route"
          variant="outlined"
          rounded="lg"
          class="mx-2 general-menu-btn"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <!-- 프로젝트 레벨별 아코디언 -->
      <v-expansion-panels
        v-model="openPanels"
        multiple
        variant="accordion"
        class="project-panels"
      >
        <div
          v-for="(levelGroup, index) in projectsByLevel"
          :key="levelGroup.level"
          class="panel-wrapper mb-3"
        >
          <v-expansion-panel :value="index" elevation="3" rounded="lg">
            <v-expansion-panel-title>
              <template v-slot:default>
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    gap: 12px;
                  "
                >
                  <div style="display: block; width: 100%">
                    <v-chip
                      :color="levelGroup.info.color"
                      variant="flat"
                      size="small"
                      class="level-chip"
                    >
                      {{ levelGroup.info.label }}
                    </v-chip>
                  </div>
                  <div style="display: block; width: 100%">
                    <span style="font-size: 18px; font-weight: 600">
                      {{ levelGroup.level.toUpperCase() }} PROJECTS
                    </span>
                  </div>
                  <div style="display: block; width: 100%">
                    <v-chip variant="text" size="small">
                      {{ levelGroup.projects.length }} 개의 프로젝트
                    </v-chip>
                  </div>
                </div>
              </template>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-row class="mt-2">
                <v-col
                  v-for="project in levelGroup.projects"
                  :key="project.title"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card
                    :ripple="hasValidRoute(project)"
                    :hover="hasValidRoute(project)"
                    :class="[
                      'project-card',
                      { 'project-card--disabled': !hasValidRoute(project) },
                    ]"
                    elevation="2"
                    rounded="lg"
                    @click="
                      hasValidRoute(project) &&
                        navigateTo(project.route || project.link)
                    "
                  >
                    <v-card-text class="text-center pa-4">
                      <div class="badge-wrapper mb-3">
                        <v-avatar
                          :color="levelGroup.info.color"
                          size="64"
                          class="project-icon"
                        >
                          <v-icon size="32" color="white">
                            {{ project.icon }}
                          </v-icon>
                        </v-avatar>
                        <span v-if="project.recommended" class="menu-badge">
                          NEW
                        </span>
                      </div>
                      <div class="project-title">
                        {{ project.title }}
                      </div>
                      <v-icon
                        v-if="project.link"
                        size="16"
                        class="mt-2 external-link-icon"
                      >
                        mdi-open-in-new
                      </v-icon>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </div>
      </v-expansion-panels>

      <!-- 미니 게임 섹션 -->
      <div class="mini-games-section mt-8 text-center">
        <v-divider class="mb-4"></v-divider>
        <p class="text-caption mb-3">미니 게임</p>
        <div class="d-flex justify-center gap-2">
          <v-btn
            href="/sadari"
            variant="tonal"
            size="small"
            prepend-icon="mdi-ladder"
            rounded="lg"
          >
            사다리게임
          </v-btn>
          <v-btn
            href="/timer"
            variant="tonal"
            size="small"
            prepend-icon="mdi-timer"
            rounded="lg"
          >
            타이머
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

/* 헤더 스타일 */
.main-title {
  font-family: "Poppins", sans-serif;
  font-size: 48px;
  font-weight: 700;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sub-title {
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 400;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  color: rgba(255, 255, 255, 0.7);
}

.divider {
  width: 80%;
  max-width: 400px;
  margin: 24px auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: scaleX(0);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

/* 일반 메뉴 버튼 */
.general-menu-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.general-menu-btn {
  text-transform: none;
  font-weight: 600;
}

/* 프로젝트 패널 */
.project-panels {
  max-width: 1200px;
  margin: 0 auto;
}

/* 패널 래퍼 - 애니메이션 적용 */
.panel-wrapper {
  width: 80%;
  opacity: 0;
}

/* 패널 페이드인 애니메이션 (한 번만 실행) */
@keyframes panelFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-wrapper.panel-visible {
  animation: panelFadeIn 0.6s ease forwards;
}

/* 패널 자체 스타일 */
.panel-wrapper :deep(.v-expansion-panel) {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.panel-wrapper :deep(.v-expansion-panel-title) {
  padding: 20px 24px;
  font-weight: 600;
  display: block !important;
  min-height: auto !important;
}

.panel-wrapper :deep(.v-expansion-panel-title__overlay) {
  display: none;
}

/* Vuetify 내부 wrapper 강제 변경 */
.panel-wrapper
  :deep(.v-expansion-panel-title > .v-expansion-panel-title__content) {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  gap: 12px !important;
}

.panel-wrapper :deep(.v-expansion-panel-title .v-expansion-panel-title__icon) {
  margin-left: 0 !important;
  margin-top: 0 !important;
  position: absolute !important;
  right: 16px !important;
  top: 20px !important;
}

.title-content {
  width: 100%;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 8px;
}

.title-content > div {
  display: block !important;
  width: 100%;
}

.title-content .text-h6 {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.level-chip {
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.5px;
  padding: 6px 12px !important;
  height: auto !important;
}

/* 프로젝트 카드 */
.project-card {
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.project-card--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.project-card--disabled:hover {
  transform: none;
  box-shadow: none;
  border-color: rgba(255, 255, 255, 0.1);
}

.project-icon {
  transition: transform 0.3s ease;
}

.project-card:hover .project-icon {
  transform: scale(1.1) rotate(5deg);
}

.project-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
}

.external-link-icon {
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.project-card:hover .external-link-icon {
  color: rgba(255, 255, 255, 0.8);
}

/* 배지 스타일 */
.badge-wrapper {
  position: relative;
  display: inline-block;
}

.menu-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(45deg, #ff5f6d, #ffc371);
  color: #000;
  font-weight: 700;
  font-size: 9px;
  padding: 3px 6px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(255, 95, 109, 0.4);
  transform: rotate(12deg);
  letter-spacing: 0.5px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: rotate(12deg) scale(1);
  }
  50% {
    transform: rotate(12deg) scale(1.05);
  }
}

/* 미니 게임 섹션 */
.mini-games-section {
  opacity: 0.8;
}

/* 애니메이션 */
.main-title.animate-in,
.sub-title.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.divider.animate-in {
  opacity: 1 !important;
  transform: scaleX(1) !important;
}

/* 반응형 디자인 */
@media (max-width: 960px) {
  .main-title {
    font-size: 36px;
  }

  .sub-title {
    font-size: 16px;
  }
}

@media (max-width: 600px) {
  .main-title {
    font-size: 28px;
  }

  .sub-title {
    font-size: 14px;
  }

  .level-panel:deep(.v-expansion-panel-title) {
    padding: 16px;
  }

  .project-title {
    font-size: 13px;
    min-height: 36px;
  }

  .general-menu-btn {
    font-size: 12px;
  }
}

/* 다크모드 최적화 */
:deep(.v-expansion-panel-title) {
  color: rgba(255, 255, 255, 0.9);
}

:deep(.v-expansion-panel-text) {
  background: rgba(0, 0, 0, 0.2);
}

:deep(.v-chip) {
  font-weight: 700;
}
</style>

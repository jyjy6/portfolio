<script setup lang="ts">
  import { useMenuStore } from './store/menuStore';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const menuStore = useMenuStore();
  const drawer = ref(false);
  const router = useRouter();

  const navigateTo = (route: string) => {
    if (route.startsWith('https')) {
      window.open(route, '_blank');
      return;
    }
    router.push(route);
    window.scrollTo(0, 0);
  };
</script>

<template>
  <v-app>
    <v-app-bar color="black" class="text-white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      color="black"
      class="text-white"
      width="120"
    >
      <v-list dense>
        <v-list-item class="d-flex justify-center">
          <v-avatar size="88" class="mx-auto my-4">
            <v-img
              src="https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/images/4942.jpg"
              alt="Profile"
            />
          </v-avatar>
        </v-list-item>

        <v-divider color="white" class="mb-4"></v-divider>

        <v-list-item
          v-for="item in menuStore.menuItems"
          :key="item.title"
          class="text-center"
        >
          <div class="badge-wrapper">
            <v-btn
              v-if="item.route"
              icon
              class="text-white"
              @click="navigateTo(item.route!)"
              variant="text"
            >
              <v-icon size="28">{{ item.icon }}</v-icon>
            </v-btn>
            <v-btn
              v-else
              icon
              class="text-white"
              :href="item.link"
              target="_blank"
              variant="text"
            >
              <v-icon size="28">{{ item.icon }}</v-icon>
            </v-btn>
            <span v-if="item.recommended" class="menu-badge">NEW</span>
          </div>
          <div style="font-size: 12px">{{ item.title }}</div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  /* 전역 스타일 - 모든 페이지에 적용됩니다 */
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: black;
  }

  /* Vuetify의 기본 스타일을 재정의합니다 */
  .v-application {
    background-color: black !important;
  }

  .v-main {
    background-color: black !important;
  }

  .badge-wrapper {
    position: relative;
    display: inline-block;
  }

  .menu-badge {
    position: absolute;
    top: 3px;
    right: -6px;
    background: linear-gradient(45deg, #ff5f6d, #ffc371);
    color: #000;
    font-weight: 700;
    font-size: 9px;
    padding: 2px 4px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    transform: rotate(10deg);
    letter-spacing: 0.5px;
  }
</style>

<script setup lang="ts">
  import { useMenuStore } from './store/menuStore';

  const menuStore = useMenuStore();
</script>

<template>
  <v-app>
    <v-navigation-drawer app permanent color="black" class="text-white" width="120">
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

        <v-list-item v-for="item in menuStore.menuItems" :key="item.title" class="text-center">
          <v-btn icon class="text-white" :to="item.route" variant="text">
            <v-icon size="28">{{ item.icon }}</v-icon>
          </v-btn>
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
</style>

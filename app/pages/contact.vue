<script setup lang="ts">
  import { useTheme } from 'vuetify';
  const theme = useTheme();
  theme.global.name.value = 'dark';
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" class="d-flex align-center">
        <v-card class="pa-4 elevation-10 mx-auto" max-width="400">
          <v-card-title class="text-h4 text-center">
            <v-icon
              icon="mdi-email-outline"
              size="x-large"
              class="mr-2"
            ></v-icon>
            Contact Me
          </v-card-title>
          <v-card-text class="text-center">
            <p class="text-subtitle-1">
              <v-icon start icon="mdi-at" class="mr-2"></v-icon>
              jungjuneyoung6@gmail.com
            </p>
            <p class="text-subtitle-1 mt-4">
              <v-icon start icon="mdi-github" class="mr-2"></v-icon>
              <a
                href="https://github.com/jyjy6"
                target="_blank"
                class="github-link"
                >jyjy6</a
              >
            </p>
            <p class="text-subtitle-1 mt-4">
              <span>KakaoTalk</span>
              <v-icon start icon="mdi-chat" class="mr-2"></v-icon>
              <span>jungjy46</span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .v-card {
    border-radius: 20px;
    background: linear-gradient(45deg, #1e1e1e, #2d2d2d);
    backdrop-filter: blur(10px);
  }

  .v-btn {
    text-transform: none;
    transition: all 0.3s ease;
  }

  .v-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .v-card-title {
    color: #4caf50;
  }

  .v-icon {
    font-size: 24px !important;
  }

  .text-subtitle-1 {
    color: #9e9e9e;
  }

  .github-link {
    color: #9e9e9e;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .github-link:hover {
    color: #4caf50;
  }

  .v-card-text {
    padding: 24px !important;
  }

  .v-card-title {
    padding: 32px 24px !important;
  }
</style>

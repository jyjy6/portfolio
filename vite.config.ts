import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // vuetify 플러그인 추가
  ],
  server: {
    port: 5174, // 여기를 원하는 포트로 바꿔주면 됩니다!
  },
});

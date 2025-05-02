import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify'; // Vuetify 가져오기
import 'vuetify/_styles.scss';
import '@mdi/font/css/materialdesignicons.css'; // 아이콘도
import { createPinia } from 'pinia';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark', // 기본 테마를 다크로 설정
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          // 필요한 경우 다른 색상도 커스터마이징 가능
        },
      },
    },
  },
});

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app');

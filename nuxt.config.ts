import dotenv from "dotenv";

const isDev = process.env.NODE_ENV === "development";
const envFile = isDev ? ".env.development" : ".env.production";

dotenv.config({ path: envFile });

export default defineNuxtConfig({
  runtimeConfig: {
    // public 객체 안의 변수들은 클라이언트 측에도 노출됩니다.
    public: {
      NUXT_PUBLIC_API_URL: process.env.NUXT_PUBLIC_API_URL,
    },
    NUXT_API_KEY: process.env.NUXT_API_KEY,
    // 참고: 서버 측에서만 사용할 변수는 여기에 바로 정의합니다.
    // apiSecret: process.env.NUXT_API_SECRET,
  },
  modules: ["@pinia/nuxt", "vuetify-nuxt-module"],
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: "dark",
      },
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
            process.env.NUXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-7521928538284970"
          }`,
          async: true,
          crossorigin: "anonymous",
          defer: true,
        } as any,
      ],
    },
  },
});

import { translationConfig } from "~/utils/translationUtil";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  translationConfig.value.apiKey = config.NUXT_API_KEY as string;
});

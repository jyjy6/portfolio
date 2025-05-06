<script setup lang="ts">
  import { useMenuStore } from '../store/menuStore';

  const menuStore = useMenuStore();
</script>
<template>
  <v-main
    class="d-flex flex-column justify-center"
    style="color: white; background-color: black; min-height: 100vh; min-width: 100vh"
  >
    <div class="text-center">
      <h1 style="font-family: 'Poppins', sans-serif; font-size: 40px">I'm Jung Juneyoung 수정됐나확인용</h1>
      <p style="font-family: 'Poppins', sans-serif">FullStack WebProgrammer</p>
      <hr style="width: 500px; margin: 16px auto; border: 1px solid white" />

      <!-- 여기에 flex 컨테이너 추가 -->
      <div style="display: flex; justify-content: center; gap: 24px; margin-top: 20px">
        <v-list-item
          v-for="item in menuStore.menuItems.slice(1)"
          :key="item.title"
          class="text-center"
          style="flex-direction: column; align-items: center"
        >
          <v-btn icon class="text-white" :to="item.route" variant="text">
            <v-icon size="28">{{ item.icon }}</v-icon>
          </v-btn>
          <div style="font-size: 12px">{{ item.title }}</div>
        </v-list-item>
      </div>
    </div>

    <img src="" style="max-width: 400px; margin: 0 auto" />
  </v-main>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
</style>

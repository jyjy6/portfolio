<script setup lang="ts">
  import { useMenuStore } from '../store/menuStore';

  const menuStore = useMenuStore();
</script>
<template>
  <v-main
    class="d-flex flex-column justify-center"
    style="color: white; background-color: black; min-height: 100vh;"
  >
    <div class="text-center px-4">
      <h1 class="main-title">I'm Jung Juneyoung</h1>
      <p class="sub-title">FullStack WebProgrammer</p>
      <hr class="divider" />

      <!-- 메뉴 아이템 플렉스 컨테이너 -->
      <div class="menu-container">
        <v-list-item
          v-for="item in menuStore.menuItems.slice(1)"
          :key="item.title"
          class="text-center menu-item"
        >
          <v-btn icon class="text-white" :to="item.route" variant="text">
            <v-icon size="28">{{ item.icon }}</v-icon>
          </v-btn>
          <div class="menu-title">{{ item.title }}</div>
        </v-list-item>
      </div>
    </div>

    <img src="" style="max-width: 100%; margin: 0 auto" />
  </v-main>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
  
  .main-title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
  }
  
  .sub-title {
    font-family: 'Poppins', sans-serif;  
  }
  
  .divider {
    width: 80%;
    max-width: 500px;
    margin: 16px auto;
    border: 1px solid white;
  }
  
  .menu-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 20px;
  }
  
  .menu-item {
    flex-direction: column;
    align-items: center;
  }
  
  .menu-title {
    font-size: 12px;
  }
  
  /* 모바일 화면에 대한 반응형 스타일 */
  @media (max-width: 600px) {
    .main-title {
      font-size: 32px;
    }
    
    .menu-container {
      gap: 16px;
    }
  }
</style>
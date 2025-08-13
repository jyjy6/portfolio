<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useMenuStore } from '../store/menuStore';
  import { onMounted } from 'vue';

  const menuStore = useMenuStore();

  onMounted(() => {
    // 타이틀에 애니메이션 적용
    const mainTitle = document.querySelector('.main-title');
    const subTitle = document.querySelector('.sub-title');
    const divider = document.querySelector('.divider');
    const menuItems = document.querySelectorAll('.menu-item');

    // 타이틀 애니메이션
    if (mainTitle) {
      mainTitle.classList.add('animate-in');
    }

    // 서브타이틀 애니메이션 (0.3초 후)
    setTimeout(() => {
      if (subTitle) {
        subTitle.classList.add('animate-in');
      }
    }, 300);

    // 구분선 애니메이션 (0.6초 후)
    setTimeout(() => {
      if (divider) {
        divider.classList.add('animate-in');
      }
    }, 600);

    // 메뉴 아이템 애니메이션 (각각 0.1초 간격으로)
    menuItems.forEach((item, index) => {
      setTimeout(
        () => {
          item.classList.add('animate-in');
        },
        900 + index * 100
      );
    });
  });

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
  <v-main
    class="d-flex flex-column justify-center"
    style="color: white; background-color: black; min-height: 100vh"
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
          <div class="menu-title">{{ item.title }}</div>
        </v-list-item>
      </div>
    </div>
    <v-container class="d-flex justify-end">
      <v-list-item>
        <v-btn href="/sadari">
          <v-icon>mdi-ladder</v-icon>
          <div class="menu-title">사다리게임</div>
        </v-btn>
        <v-btn href="/timer">
          <v-icon>mdi-timer</v-icon>
          <div class="menu-title">타이머</div>
        </v-btn>
      </v-list-item>
    </v-container>
    <img src="" style="max-width: 100%; margin: 0 auto" />
  </v-main>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

  .main-title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .sub-title {
    font-family: 'Poppins', sans-serif;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .divider {
    width: 80%;
    max-width: 500px;
    margin: 16px auto;
    border: 1px solid white;
    opacity: 0;
    transform: scaleX(0);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
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
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .menu-title {
    font-size: 12px;
    transition: color 0.3s ease;
  }

  /* 버튼 호버 효과 */
  .btn-hover {
    transition: transform 0.3s ease;
  }

  .btn-hover:hover {
    transform: translateY(-5px);
  }

  /* 메뉴 아이템 호버 효과 */
  .menu-item:hover .menu-title {
    color: #42b883; /* Vue.js 색상 적용 */
  }

  /* 애니메이션 인 효과 클래스 */
  .animate-in {
    opacity: 1;
    transform: translateY(0) scaleX(1);
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

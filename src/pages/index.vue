<script setup lang="ts">
  import { useMenuStore } from '../store/menuStore';
  import { onMounted } from 'vue';

  const menuStore = useMenuStore();

  onMounted(() => {
    createParticles();
  });

  function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
    }

    Particle.prototype.update = function() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    };

    Particle.prototype.draw = function() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
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
          v-for="(item, index) in menuStore.menuItems.slice(1)"
          :key="item.title"
          class="text-center menu-item"
          :class="{ 'fade-in': true, 'delay-1': index === 0, 'delay-2': index === 1, 'delay-3': index === 2 }"
        >
          <v-btn 
            icon 
            class="text-white menu-btn"
            :to="item.route" 
            variant="text"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
          >
            <v-icon size="28">{{ item.icon }}</v-icon>
          </v-btn>
          <div class="menu-title">{{ item.title }}</div>
        </v-list-item>
      </div>
    </div>

    <!-- Floating particles animation -->
    <div class="particles-container"></div>
  </v-main>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
  
  .main-title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    animation: fadeInUp 1s ease-out;
  }
  
  .sub-title {
    font-family: 'Poppins', sans-serif;
    animation: fadeInUp 1s ease-out 0.2s;
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
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease-out;
  }
  
  .menu-item.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .delay-1 { animation-delay: 0.6s; }
  .delay-2 { animation-delay: 0.8s; }
  .delay-3 { animation-delay: 1s; }
  
  .menu-btn {
    transition: transform 0.3s ease;
  }
  
  .menu-btn:hover {
    transform: scale(1.1);
  }
  
  .menu-title {
    font-size: 12px;
    margin-top: 8px;
  }
  
  /* Particles animation */
  .particles-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-card max-width="400" class="mx-auto pa-5" elevation="8">
        <v-card-title class="text-h4">운동 타이머</v-card-title>
        <v-divider class="my-4"></v-divider>
        <v-text-field
          label="시간 설정 (초)"
          v-model.number="userInputTime"
          type="number"
          :disabled="isActive"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          label="휴식시간 설정 (초)"
          v-model.number="userInputRestTime"
          type="number"
          :disabled="isActive"
          class="mb-4"
        ></v-text-field>
        <div class="text-h1 font-weight-bold my-10" :class="timerColor">
          {{ formattedTime }}
        </div>
        <v-chip :color="currentIntervalChipColor" class="mb-5">
          {{ currentIntervalName }}
        </v-chip>
        <v-chip color="red" class="mb-5"> 현재 {{ counter }}라운드 </v-chip>
        <v-card-actions class="justify-space-around">
          <v-btn
            @click="startTimer"
            :disabled="isActive"
            color="primary"
            size="large"
          >
            <v-icon left>mdi-play</v-icon>
            시작
          </v-btn>
          <v-btn
            @click="pauseTimer"
            :disabled="!isActive"
            color="warning"
            size="large"
          >
            <v-icon left>mdi-pause</v-icon>
            일시정지
          </v-btn>
          <v-btn @click="resetTimer" color="error" size="large">
            <v-icon left>mdi-restart</v-icon>
            초기화
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

  // --- 상태 변수 ---
  const userInputTime = ref(180);
  const userInputRestTime = ref(50);
  const intervals = ref([userInputTime.value, userInputRestTime.value]); // 운동, 휴식 시간
  const intervalNames = ['운동', '휴식'];
  const currentIntervalIndex = ref(0);
  const totalSeconds = ref(intervals.value[currentIntervalIndex.value]);
  const isActive = ref(false);
  const timerId = ref<any>(null);
  const counter = ref(1);

  watch(userInputRestTime, (newRestTime) => {
    if (newRestTime !== null && newRestTime > 0) {
      intervals.value[1] = newRestTime;
      // 타이머가 비활성 상태일 때만 시간을 리셋
      if (!isActive.value) {
        resetTimer();
      }
    }
  });

  watch(userInputTime, (newTime) => {
    if (newTime !== null && newTime > 0) {
      intervals.value[0] = newTime;
      // 타이머가 비활성 상태일 때만 시간을 리셋
      if (!isActive.value) {
        resetTimer();
      }
    }
  });

  let beepSound: HTMLAudioElement | null = null;

  // --- 생명주기 훅 ---
  onMounted(() => {
    // 브라우저 환경에서만 Audio 객체 생성
    if (typeof window !== 'undefined') {
      // 삐~ 소리 생성 (440Hz, 0.5초)
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440Hz (A4 음)
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);

      // Audio 객체도 유지 (기존 코드 호환성)
      beepSound = new Audio('');
      beepSound.load(); // 미리 로드
    }
  });

  onUnmounted(() => {
    // 컴포넌트 파괴 시 타이머 정리
    if (timerId.value) {
      clearInterval(timerId.value);
    }
  });

  // --- 계산된 속성 ---
  const formattedTime = computed(() => {
    const minutes = Math.floor(totalSeconds.value / 60);
    const seconds = totalSeconds.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  });

  const currentIntervalName = computed(() => {
    return intervalNames[currentIntervalIndex.value];
  });

  const timerColor = computed(() => {
    if (isActive.value && totalSeconds.value <= 3 && totalSeconds.value > 0) {
      return 'text-red-darken-2';
    }
    return 'text-grey-darken-3';
  });

  const currentIntervalChipColor = computed(() => {
    return currentIntervalIndex.value % 2 === 0 ? 'success' : 'info';
  });

  // --- 메소드 ---
  const playBeep = () => {
    if (typeof window !== 'undefined') {
      try {
        // 삐~ 소리 생성 (440Hz, 0.5초)
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440Hz (A4 음)
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.5
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        console.error('소리 재생 오류:', e);
      }
    }
  };

  const tick = () => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
      // 마지막 3초에 소리 재생
      if (totalSeconds.value < 3 && totalSeconds.value >= 0) {
        playBeep();
      }
    } else {
      // 다음 인터벌로 이동
      currentIntervalIndex.value =
        (currentIntervalIndex.value + 1) % intervals.value.length;
      totalSeconds.value = intervals.value[currentIntervalIndex.value];
      playBeep(); // 인터벌 변경 시 알림
      if (currentIntervalName.value === '운동') {
        counter.value++;
      }
    }
  };

  const startTimer = () => {
    if (!isActive.value) {
      // 시작 시 사용자 입력 값으로 타이머 설정
      intervals.value[0] = userInputTime.value;
      totalSeconds.value = intervals.value[currentIntervalIndex.value];

      isActive.value = true;
      // 즉시 1회 실행 후 setInterval 설정
      tick();
      timerId.value = setInterval(tick, 1000);
    }
  };

  const pauseTimer = () => {
    isActive.value = false;
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  const resetTimer = () => {
    pauseTimer();
    currentIntervalIndex.value = 0;
    intervals.value[0] = userInputTime.value; // 리셋 시 사용자 입력 값으로 재설정
    totalSeconds.value = intervals.value[currentIntervalIndex.value];
  };
</script>

<style scoped>
  .text-h1 {
    font-size: 6rem !important;
    line-height: 1;
    letter-spacing: -0.05em;
  }
</style>

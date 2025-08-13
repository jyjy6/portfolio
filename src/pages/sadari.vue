<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

  type Rung = {
    leftColumnIndex: number; // connects leftColumnIndex and leftColumnIndex + 1
    y: number; // 0..1 relative height
  };

  const minColumns = 2;
  const sliderMaxDefault = 10;

  const numColumns = ref<number>(4);
  const sliderMax = ref<number>(sliderMaxDefault);
  const topLabels = ref<string[]>([]);
  const bottomLabels = ref<string[]>([]);
  const rungs = ref<Rung[]>([]);

  const canvasWidth = ref<number>(900);
  const canvasHeight = ref<number>(520);

  const dialog = ref<boolean>(false);

  const columnSpacing = computed(
    () => (canvasWidth.value - 80) / (numColumns.value - 1)
  );
  const topOffsetY = 40;
  const bottomOffsetY = 40;
  const verticalTop = computed(() => topOffsetY + 40);
  const verticalBottom = computed(
    () => canvasHeight.value - bottomOffsetY - 40
  );

  function ensureArrayLength(
    arr: string[],
    length: number,
    fillerPrefix: string
  ): string[] {
    const copy = arr.slice(0, length);
    while (copy.length < length) copy.push(`${fillerPrefix}${copy.length + 1}`);
    return copy;
  }

  function normalizeLabels() {
    topLabels.value = ensureArrayLength(
      topLabels.value,
      numColumns.value,
      'TOP-'
    );
    bottomLabels.value = ensureArrayLength(
      bottomLabels.value,
      numColumns.value,
      'BOT-'
    );
  }

  watch(numColumns, () => {
    if (numColumns.value < minColumns) numColumns.value = minColumns;
    if (numColumns.value > Math.max(sliderMax.value, minColumns)) {
      numColumns.value = Math.max(sliderMax.value, minColumns);
    }
    normalizeLabels();
    rungs.value = rungs.value.filter(
      (r) => r.leftColumnIndex < numColumns.value - 1
    );
  });

  watch(sliderMax, () => {
    if (sliderMax.value < minColumns) sliderMax.value = minColumns;
    if (numColumns.value > sliderMax.value) numColumns.value = sliderMax.value;
  });

  onMounted(() => {
    normalizeLabels();
  });

  function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  function canPlaceRung(leftColumnIndex: number, y: number): boolean {
    const minGapY = 0.05;
    for (const r of rungs.value) {
      if (r.leftColumnIndex === leftColumnIndex && Math.abs(r.y - y) < minGapY)
        return false;
      if (
        Math.abs(r.leftColumnIndex - leftColumnIndex) === 1 &&
        Math.abs(r.y - y) < minGapY
      )
        return false;
    }
    return true;
  }

  function addRandomRung() {
    if (numColumns.value < 2) return;
    cancelAnimation();
    for (let attempt = 0; attempt < 100; attempt++) {
      const left = Math.floor(Math.random() * (numColumns.value - 1));
      const y = randomFloat(0.06, 0.94);
      if (canPlaceRung(left, y)) {
        rungs.value.push({ leftColumnIndex: left, y });
        rungs.value.sort((a, b) => a.y - b.y);
        return;
      }
    }
  }

  // 사용하지 않는 이전 함수 (라벨 클릭으로 가로줄 추가하던 기능)는 제거했습니다.

  function generateFullLadder() {
    cancelAnimation();
    rungs.value = [];
    const layers = Math.max(numColumns.value + 1, 6);
    for (let layer = 0; layer < layers; layer++) {
      const used: number[] = [];
      let x = 0;
      const y = (layer + 1) / (layers + 1);
      while (x < numColumns.value - 1) {
        if (Math.random() < 0.55) {
          if (canPlaceRung(x, y)) {
            rungs.value.push({ leftColumnIndex: x, y });
            used.push(x);
            x += 2;
            continue;
          }
        }
        x += 1;
      }
    }
    rungs.value.sort((a, b) => a.y - b.y);
  }

  function resetLadder() {
    cancelAnimation();
    rungs.value = [];
    // 경로 관련 상태도 초기화
    activeStartIndex.value = null;
    pathSegments.value = [];
    totalPathLength.value = 0;
    animatedDistance.value = 0;
    persistedPaths.value = [];
  }

  type Mapping = {
    fromIndex: number;
    toIndex: number;
    fromLabel: string;
    toLabel: string;
  };

  const results = computed<Mapping[]>(() => {
    const sorted = [...rungs.value].sort((a, b) => a.y - b.y);
    const out: Mapping[] = [];
    for (let start = 0; start < numColumns.value; start++) {
      let col = start;
      for (const r of sorted) {
        if (r.leftColumnIndex === col) {
          col = col + 1;
        } else if (r.leftColumnIndex === col - 1) {
          col = col - 1;
        }
      }
      out.push({
        fromIndex: start,
        toIndex: col,
        fromLabel: topLabels.value[start] ?? `TOP-${start + 1}`,
        toLabel: bottomLabels.value[col] ?? `BOT-${col + 1}`,
      });
    }
    return out;
  });

  function openResultDialog() {
    dialog.value = true;
  }

  const svgViewBox = computed(
    () => `0 0 ${canvasWidth.value} ${canvasHeight.value}`
  );

  function columnX(i: number): number {
    return 40 + i * columnSpacing.value;
  }

  function rungY(y: number): number {
    return verticalTop.value + y * (verticalBottom.value - verticalTop.value);
  }

  // ===== 경로 애니메이션 하이라이트 =====
  type Segment = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    length: number;
  };

  const activeStartIndex = ref<number | null>(null);
  const pathSegments = ref<Segment[]>([]);
  const totalPathLength = ref<number>(0);
  const animatedDistance = ref<number>(0);
  const animationSpeedPxPerSec = 960; // px/sec (2배 속도)
  let rafId: number | null = null;
  let lastTimestamp = 0;

  // 색상 팔레트 및 매핑
  const colorPalette = [
    '#FFEB3B', // 노랑 (TOP-1)
    '#FF5252', // 빨강 (TOP-2)
    '#7C4DFF', // 보라
    '#00E5FF', // 시안
    '#69F0AE', // 연두
    '#FFAB40', // 주황
    '#BDBDBD', // 회색
    '#E040FB', // 핑크 보라
    '#00C853', // 초록
    '#FFD600', // 노랑 변형
  ];
  function getColorForIndex(i: number): string {
    if (i < 0) return '#FFEB3B';
    return colorPalette[i % colorPalette.length];
  }

  const currentColor = computed(() =>
    activeStartIndex.value == null
      ? '#FFEB3B'
      : getColorForIndex(activeStartIndex.value)
  );

  type PersistedPath = {
    startIndex: number;
    segments: Segment[];
    color: string;
  };
  const persistedPaths = ref<PersistedPath[]>([]);
  const persistedLineSegments = computed(() => {
    const out: Array<Segment & { color: string }> = [];
    for (const p of persistedPaths.value) {
      for (const s of p.segments) out.push({ ...s, color: p.color });
    }
    return out;
  });

  function replacePersistedPath(
    startIndex: number,
    segments: Segment[],
    color: string
  ) {
    const filtered = persistedPaths.value.filter(
      (p) => p.startIndex !== startIndex
    );
    persistedPaths.value = [...filtered, { startIndex, segments, color }];
  }

  // commitCurrentPathPartial: 더는 직접 호출하지 않음 (step 내부에서 대체 구현)

  function lengthOf(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function buildPathForStart(startIndex: number): Segment[] {
    const segs: Segment[] = [];
    const sorted = [...rungs.value].sort((a, b) => a.y - b.y);
    let col = startIndex;
    let yAbs = verticalTop.value;
    const bottomY = verticalBottom.value;

    function findNextRung() {
      for (const r of sorted) {
        const ry = rungY(r.y);
        if (ry <= yAbs) continue;
        if (r.leftColumnIndex === col || r.leftColumnIndex === col - 1) {
          return { r, ry } as const;
        }
      }
      return null;
    }

    while (true) {
      const next = findNextRung();
      if (!next) {
        // 바닥까지 수직 이동
        const x = columnX(col);
        if (bottomY > yAbs) {
          segs.push({
            x1: x,
            y1: yAbs,
            x2: x,
            y2: bottomY,
            length: bottomY - yAbs,
          });
        }
        break;
      }
      const { r, ry } = next;
      // 수직 이동 (현재 위치에서 해당 가로줄까지)
      const x = columnX(col);
      if (ry > yAbs) {
        segs.push({ x1: x, y1: yAbs, x2: x, y2: ry, length: ry - yAbs });
      }
      // 가로줄을 따라 좌우 이동
      if (r.leftColumnIndex === col) {
        // 오른쪽 이동
        const x2 = columnX(col + 1);
        segs.push({
          x1: columnX(col),
          y1: ry,
          x2,
          y2: ry,
          length: Math.abs(x2 - columnX(col)),
        });
        col = col + 1;
      } else {
        // 왼쪽 이동 (r.leftColumnIndex === col - 1)
        const x2 = columnX(col - 1);
        segs.push({
          x1: columnX(col),
          y1: ry,
          x2,
          y2: ry,
          length: Math.abs(columnX(col) - x2),
        });
        col = col - 1;
      }
      yAbs = ry;
    }

    return segs;
  }

  function startPathAnimation(index: number) {
    cancelAnimation();
    activeStartIndex.value = index;
    const segs = buildPathForStart(index);
    pathSegments.value = segs.map((s) => ({
      ...s,
      length: lengthOf(s.x1, s.y1, s.x2, s.y2),
    }));
    totalPathLength.value = pathSegments.value.reduce(
      (sum, s) => sum + s.length,
      0
    );
    animatedDistance.value = 0;
    lastTimestamp = 0;
    const step = (ts: number) => {
      if (!lastTimestamp) lastTimestamp = ts;
      const dt = (ts - lastTimestamp) / 1000;
      lastTimestamp = ts;
      animatedDistance.value += animationSpeedPxPerSec * dt;
      if (
        animatedDistance.value >= totalPathLength.value ||
        totalPathLength.value === 0
      ) {
        animatedDistance.value = totalPathLength.value;
        // 최종 경로 전체 저장
        replacePersistedPath(
          index,
          pathSegments.value,
          getColorForIndex(index)
        );
        cancelAnimation();
        return;
      }
      // 진행 중인 경로 일부 저장 (다른 클릭으로 전환 시 남도록)
      const partial = drawnSegments.value.map((s) => ({
        ...s,
        length: lengthOf(s.x1, s.y1, s.x2, s.y2),
      }));
      if (partial.length > 0)
        replacePersistedPath(index, partial, getColorForIndex(index));
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
  }

  function cancelAnimation() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  onBeforeUnmount(() => cancelAnimation());

  const drawnSegments = computed(() => {
    const out: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    let remain = animatedDistance.value;
    for (const s of pathSegments.value) {
      if (remain <= 0) break;
      if (remain >= s.length) {
        out.push({ x1: s.x1, y1: s.y1, x2: s.x2, y2: s.y2 });
        remain -= s.length;
      } else {
        const ratio = remain / s.length;
        out.push({
          x1: s.x1,
          y1: s.y1,
          x2: s.x1 + (s.x2 - s.x1) * ratio,
          y2: s.y1 + (s.y2 - s.y1) * ratio,
        });
        break;
      }
    }
    return out;
  });

  const activeDestinationIndex = computed<number | null>(() => {
    if (activeStartIndex.value == null) return null;
    // 현재 경로가 일부라도 그려졌다면 목적지 미리 강조하지 않고 완료 시에만 강조
    if (animatedDistance.value < totalPathLength.value - 1e-3) return null;
    const m = results.value.find((m) => m.fromIndex === activeStartIndex.value);
    return m?.toIndex ?? null;
  });
</script>

<template>
  <v-container class="pa-2" fluid>
    <v-row class="mb-2" align="center" justify="space-between">
      <v-col cols="12" md="6">
        <v-card variant="outlined" class="pa-3">
          <v-row align="center">
            <v-col cols="12" sm="8">
              <v-slider
                v-model="numColumns"
                :min="minColumns"
                :max="sliderMax"
                step="1"
                thumb-label
                label="열(기둥) 개수"
              />
            </v-col>
            <v-col cols="6" sm="2">
              <v-text-field
                v-model.number="numColumns"
                type="number"
                density="compact"
                label="열"
                :min="minColumns"
                :max="sliderMax"
              />
            </v-col>
            <v-col cols="6" sm="2">
              <v-text-field
                v-model.number="sliderMax"
                type="number"
                density="compact"
                label="최대"
                :min="minColumns"
              />
            </v-col>
          </v-row>
          <v-row class="mt-2" dense>
            <v-col cols="12" class="d-flex flex-wrap ga-2">
              <v-btn color="primary" @click="addRandomRung"
                >가로줄 1개 추가</v-btn
              >
              <v-btn color="secondary" @click="generateFullLadder"
                >모든 사다리 자동 연결</v-btn
              >
              <v-btn color="error" variant="outlined" @click="resetLadder"
                >초기화</v-btn
              >
              <v-spacer />
              <v-btn color="success" @click="openResultDialog">결과 보기</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card variant="outlined" class="pa-3">
          <v-row dense>
            <v-col cols="12" class="text-subtitle-2">상단 라벨</v-col>
            <v-col
              v-for="(label, i) in topLabels"
              :key="`t-${i}`"
              cols="6"
              sm="4"
              md="3"
            >
              <v-text-field
                v-model="topLabels[i]"
                :label="label"
                density="compact"
                hide-details
                placeholder="상단 라벨"
              />
            </v-col>
            <v-col cols="12" class="mt-2 text-subtitle-2">하단 라벨</v-col>
            <v-col
              v-for="(label, i) in bottomLabels"
              :key="`b-${i}`"
              cols="6"
              sm="4"
              md="3"
            >
              <v-text-field
                v-model="bottomLabels[i]"
                :label="label"
                density="compact"
                hide-details
                placeholder="하단 라벨"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card variant="outlined" class="pa-2">
          <div class="d-flex justify-center">
            <svg :viewBox="svgViewBox" :width="'100%'" :height="canvasHeight">
              <g>
                <text
                  v-for="(label, i) in topLabels"
                  :key="`tt-${i}`"
                  :x="columnX(i)"
                  :y="24"
                  text-anchor="middle"
                  class="label clickable"
                  @click="startPathAnimation(i)"
                >
                  {{ label }}
                </text>

                <text
                  v-for="(label, i) in bottomLabels"
                  :key="`bb-${i}`"
                  :x="columnX(i)"
                  :y="canvasHeight - 10"
                  text-anchor="middle"
                  :class="[
                    'label',
                    'clickable',
                    i === activeDestinationIndex ? 'active-destination' : '',
                  ]"
                  @click="startPathAnimation(i)"
                >
                  {{ label }}
                </text>

                <line
                  v-for="i in numColumns"
                  :key="`v-${i - 1}`"
                  :x1="columnX(i - 1)"
                  :x2="columnX(i - 1)"
                  :y1="verticalTop"
                  :y2="verticalBottom"
                  class="vertical"
                />

                <line
                  v-for="(r, idx) in rungs"
                  :key="`h-${idx}`"
                  :x1="columnX(r.leftColumnIndex)"
                  :x2="columnX(r.leftColumnIndex + 1)"
                  :y1="rungY(r.y)"
                  :y2="rungY(r.y)"
                  class="rung"
                />

                <!-- persisted colored paths (완료 또는 부분 진행 누적) -->
                <line
                  v-for="(s, i) in persistedLineSegments"
                  :key="`pl-${i}`"
                  :x1="s.x1"
                  :y1="s.y1"
                  :x2="s.x2"
                  :y2="s.y2"
                  :stroke="s.color"
                  class="highlight"
                />

                <!-- current animating path (현재 클릭된 TOP에 대한 경로만 별도 색상으로)
                     진행 중에도 persisted로 일부 저장되므로 겹쳐 보일 수 있으나 시각적으로 더 진하게 표시 -->
                <line
                  v-for="(s, i) in drawnSegments"
                  :key="`hl-${i}`"
                  :x1="s.x1"
                  :y1="s.y1"
                  :x2="s.x2"
                  :y2="s.y2"
                  :stroke="currentColor"
                  class="highlight active"
                />
              </g>
            </svg>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="560">
      <v-card>
        <v-card-title>사다리 결과</v-card-title>
        <v-card-text>
          <v-table density="compact">
            <thead>
              <tr>
                <th class="text-left">상단</th>
                <th class="text-left">→</th>
                <th class="text-left">하단</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in results" :key="`${m.fromIndex}-${m.toIndex}`">
                <td>{{ m.fromLabel }}</td>
                <td>→</td>
                <td>{{ m.toLabel }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
  .label {
    fill: #e0e0e0;
    font-size: 14px;
  }
  .clickable {
    cursor: pointer;
  }
  .vertical {
    stroke: #9e9e9e;
    stroke-width: 3;
  }
  .rung {
    stroke: #42a5f5;
    stroke-width: 4;
  }
  .highlight {
    stroke: #ffeb3b;
    stroke-width: 6;
    stroke-linecap: round;
  }
  .highlight.active {
    stroke-width: 7;
  }
  .active-destination {
    fill: #ffeb3b;
    font-weight: 700;
  }
</style>

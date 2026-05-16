<template>
  <aside class="app-sidebar">
    <!-- Environment 觸發區（panel 往右展開） -->
    <div class="env-section">
      <button class="env-trigger" @click="$emit('toggle-environment')">
        ENVIRONMENT
      </button>
    </div>

    <!-- 點狀進度清單 -->
    <ul class="dot-list">
      <li
        v-for="project in visibleDots"
        :key="project.id"
        class="dot-item"
        :class="{
          'is-active': project.index === currentIndex,
          'is-near':   Math.abs(project.index - currentIndex) === 1,
          'is-far':    Math.abs(project.index - currentIndex) >= 2,
        }"
        @click="$emit('go-to', project.index)"
      >
        <span class="dot" />
        <span v-if="project.index === currentIndex" class="dot-label">
          {{ project.name }}
        </span>
      </li>
    </ul>

    <!-- 進度數字 -->
    <div class="progress-label">{{ progressLabel }}</div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  projects:      { type: Array,  required: true },
  currentIndex:  { type: Number, required: true },
  progressLabel: { type: String, required: true },
})

defineEmits(['go-to', 'toggle-environment'])

const visibleDots = computed(() => {
  const total = props.projects.length
  const cur   = props.currentIndex

  if (total <= 5) {
    return props.projects.map((p, i) => ({ ...p, index: i }))
  }

  let start = Math.max(0, cur - 2)
  let end   = Math.min(total - 1, cur + 2)

  if (end - start < 4) {
    if (start === 0) end   = Math.min(total - 1, 4)
    if (end === total - 1) start = Math.max(0, total - 5)
  }

  return props.projects
    .slice(start, end + 1)
    .map((p, i) => ({ ...p, index: start + i }))
})
</script>

<style lang="scss" scoped>
.app-sidebar {
  position: fixed;
  left: var(--spacing-lg);
  bottom: var(--spacing-lg);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  // 由下往上排列：progress → dots → env
  // 用 flex-direction: column-reverse 讓視覺順序跟設計稿相符
  // 設計稿由上而下：env panel → dots → 00/07
  // 但 env trigger 在最下面所以用正常 column 然後調整 order
}

// ─── Environment 觸發 ──────────────────────────────────
.env-section {
  order: 3; // 視覺最下方
}

.env-trigger {
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
  }
}

// ─── 點狀清單 ──────────────────────────────────────────
.dot-list {
  order: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dot-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;

  &.is-active .dot {
    width: 8px;
    height: 8px;
    background-color: var(--color-text-primary);
    opacity: 1;
  }

  &.is-near .dot {
    width: 6px;
    height: 6px;
    background-color: var(--color-text-muted);
    opacity: 0.6;
  }

  &.is-far .dot {
    width: 5px;
    height: 5px;
    background-color: var(--color-text-faint);
    opacity: 0.35;
  }
}

.dot {
  border-radius: 50%;
  flex-shrink: 0;
  transition:
    width            var(--transition-base),
    height           var(--transition-base),
    opacity          var(--transition-base),
    background-color var(--transition-base);
}

.dot-label {
  font-size: 10px;
  color: var(--color-text-primary);
  letter-spacing: 0.04em;
  white-space: nowrap;
  animation: fadeIn 0.2s ease;
}

// ─── 進度數字 ──────────────────────────────────────────
.progress-label {
  order: 1; // 視覺最上方（dot list 上面）
  font-size: 10px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>

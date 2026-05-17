<template>
  <div ref="stackEl" class="card-stack">
    <!--
      Ghost 卡（堆疊視覺，固定在底層）
      高度跟著 currentCard 的實際高度同步
    -->
    <div
      class="stack-ghost stack-ghost--2"
      :style="{ height: cardHeight ? `${cardHeight}px` : 'auto' }"
    />
    <div
      class="stack-ghost stack-ghost--1"
      :style="{ height: cardHeight ? `${cardHeight}px` : 'auto' }"
    />

    <!--
      卡片動畫容器
      TransitionGroup 管理進出場
      key 用 project.id 讓 Vue 知道是不同元素
    -->
    <TransitionGroup
      :name="transitionName"
      tag="div"
      class="card-transition-wrapper"
    >
      <ProjectCard
        v-if="currentProject"
        :key="currentProject.id"
        :project="currentProject"
        class="stack-card"
        @vue:mounted="onCardMounted"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
	transitionName: { type: String, default: 'slide-up' },
})

const { currentProject } = useProjects()

// ─── Ghost 卡高度同步 ───────────────────────────────────
const cardHeight = ref(0)
const stackEl    = ref(null)

function onCardMounted() {
	nextTick(() => {
		const cardEl = stackEl.value?.querySelector('.stack-card')
		if (cardEl) cardHeight.value = cardEl.offsetHeight
	})
}
</script>

<style lang="scss" scoped>
// ─── 容器 ──────────────────────────────────────────────
.card-stack {
  position: relative;
  width: 100%;
  max-width: var(--card-max-width);
  padding-bottom: 20px;
  // 讓 JS 完全接管 touch，避免瀏覽器的 native scroll 搶走 swipe 事件
  touch-action: none;
}

// ─── TransitionGroup wrapper ───────────────────────────
// 需要 position: relative 讓 absolute 的離場卡片定位正確
.card-transition-wrapper {
  position: relative;
}

// ─── 當前卡片 ──────────────────────────────────────────
.stack-card {
  position: relative;
  z-index: 3;
  // will-change 提示瀏覽器預備 GPU 加速
  will-change: transform, opacity;
}

// ─── Ghost 卡（堆疊視覺）──────────────────────────────
.stack-ghost {
  position: absolute;
  left: 0;
  right: 0;
  border-radius: var(--card-radius);
  background: var(--color-surface);

  &--1 {
    bottom: -8px;
    left: 16px;
    right: 16px;
    z-index: 2;
    opacity: 0.65;
    box-shadow: 0 2px 12px var(--color-card-shadow);
  }

  &--2 {
    bottom: -16px;
    left: 32px;
    right: 32px;
    z-index: 1;
    opacity: 0.35;
    box-shadow: 0 2px 8px var(--color-card-shadow);
  }
}

// ─── 進場 / 離場動畫 ───────────────────────────────────
// slide-up：下一張（舊卡往上飛出，新卡從下飛入）
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform var(--transition-slow),
    opacity   0.4s ease;
  // 離場的卡片需要 absolute 才不會佔位擠壓新卡
  &.slide-up-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}

.slide-up-enter-from {
  transform: translateY(60px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-80px);
  opacity: 0;
}

// slide-down：上一張（舊卡往下飛出，新卡從上飛入）
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform var(--transition-slow),
    opacity   0.4s ease;
  &.slide-down-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}

.slide-down-enter-from {
  transform: translateY(-60px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(80px);
  opacity: 0;
}
</style>

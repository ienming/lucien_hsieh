<template>
  <div class="card-stack">
    <!--
      第一階段：靜態展示 stack 視覺效果
      只渲染當前卡片 + 下方兩張佔位卡片

      第二階段會改為動態渲染 + 切換動畫
    -->

    <!-- 佔位卡（堆疊視覺，在最底層） -->
    <div class="stack-ghost stack-ghost--2" />
    <div class="stack-ghost stack-ghost--1" />

    <!-- 當前卡片 -->
    <ProjectCard
      v-if="currentProject"
      :project="currentProject"
      class="stack-card--current"
    />
  </div>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
  currentProject: {
    type: Object,
    default: null,
  },
})
</script>

<style lang="scss" scoped>
.card-stack {
  position: relative;
  width: 100%;
  max-width: var(--card-max-width);

  // 給 ghost 卡片足夠的底部空間
  padding-bottom: 24px;
}

// ─── 當前卡片 ──────────────────────────────────────────
.stack-card--current {
  position: relative;
  z-index: 3;
}

// ─── Ghost 卡（堆疊視覺） ──────────────────────────────
// 用 scss 迴圈讓程式碼簡潔
.stack-ghost {
  position: absolute;
  left: 0;
  right: 0;
  border-radius: var(--card-radius);
  background: var(--color-surface);
  z-index: 2;

  // 高度跟著當前卡片，用 JS 在第二階段動態調整
  // 這裡先給一個固定高度佔位
  height: 100%;

  &--1 {
    bottom: -8px;
    left: 12px;
    right: 12px;
    z-index: 2;
    opacity: 0.7;
    box-shadow: 0 2px 12px var(--color-card-shadow);
  }

  &--2 {
    bottom: -16px;
    left: 24px;
    right: 24px;
    z-index: 1;
    opacity: 0.4;
    box-shadow: 0 2px 8px var(--color-card-shadow);
  }
}
</style>

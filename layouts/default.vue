<template>
  <div class="layout">
    <aside class="layout-left">
      <AppHeader />
      <AppSidebar />
    </aside>

    <main class="layout-main">
      <slot />
    </main>

    <ProjectModal />
  </div>
</template>

<script setup>
import AppHeader from "./partials/AppHeader";
import AppSidebar from "./partials/AppSidebar";
import ProjectModal from "~/components/inventory/ProjectModal.vue";
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

// ─── 左欄：AppHeader（上）+ AppSidebar（下）────────────
.layout-left {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-lg);

  // 手機：退化為底部固定橫列
  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    height: 48px;
    flex-direction: row;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-surface);
    border-right: none;
    border-top: 1px solid var(--color-border);
    z-index: 100;
  }
}

// ─── 右側主內容 ───────────────────────────────────────
.layout-main {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
</style>

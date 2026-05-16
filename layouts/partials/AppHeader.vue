<template>
  <header class="app-header">
    <h1 class="site-title">LUCIEN'S INVENTORY</h1>
    <nav class="header-nav">
      <button class="nav-link">FILE EXPLORER</button>
      <button class="nav-link">VIEW IN LIST</button>
    </nav>
  </header>
</template>

<script setup>
// Environment 觸發移到左下角的 AppSidebar，header 不再持有
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: var(--spacing-lg);
  left: var(--spacing-lg);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.site-title {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  color: var(--color-text-primary);
}

.header-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  text-align: left;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
  }
}
</style>

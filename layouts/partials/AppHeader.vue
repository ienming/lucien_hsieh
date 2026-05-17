<template>
  <header class="app-header">
    <h1 class="site-title">{{ t('siteTitle') }}</h1>
    <nav class="header-nav">
      <button class="nav-link">{{ t('fileExplorer') }}</button>
      <button class="nav-link">{{ t('viewInList') }}</button>
    </nav>
  </header>
</template>

<script setup>
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  // 手機：在底欄中隱藏，空間有限
  @media (max-width: 767px) {
    display: none;
  }
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

<template>
  <Transition name="panel">
    <div v-if="isOpen" class="env-panel">
      <button class="panel-close" @click="$emit('close')">[-]</button>

      <div class="panel-rows">
        <div class="panel-row">
          <span class="row-label">{{ t('translation') }}</span>
          <button class="row-toggle" @click="$emit('toggle-language')">
            <span :class="{ 'is-active': language === 'EN' }">[EN]</span>
            <span class="separator">/</span>
            <span :class="{ 'is-active': language === 'ZH' }">ZH</span>
          </button>
        </div>

        <div class="panel-row">
          <span class="row-label">{{ t('light') }}</span>
          <button class="row-toggle" @click="$emit('toggle-theme')">
            <span :class="{ 'is-active': !isDark }">[ON]</span>
            <span class="separator">/</span>
            <span :class="{ 'is-active': isDark }">OFF</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen:   { type: Boolean, required: true },
  language: { type: String,  required: true },
  isDark:   { type: Boolean, required: true },
})

defineEmits(['close', 'toggle-language', 'toggle-theme'])

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.env-panel {
  // 相對於 .env-section（position: relative）定位
  position: absolute;
  bottom: 0;
  left: calc(100% + var(--spacing-sm)); // 緊貼在按鈕右側
  z-index: 200;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  padding: var(--spacing-md);
  min-width: 150px;

  box-shadow: 0 4px 20px var(--color-card-shadow);

  // 手機：底欄往上展開
  @media (max-width: 767px) {
    bottom: calc(100% + var(--spacing-sm));
    left: 0;
  }
}

.panel-close {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  font-size: 10px;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);

  &:hover { color: var(--color-text-primary); }
}

.panel-rows {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
}

.panel-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.row-label {
  font-size: 9px;
  color: var(--color-text-faint);
  letter-spacing: 0.06em;
}

.row-toggle {
  font-size: 10px;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 2px;
  justify-content: flex-end;
  transition: color var(--transition-fast);

  &:hover { color: var(--color-text-primary); }

  .is-active {
    color: var(--color-text-primary);
    font-weight: 500;
  }

  .separator { color: var(--color-text-faint); }
}

// ─── 動畫 ─────────────────────────────────────────────
.panel-enter-active,
.panel-leave-active {
  transition:
    opacity   var(--transition-base),
    transform var(--transition-base);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>

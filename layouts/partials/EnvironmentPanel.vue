<template>
  <Transition name="panel">
    <div v-if="isOpen" class="env-panel">
      <button class="panel-close" @click="$emit('close')">[-]</button>

      <div class="panel-rows">
        <div class="panel-row">
          <span class="row-label">Translation</span>
          <button class="row-toggle" @click="$emit('toggle-language')">
            <span :class="{ 'is-active': language === 'EN' }">[EN]</span>
            <span class="separator">/</span>
            <span :class="{ 'is-active': language === 'ZH' }">ZH</span>
          </button>
        </div>

        <div class="panel-row">
          <span class="row-label">Light</span>
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
</script>

<style lang="scss" scoped>
.env-panel {
  position: fixed;

  // 對齊左下角 ENVIRONMENT 按鈕，往右展開
  // bottom 對齊 sidebar bottom + env trigger 的高度
  bottom: calc(var(--spacing-lg) - 4px);
  left: calc(var(--spacing-lg) + 88px); // ENVIRONMENT 文字寬度約 88px

  z-index: 200;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius);
  padding: var(--spacing-md);
  min-width: 150px;

  box-shadow: 0 4px 20px var(--color-card-shadow);
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

// ─── 動畫：從左下往右淡入 ─────────────────────────────
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

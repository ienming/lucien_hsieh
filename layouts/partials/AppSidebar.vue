<template>
  <aside class="app-sidebar">
    <!-- Environment 觸發 + Panel -->
    <div class="env-section">
      <button class="env-trigger" @click="$emit('toggle-environment')">
        {{ t('environment') }}
      </button>

      <EnvironmentPanel
        :is-open="isEnvOpen"
        :language="language"
        :is-dark="isDark"
        @close="$emit('close')"
        @toggle-language="$emit('toggle-language')"
        @toggle-theme="$emit('toggle-theme')"
      />
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
        <span v-if="project.index === currentIndex" class="dot-label desktop-only">
          {{ project.name }}
        </span>
      </li>
    </ul>

    <!-- 進度數字 -->
    <div class="progress-label">{{ progressLabel }}</div>
  </aside>
</template>

<script setup>
import EnvironmentPanel from './EnvironmentPanel.vue'

const props = defineProps({
	projects:      { type: Array,   required: true },
	currentIndex:  { type: Number,  required: true },
	progressLabel: { type: String,  required: true },
	isEnvOpen:     { type: Boolean, required: true },
	language:      { type: String,  required: true },
	isDark:        { type: Boolean, required: true },
})

defineEmits(['go-to', 'toggle-environment', 'close', 'toggle-language', 'toggle-theme'])

const { t } = useI18n()

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
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  @media (max-width: 767px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}

// ─── Environment 觸發 ──────────────────────────────────
.env-section {
  order: 2;
  position: relative; // EnvironmentPanel 的 absolute 錨點

  @media (max-width: 767px) {
    order: 1;
  }
}

.env-trigger {
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);

  &:hover { color: var(--color-text-primary); }
}

// ─── 點狀清單 ──────────────────────────────────────────
.dot-list {
  order: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 767px) {
    flex-direction: row;
    flex: 1;
    justify-content: center;
    gap: 12px;
  }
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

.desktop-only {
  @media (max-width: 767px) { display: none; }
}

// ─── 進度數字 ──────────────────────────────────────────
.progress-label {
  order: 1;
  font-size: 10px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;

  @media (max-width: 767px) {
    order: 3;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>

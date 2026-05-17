<template>
  <div
    ref="cardEl"
    class="project-card"
    :class="[`type-${project.type}`, { 'is-hovering': isHovered }]"
    :style="cardStyle"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <!-- Card Header -->
    <div class="card-header">
      <div class="card-meta">
        <span class="meta-label">{{ t('name') }}</span>
        <span class="meta-value">{{ project.name }}</span>
      </div>
      <div class="card-meta">
        <span class="meta-label">{{ t('no') }}</span>
        <span class="meta-value">{{ project.no }}</span>
      </div>
      <div class="card-meta">
        <span class="meta-label">{{ t('medium') }}</span>
        <span class="meta-value">{{ project.medium }}</span>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <!-- Profile 型：純文字 -->
      <div v-if="project.type === 'profile'" class="card-body--profile">
        <p class="profile-text">{{ project.description }}</p>
      </div>

      <!-- Project 型：封面圖 + hover overlay -->
      <div v-else class="card-body--project">
        <img
          v-if="project.coverImage"
          :src="project.coverImage"
          :alt="project.name"
          class="cover-image"
          :class="{ 'is-hidden': isHovered }"
        />
        <div class="hover-overlay" :class="{ 'is-visible': isHovered }">
          <p class="hover-description">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
})

const { openModal, isOpen: isModalOpen } = useModal()
const { t } = useI18n()

const cardEl = ref(null)
const isHovered    = ref(false)
const tiltX        = ref(0)
const tiltY        = ref(0)

const MAX_TILT = 10

// Modal 開啟時重置 hover 狀態，避免卡片 frozen 在橘色 overlay
watch(isModalOpen, (open) => {
	if (open) {
		isHovered.value = false
		tiltX.value = 0
		tiltY.value = 0
	}
})

const cardStyle = computed(() => ({
	transform: `perspective(900px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`,
}))

function onClick() {
	openModal(props.project)
}

function onMouseEnter() {
	isHovered.value = true
}

function onMouseMove(e) {
	if (!cardEl.value) return
	const rect = cardEl.value.getBoundingClientRect()
	const cx = rect.width / 2
	const cy = rect.height / 2
	tiltY.value = ((e.clientX - rect.left - cx) / cx) * MAX_TILT
	tiltX.value = -((e.clientY - rect.top - cy) / cy) * MAX_TILT
}

function onMouseLeave() {
	isHovered.value = false
	tiltX.value = 0
	tiltY.value = 0
}
</script>

<style lang="scss" scoped>
.project-card {
  background: var(--color-surface);
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: 0 2px 16px var(--color-card-shadow);
  width: 100%;
  max-width: var(--card-max-width);
  // 預設：滑鼠離開時慢速歸零
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow var(--transition-base);

  // hover 中：快速跟隨游標
  &.is-hovering {
    transition: transform 0.08s linear, box-shadow var(--transition-base);
    box-shadow: 0 8px 32px var(--color-card-shadow);
  }
}

// ─── Card Header ──────────────────────────────────────
.card-header {
  display: flex;
  gap: var(--spacing-xl);
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 9px;
  color: var(--color-text-faint);
  letter-spacing: 0.06em;
}

.meta-value {
  font-size: 12px;
  color: var(--color-text-primary);
}

// ─── Card Body ────────────────────────────────────────
.card-body {
  position: relative;
}

// Profile 型
.card-body--profile {
  padding: var(--spacing-lg) var(--spacing-md);
  min-height: 200px;
}

.profile-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
}

// Project 型
.card-body--project {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-border);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease;

  &.is-hidden {
    opacity: 0;
  }
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: #e84c2b;
  display: flex;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-md);
  opacity: 0;
  transition: opacity 0.4s ease;

  &.is-visible {
    opacity: 1;
  }
}

.hover-description {
  font-size: 14px;
  line-height: 1.6;
  color: #fff;
  font-family: var(--font-mono);
}
</style>

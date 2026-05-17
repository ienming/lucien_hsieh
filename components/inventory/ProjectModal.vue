<template>
  <Teleport to="body">
    <!-- 視覺遮罩（fade） -->
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-backdrop" />
    </Transition>

    <!-- Scroll container：overflow-y: auto，同時處理點擊外部關閉 -->
    <Transition :name="scrollTransitionName">
      <div
        v-if="isOpen"
        class="modal-scroll"
        :style="scrollStyle"
        @click="onScrollClick"
      >
        <div ref="panelEl" class="modal-panel" @click.stop>
          <!-- Drag handle pill（手機視覺） -->
          <div
            class="modal-drag-handle"
            @touchstart.passive="onDragStart"
            @touchmove.prevent="onDragMove"
            @touchend.passive="onDragEnd"
          >
            <div class="drag-pill" />
          </div>

          <!-- Header：sticky top:0 + 拖曳關閉 -->
          <div
            class="modal-header"
            @touchstart.passive="onDragStart"
            @touchmove.prevent="onDragMove"
            @touchend.passive="onDragEnd"
          >
            <div class="modal-meta">
              <div class="meta-group">
                <span class="meta-label">{{ t('name') }}</span>
                <span class="meta-value">{{ project?.name }}</span>
              </div>
              <div class="meta-group meta-no">
                <span class="meta-label">{{ t('no') }}</span>
                <span class="meta-value">{{ project?.no }}</span>
              </div>
              <div class="meta-group meta-medium">
                <span class="meta-label">{{ t('medium') }}</span>
                <span class="meta-value">{{ project?.medium }}</span>
              </div>
            </div>
          </div>

          <!-- Content（自然高度，不限制） -->
          <div class="modal-content-area">
            <img
              v-if="project?.coverImage"
              :src="project.coverImage"
              :alt="project?.name"
              class="modal-cover"
            />
            <div class="modal-content">
              <p v-if="project?.description" class="modal-description">
                {{ project.description }}
              </p>
              <a
                v-if="project?.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="modal-link"
              >
                {{ t('viewProject') }}
              </a>
              <div v-if="project?.images?.length" class="modal-images">
                <figure
                  v-for="(img, i) in project.images"
                  :key="i"
                  class="modal-image-figure"
                >
                  <img :src="img.src" :alt="img.caption" class="modal-image" />
                  <figcaption v-if="img.caption" class="modal-caption">
                    {{ img.caption }}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { isOpen, project, closeModal } = useModal()
const { t } = useI18n()

// ─── 點擊 scroll container 外部（遮罩區）關閉 ──────────
const panelEl = ref(null)

function onScrollClick(e) {
  if (!panelEl.value?.contains(e.target)) closeModal()
}

// ─── 鍵盤 Escape ────────────────────────────────────────
function onKeyDown(e) {
  if (e.key === 'Escape' && isOpen.value) closeModal()
}
onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))

// ─── Drag-to-close（panelStyle 套用到 scroll container）
const dragY             = ref(0)
const touchStartY       = ref(0)
const isSnappingBack    = ref(false)
const isClosingFromDrag = ref(false)
const skipScrollTransition = ref(false)

const DRAG_THRESHOLD = 120

const scrollTransitionName = computed(() =>
  skipScrollTransition.value ? '' : 'modal-slide'
)

// 拖拽時整個 scroll container 跟著移動（最自然的 bottom-sheet 感）
const scrollStyle = computed(() => {
  if (isClosingFromDrag.value) {
    return { transform: 'translateY(110vh)', transition: 'transform 0.3s ease-in' }
  }
  if (dragY.value > 0) {
    return { transform: `translateY(${dragY.value}px)`, transition: 'none' }
  }
  if (isSnappingBack.value) {
    return { transform: 'translateY(0)', transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }
  }
  return {}
})

function onDragStart(e) {
  touchStartY.value          = e.touches[0].clientY
  isSnappingBack.value       = false
  isClosingFromDrag.value    = false
}

function onDragMove(e) {
  const delta = e.touches[0].clientY - touchStartY.value
  dragY.value = Math.max(0, delta)
}

function onDragEnd() {
  if (dragY.value > DRAG_THRESHOLD) {
    isClosingFromDrag.value = true
    dragY.value = 0
    setTimeout(() => {
      skipScrollTransition.value = true
      isClosingFromDrag.value    = false
      closeModal()
      nextTick(() => { skipScrollTransition.value = false })
    }, 300)
  } else {
    isSnappingBack.value = true
    dragY.value = 0
    setTimeout(() => { isSnappingBack.value = false }, 300)
  }
}
</script>

<style lang="scss" scoped>
// ─── 視覺遮罩 ─────────────────────────────────────────
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
}

// ─── Scroll container ────────────────────────────────
// inset: 0 撐滿整個 viewport，overflow-y: auto 讓 panel 內容可捲
// panel 的 margin-top 決定 modal 初始出現的位置
.modal-scroll {
  position: fixed;
  inset: 0;
  z-index: 1001;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

// ─── Panel ───────────────────────────────────────────
// 沒有 max-height，完全由內容決定高度
// margin-top 讓 panel 從視窗下方一定距離開始出現
.modal-panel {
  margin-top: 15vh;
  background: var(--color-surface);
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.15);
  min-height: 85vh; // 確保短內容也能觸底

  @media (min-width: 768px) {
    margin: 8vh auto;
    width: min(1000px, 90vw);
    min-height: auto;
    border-radius: var(--card-radius);
    box-shadow: 0 8px 48px rgba(0, 0, 0, 0.2);
  }
}

// ─── Drag handle（手機） ──────────────────────────────
.modal-drag-handle {
  display: flex;
  justify-content: center;
  padding: var(--spacing-sm) 0 4px;
  flex-shrink: 0;
  touch-action: none;

  @media (min-width: 768px) { display: none; }
}

.drag-pill {
  width: 36px;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
}

// ─── Header（sticky，使用者捲動時釘在頂部） ──────────
.modal-header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  touch-action: none;
  border-radius: 12px 12px 0 0;

  @media (max-width: 767px) {
    cursor: grab;
    &:active { cursor: grabbing; }
  }
}

.modal-meta {
  display: flex;
  width: 100%;
}

.meta-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  border-left: 1px solid var(--color-border);
  padding-left: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);

  &.meta-no {
	max-width: 90px;
  }

  &.meta-medium {
	max-width: 120px;
  }
}

.meta-label {
  font-size: 12px;
  color: var(--color-text-faint);
}

.meta-value {
  font-size: 16px;
  font-weight: 500;
  font-family: var(--font-mono);
  color: var(--color-text-primary);
}

// ─── Content area（自然高度） ─────────────────────────
.modal-content-area {
	max-width: 760px;
	margin: 0 auto;
	padding: var(--spacing-lg) var(--spacing-md);
}

.modal-cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding-bottom: var(--spacing-2xl); // 底部留呼吸空間
}

.modal-description {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
}

.modal-link {
  display: inline-block;
  font-size: 12px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 2px;
  width: fit-content;
  transition: color var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
    border-color: var(--color-text-primary);
  }
}

// ─── Image gallery ────────────────────────────────────
.modal-images {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.modal-image-figure {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.modal-image { width: 100%; border-radius: 4px; }

.modal-caption {
  font-size: 10px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

// ─── Backdrop transition ──────────────────────────────
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

// ─── Scroll container transition（從底部滑入） ────────
.modal-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.modal-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: translateY(100vh);
}
</style>

<template>
  <div ref="inventoryEl" class="inventory-view">
    <CardStack :transition-name="transitionName" />
  </div>
</template>

<script setup>
import CardStack from '../inventory/CardStack.vue'

const { goNext, goPrev } = useProjects()

const inventoryEl    = ref(null)
const isLocked       = ref(false)
const transitionName = ref('slide-up')
const ANIM_DURATION  = 600

function handleNext() {
	if (isLocked.value) return
	transitionName.value = 'slide-up'
	isLocked.value = true
	goNext()
	setTimeout(() => { isLocked.value = false }, ANIM_DURATION)
}

function handlePrev() {
	if (isLocked.value) return
	transitionName.value = 'slide-down'
	isLocked.value = true
	goPrev()
	setTimeout(() => { isLocked.value = false }, ANIM_DURATION)
}

const { attach, detach } = useCardScroll({ onNext: handleNext, onPrev: handlePrev, isLocked })

onMounted(() => { if (inventoryEl.value) attach(inventoryEl.value) })
onUnmounted(() => { if (inventoryEl.value) detach(inventoryEl.value) })
</script>

<style lang="scss" scoped>
.inventory-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  padding: var(--spacing-xl);

  // 手機：底部留空給固定底欄
  @media (max-width: 767px) {
    padding: var(--spacing-md);
    padding-bottom: 48px;
  }
}
</style>

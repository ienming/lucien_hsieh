<template>
  <div class="inventory-view">
    <CardStack :current-project="currentProject" />
  </div>
</template>

<script setup>
import CardStack from '../inventory/CardStack.vue'

defineProps({
  currentProject: {
    type: Object,
    default: null,
  },
})
</script>

<style lang="scss" scoped>
.inventory-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  // 左側留給 sidebar（標題 + 點 + env），卡片往右放
  // 左邊 padding 讓卡片從約 40% 處開始，右邊給一點呼吸
  padding-left: 38%;
  padding-right: var(--spacing-xl);
}
</style>

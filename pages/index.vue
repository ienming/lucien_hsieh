<script setup>
import AppHeader from '~/layouts/partials/AppHeader.vue';
import AppSidebar from '~/layouts/partials/AppSidebar.vue';
import ProjectModal from '~/components/project/ProjectModal.vue';
import CoordinateModal from '~/components/inventory/CoordinateModal.vue';
import InventoryView from '~/components/inventory/InventoryView.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const { initTheme } = useEnvironment();
const breakpoints = useBreakpoints(breakpointsTailwind);
const isLargeScreen = breakpoints.greaterOrEqual('md').value;

useHead({
	title: 'Lucien Hsieh',
	titleTemplate: null,
});

onMounted(() => {
	initTheme();
});
</script>

<template>
	<div class="layout">
		<AppHeader />
		<ClientOnly>
			<AppSidebar v-if="isLargeScreen" />
		</ClientOnly>
		<main class="layout-main">
			<InventoryView />
		</main>
		<ProjectModal />
		<CoordinateModal />
	</div>
</template>

<style lang="scss" scoped>
.layout {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

.layout-main {
	flex: 1;
	min-width: 0;
	overflow: hidden;
}
</style>

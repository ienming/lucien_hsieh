<template>
	<div class="layout">
		<AppHeader />
		<AppSidebar />
		<main class="layout-main">
			<InventoryView />
		</main>
		<ProjectModal />
		<CoordinateModal />
	</div>
</template>

<script setup>
import AppHeader from '~/layouts/partials/AppHeader.vue';
import AppSidebar from '~/layouts/partials/AppSidebar.vue';
import ProjectModal from '~/components/inventory/ProjectModal.vue';
import CoordinateModal from '~/components/inventory/CoordinateModal.vue';
import InventoryView from '~/components/inventory/InventoryView.vue';

const { initTheme } = useEnvironment();

useHead({
	title: 'Lucien Hsieh',
	titleTemplate: null,
});

onMounted(() => {
	initTheme();
});
</script>

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

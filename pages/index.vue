<template>
	<div class="layout">
		<aside class="layout-left">
			<AppHeader />
			<AppSidebar />
		</aside>

		<main class="layout-main">
			<InventoryView />
		</main>

		<ProjectModal />
	</div>
</template>

<script setup>
import AppHeader from '~/layouts/partials/AppHeader.vue';
import AppSidebar from '~/layouts/partials/AppSidebar.vue';
import ProjectModal from '~/components/inventory/ProjectModal.vue';
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
	display: flex;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}

.layout-left {
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: var(--spacing-lg);

	@media (max-width: 767px) {
		position: fixed;
		top: 0;
		width: 100%;
		height: 48px;
		flex-direction: row;
		align-items: center;
		padding: var(--spacing-sm) var(--spacing-md);
		background-color: var(--color-bg);
		border: none;
		z-index: 1;
	}
}

.layout-main {
	flex: 1;
	min-width: 0;
	overflow: hidden;
}
</style>

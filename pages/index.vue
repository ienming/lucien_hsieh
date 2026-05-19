<template>
	<div class="app">
		<main class="app-main">
			<InventoryView />
		</main>
	</div>
</template>

<script setup>
import InventoryView from '~/components/inventory/InventoryView.vue';

useHead({
	title: 'Lucien Hsieh',
	titleTemplate: null,
});
</script>

<style lang="scss">
@use './assets/scss/_variables2.scss';
@use './assets/scss/_reset.scss';
</style>

<template>
	<div class="app">
		<main class="app-main">
			<InventoryView />
		</main>
	</div>
</template>

<script setup>
import InventoryView from "~/components/inventory/InventoryView.vue";

useHead({
	title: "Lucien Hsieh",
	titleTemplate: null,
});

</script>

<style lang="scss">
@use "./assets/scss/_variables2.scss";
@use "./assets/scss/_reset.scss";
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap');
</style>

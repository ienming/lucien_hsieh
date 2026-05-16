<template>
	<div class="app">
		<main class="app-main">
			<InventoryView :current-project="currentProject" />
		</main>
	</div>
</template>

<script setup>
import InventoryView from "~/components/inventory/InventoryView.vue";

useHead({
	title: "Lucien Hsieh",
	titleTemplate: null,
});

const { currentProject } = useProjects();
</script>

<style lang="scss">
@use "./assets/scss/_variables2.scss";
@use "./assets/scss/_reset.scss";
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap");
</style>

<style lang="scss" scoped>
.app {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	position: relative;
}

.app-main {
	width: 100%;
	height: 100%;
}
</style>

<template>
	<div>
		<section class="index">
			<Workbench />
			<HeroIntro />
		</section>
		<!-- <Teleport to="body">
			<AllWorks v-model:open="isAllWorksOpen" />
		</Teleport> -->
	</div>
</template>

<script setup>
import Workbench from '~/components/index/Workbench.vue';
import HeroIntro from '~/components/index/HeroIntro.vue';

useHead({
	title: 'Lucien Hsieh',
	titleTemplate: null,
});

// const isAllWorksOpen = ref(false);
</script>

<style lang="scss" scoped>
.index {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
</style>

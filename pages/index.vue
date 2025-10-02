<template>
	<div>
		<section class="index">
			<Workbench />
			<HeroIntro />
		</section>
	</div>
</template>

<script setup>
import Workbench from '~/components/index/Workbench.vue';
import HeroIntro from '~/components/index/HeroIntro.vue';

useHead({
	title: 'Lucien Hsieh',
	titleTemplate: null,
});
</script>

<style lang="scss" scoped>
.index {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
</style>

<template>
	<div>
		<DefaultHeader v-if="isNeedHeader" />
		<main :class="{'with-header': isNeedHeaderMargin}">
			<div>
				<slot />
			</div>
			<!-- TODO: 手機版的導覽 -->
			<!-- <MobileMenuHamburger v-if="!route.path.includes('/project/')" /> -->
		</main>
		<DefaultFooter />
	</div>
</template>

<script setup>
import DefaultHeader from './partials/DefaultHeader';
import DefaultFooter from './partials/DefaultFooter';
// import MobileMenuHamburger from '~/components/MobileMenuHamburger.vue';

const route = useRoute();
const isNeedHeaderMargin = computed(() => {
	return route.path !== '/' && !route.path.includes('/project/');
});
const isNeedHeader = computed(() => {
	return route.path !== '/';
});
</script>

<style lang="scss">
main {
	min-height: 100vh;

	&.with-header {
		--header-height: 90px;
		margin-top: var(--header-height); //要把 fixed top 的 header 推上去
		min-height: calc(100vh - var(--header-height));
		
		@include response(md) {
			--header-height: 80px;
		}
	}
}
</style>

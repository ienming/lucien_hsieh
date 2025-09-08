<template>
	<div>
		<DefaultHeader />
		<main :class="{'with-header': isNeedHeaderMargin}">
			<slot />
			<MobileMenuHamburger />
		</main>
		<DefaultFooter />
	</div>
</template>

<script setup>
import DefaultHeader from './partials/DefaultHeader';
import DefaultFooter from './partials/DefaultFooter';
import MobileMenuHamburger from '~/components/MobileMenuHamburger.vue';

const route = useRoute();
const isNeedHeaderMargin = computed(() => {
	return route.path !== '/' && !route.path.includes('/project/');
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

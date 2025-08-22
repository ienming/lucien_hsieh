<template>
	<div>
		<DefaultHeader v-show="isNotIndex" />
		<main :class="{'with-header': isNotIndex}">
			<slot />
		</main>
		<DefaultFooter :show-creator="!isNotIndex" />
	</div>
</template>

<script setup>
import DefaultHeader from './partials/DefaultHeader';
import DefaultFooter from './partials/DefaultFooter';

const route = useRoute();
const isNotIndex = computed(() => route.path !== '/');
</script>

<style lang="scss">
main {

	&.with-header {
		--header-height: 52px;
		margin-top: var(--header-height); //要把 fixed top 的 header 推上去
		min-height: calc(100vh - var(--header-height));
		
		@include response(md) {
			--header-height: 68px;
		}
	}
}
</style>

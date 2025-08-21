<template>
	<div class="default-layout">
		<DefaultHeader />
		<main>
			<slot />
		</main>
		<DefaultFooter />
	</div>
</template>

<script setup>
import DefaultHeader from './partials/DefaultHeader';
import DefaultFooter from './partials/DefaultFooter';
</script>

<style lang="scss">
.default-layout {
	main {
		--header-height: 52px;
		margin-top: var(--header-height); //要把 fixed top 的 header 推上去
		min-height: calc(100vh - var(--header-height));
		
		@include response(md) {
			--header-height: 68px;
		}
	}
}
</style>

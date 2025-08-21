<template>
	<div>
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
main {
	--header-height: 52px;
	margin-top: var(--header-height); //要把 fixed top 的 header 推上去
	
	@include response(md) {
		--header-height: 68px;
	}
}
</style>

<script setup>
import AppSidebar from './AppSidebar.vue';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller('md').value;
</script>

<template>
	<header class="app-header">
		<h1 class="site-title">LÜCIEN</h1>
		<ClientOnly>
			<AppSidebar v-if="isMobile" />
		</ClientOnly>
	</header>
</template>

<style lang="scss" scoped>
.app-header {
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: var(--spacing-md);

	@media screen and (min-width: 768px) {
		justify-content: center;
	}
}

.site-title {
	font-family: 'Courier Prime';
	font-size: 18px;
	font-weight: 400;
	text-decoration: underline;
	text-underline-offset: 3px;
	text-decoration-thickness: 1px;
	color: var(--color-text-primary);

	@media screen and (min-width: 768px) {
		font-size: 24px;
	}
}
</style>

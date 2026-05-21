<template>
	<header class="app-header">
		<h1 class="site-title">LÜUÜUÜUÜCIEN</h1>
	</header>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-header {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);

	@media (max-width: 767px) {
		display: none;
	}
}

.site-title {
	font-family: 'Courier Prime';
	font-size: 24px;
	font-weight: 400;
	text-decoration: underline;
	text-underline-offset: 3px;
	text-decoration-thickness: 1px;
	color: var(--color-text-primary);
}
</style>

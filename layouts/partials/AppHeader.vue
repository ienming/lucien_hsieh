<template>
	<header class="app-header">
		<h1 class="site-title">LÜUÜUÜUÜCIEN</h1>
	</header>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-header {
	width: 100%;
	display: flex;
	justify-content: center;
	padding: var(--spacing-sm);

	@media screen and (min-width: 768px) {
		padding: var(--spacing-md);
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

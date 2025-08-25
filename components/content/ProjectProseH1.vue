<template>
	<h1 class="project-prose-h1">
		<slot />
	</h1>
</template>

<style lang="scss" scoped>
.project-prose-h1 {
	width: 100%;
	padding: 0 $space-base;
	margin: $space-base 0;
	word-break: break-all;

	@include response(md) {
		width: 50%;
		padding: 0 0 0 $space-lg;
		margin: $space-4xl 0;
	}
}
</style>

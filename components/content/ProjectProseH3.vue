<template>
	<h3 class="project-prose-h3">
		<slot mdc-unwrap="p" />
	</h3>
</template>

<style lang="scss" scoped>
.project-prose-h3 {
	width: 100%;
	padding: 0 $space-base;
	margin: $space-md 0;
	word-break: break-all;
	font-size: $font-size-md;
	font-weight: 600;

	@include response(md) {
		width: 50%;
		font-size: $font-size-lg;
		padding: 0 0 0 $space-lg;
		margin: $space-3xl 0;
	}
}
</style>

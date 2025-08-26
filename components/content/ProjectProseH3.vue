<template>
	<h3 class="project-prose-h3">
		<slot mdc-unwrap="p" />
	</h3>
</template>

<style lang="scss" scoped>
.project-prose-h3 {
	width: 100%;
	padding: 0 $space-base;
	margin: $space-base 0;
	word-break: break-all;
	font-size: $font-size-lg;
	font-weight: 600;

	@include response(md) {
		width: 50%;
		padding: 0 0 0 $space-lg;
		margin: $space-4xl 0;
	}
}
</style>

<template>
	<div class="project-prose-p">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.project-prose-p {
	width: 100%;
	padding: 0 $space-base;
	margin: $space-base 0;
	word-break: break-all;
	font-size: $font-size-base;

	@include response(md) {
		width: 50%;
		padding: 0 0 0 $space-lg;
		margin: $space-4xl 0;
		font-size: $font-size-md;
	}
}
</style>

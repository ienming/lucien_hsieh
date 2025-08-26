<template>
	<li class="project-prose-li">
		<slot mdc-unwrap="p" />
	</li>
</template>

<style lang="scss" scoped>
.project-prose-li {
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

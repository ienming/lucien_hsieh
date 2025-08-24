<template>
	<div class="project-prose-p">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.project-prose-p {
	width: 100%;
	padding: $space-base;
	word-break: break-all;

	@include response(md) {
		width: 50%;
		padding: $space-4xl 0 $space-4xl $space-lg;
	}
}
</style>

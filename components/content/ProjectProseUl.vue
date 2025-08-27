<template>
	<div class="project-prose-ul">
		<slot mdc-unwrap="p" />
	</div>
</template>

<style lang="scss" scoped>
.project-prose-ul {
	width: 100%;
	padding: 0 $space-base;
	margin: $space-base 0;
	word-break: break-all;

	:global(ul) {
		padding-inline-start: $space-xl;
		list-style: disc;
	
		> li {
			margin-bottom: $space-sm;
		}
	}

	@include response(md) {
		width: 50%;
		padding: 0 0 0 $space-lg;
		margin: $space-4xl 0;
	}
}
</style>

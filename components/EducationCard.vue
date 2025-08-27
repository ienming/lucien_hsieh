<template>
	<div class="education-card">
		<ul class="d-flex flex-column gap-space-sm">
			<li class="d-flex flex-column edu-item">
				<span class="text-muted">M.A.</span>
				<span>Media & Interaction Design (Creative Industry Design), NCKU</span>
			</li>
			<li class="d-flex flex-column edu-item">
				<span class="text-muted">B.SC.</span>
				<span>Digital Contents & Technologies, NCCU</span>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.education-card {
	.edu-item {
		font-size: $font-size-base;
		border-bottom: 1px solid $color-neutral-300;
		padding-bottom: $space-sm;

		@include response(md) {
			border-color: $color-neutral-900;
		}
	}
}
</style>
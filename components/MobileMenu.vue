<template>
	<section class="mobile-menu">
		<ul class="d-flex flex-column link-list">
			<li
				class="link-item"
				@click.stop="isAllWorksOpen = true">All works</li>
			<li
				class="link-item"
				@click.stop="isAboutCardOpen = true">(creator)</li>
		</ul>
	</section>
</template>

<script setup>
const {isAllWorksOpen} = useAllWorksModal();
const {isAboutCardOpen} = useAboutCard();
</script>

<style lang="scss" scoped>
.mobile-menu {
	position: absolute;
	bottom: 60px;
	left: 50%;
	transform: translateX(-50%);
	border-radius: $radius-base;
	background-color: $color-primary;
	padding: $space-sm;
	min-width: 180px;
	
	.link-list {
		gap: $space-sm;
		text-align: center;

		.link-item {
			padding: $space-sm;
			border-radius: $radius-sm;
			background-color: $color-neutral-200;
			color: $color-white;
		}
	}
}
</style>

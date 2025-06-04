<template>
	<footer
		class="text-muted text-difference custom-footer"
		:class="{hide: direction === SCROLL_DIRECTION.DOWN}">
		<div class="d-grid container">
			<div>
				<span>©{{ thisYear }} ALL RIGHTS RESERVED</span>
			</div>
			<div>
				<span>TAIPEI / TAIWAN</span>
			</div>
		</div>
	</footer>
</template>

<script setup>
import {SCROLL_DIRECTION} from '~/constants/interaction';

const thisYear = new Date().getFullYear();
const {direction} = useScrollDirection();
</script>

<style lang="scss" scoped>
.custom-footer {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: $z-index-common-fixed;
	width: 100vw;
	color: $color-text-tertiary;
	background-color: $color-background-container;
	transform: translateY(0);
	transition: transform .3s ease-in-out;
	
	.container {
		grid-template-rows: repeat(2, 1fr);
		padding: $space-sm;
	}

	@include response(md) {
		background-color: unset;
		
		.container {
			grid-template-columns: 3fr 1fr;
			grid-template-rows: unset;
		}
	}

	&.hide {
		transform: translateY(100%);
	}
}
</style>

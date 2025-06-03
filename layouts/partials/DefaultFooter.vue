<template>
	<footer class="text-muted text-difference custom-footer">
		<div class="d-grid container">
			<div>
				<span>©2025 ALL RIGHTS RESERVED</span>
			</div>
			<div>
				<span>TAIPEI / TAIWAN</span>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.custom-footer {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	color: $color-text-tertiary;
	background-color: $color-background-container;
	
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
}
</style>

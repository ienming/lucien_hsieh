<template>
	<footer class="custom-footer">
		<div class="contact-footer">
			<span class="find-me">Find me</span>
			<span class="email">hsieh.alan.0726@gmail.com</span>
		</div>
		<div class="d-flex justify-contents-space-between copyright-footer">
			<span>©{{ thisYear }} all rights reserved</span>
			<span>taipei / taiwan</span>
		</div>
	</footer>
</template>

<script setup>
const thisYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.custom-footer {
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;

	.contact-footer {
		height: 235px;
		padding: $space-5xl $space-md;
		border-radius: $radius-lg;
		background-color: $color-neutral-850;
		color: $color-neutral-200;
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		.find-me {
			font-size: 72px;
		}

		.email {
			font-size: 65px;
		}
	}

	.copyright-footer {
		width: 95%;
		font-size: $font-size-base;
		background: $color-neutral-200;
		color: $color-neutral-850;
		padding: $space-lg $space-md;
		border-radius: $radius-md;
	}

	@include response(md) {
		background-color: unset;
	}
}
</style>

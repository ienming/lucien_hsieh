<template>
	<footer class="custom-footer">
		<div class="contact-footer">
			<span class="find-me">Find me</span>
			<a 
				href="mailto:hsieh.alan.0726@gmail.com"
				class="email">hsieh.alan.0726@gmail.com</a>
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
		width: 100%;
		height: 235px;
		padding: $space-5xl $space-md;
		border-radius: $radius-lg;
		background-color: $color-neutral-850;
		color: $color-neutral-200;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: start;

		.find-me {
			font-size: 60px;
		}

		.email {
			font-size: 48px;
			text-align: right;
			// TODO: 調整 link 的下底線，還有這整個 footer 高度造成的 height 問題
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

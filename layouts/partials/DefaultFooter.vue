<template>
	<footer class="custom-footer">
		<div class="contact-footer">
			<span class="send-signal">Send a Signal</span>
			<a 
				href="mailto:hsieh.alan.0726@gmail.com"
				class="fade-link email">hsieh.alan.0726@gmail.com</a>
		</div>
		<div class="d-flex justify-contents-space-between copyright-footer">
			<span>©{{ thisYear }} all rights reserved</span>
			<span>taipei / taiwan</span>
		</div>
	</footer>
</template>

<script setup>
import { showSplitTextOnHover } from '~/libs/animate';

defineProps({
	showCreator: {
		type: Boolean,
		default: false,
	},
});

const thisYear = new Date().getFullYear();
let cleanUp;

onMounted(() => {
	cleanUp = showSplitTextOnHover('.custom-footer .email');
});

onUnmounted(() => {
	cleanUp();
});
</script>

<style lang="scss" scoped>
.custom-footer {
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;

	.contact-footer {
		width: 100%;
		height: 50vh;
		max-height: 330px;
		padding: $space-md $space-md $space-3xl $space-md;
		border-radius: $radius-sm;
		background-color: $color-neutral-850;
		color: $color-neutral-200;
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		align-items: start;

		.send-signal {
			font-size: $font-size-xl;
			line-height: 1;

			@include response(md) {
				font-size: $font-size-2xl;
			}
		}

		.email {
			border-bottom: 2px solid $color-neutral-200;
			align-self: end;
			font-size: 7.5vw;
			word-break: break-word;

			@include response(md) {
				font-size: $font-size-xl;
				text-align: right;
				align-self: start;
				justify-self: end;
				border-width: 2px;
			}
		}

		@include response(md) {
			grid-template-rows: unset;
			grid-template-columns: repeat(2, 1fr);
			height: auto;
		}
	}

	.copyright-footer {
		width: 100%;
		font-size: $font-size-xs;
		background: $color-neutral-200;
		color: $color-neutral-600;
		padding: $space-sm $space-base;
		border-radius: $radius-sm;
		flex-direction: column;

		@include response(md) {
			flex-direction: row;
		}
	}

	@include response(md) {
		background-color: unset;
	}
}
</style>

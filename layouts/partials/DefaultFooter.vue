<template>
	<footer class="custom-footer">
		<div class="contact-footer">
			<div>
				<span class="send-signal">Send a Signal</span>
				<!-- TODO: 在首頁時加上自介，因為這時候沒有 header 的 (creator) 入口 -->
				<div
					v-if="showCreator"
					class="creator-footer">
					<p class="title">(creator)</p>
					<p class="common-paragraph">
						Lucien Hsieh 謝明倫專注於 UI/UX 與前端開發，有約 3 年網頁設計與開發經驗。喜歡結合設計、前端與插畫方面的興趣。希望能將不同的內容轉譯成有趣的敘事作品。
					</p>
				</div>
			</div>
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
defineProps({
	showCreator: {
		type: Boolean,
		default: false,
	},
});

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
		height: 50vh;
		min-height: 480px;
		padding: $space-lg $space-base;
		border-radius: $radius-lg;
		background-color: $color-neutral-850;
		color: $color-neutral-200;
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		align-items: start;

		.send-signal {
			font-size: $font-size-4xl;
			line-height: 1;

			@include response(md) {
				font-size: 60px;
			}
		}

		.email {
			border-bottom: 2px solid $color-neutral-200;
			align-self: end;
			font-size: 7.5vw;
			word-break: break-word;

			@include response(md) {
				font-size: 48px;
				text-align: right;
				align-self: start;
				justify-self: end;
				border-width: 3px;
			}
		}

		@include response(md) {
			grid-template-rows: unset;
			grid-template-columns: repeat(2, 1fr);
			padding: $space-5xl $space-md;
			height: 240px;
			min-height: unset;
		}
	}

	.creator-footer {
		padding-top: $space-sm;
		color: $color-text-secondary;

		.title {
			font-size: $font-size-sm;
		}
	}

	.copyright-footer {
		width: 100%;
		font-size: $font-size-sm;
		background: $color-neutral-200;
		color: $color-neutral-850;
		padding: $space-lg $space-md;
		border-radius: $radius-md;
		flex-direction: column;

		@include response(md) {
			width: 95%;
			font-size: $font-size-base;
			flex-direction: row;
		}
	}

	@include response(md) {
		background-color: unset;
	}
}
</style>

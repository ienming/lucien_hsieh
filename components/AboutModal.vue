<template>
	<Teleport to="body">
		<div
			v-if="open"
			class="common-modal-overlay d-flex justify-contents-end">
			<div class="about-modal">
				<div class="d-flex flex-column gap-space-2xl info-card">
					<!-- TODO: 補上 Avatar -->
					<div class="d-flex align-items-center justify-contents-space-between">
						<div class="avatar">AVATAR</div>
						<ClientOnly>
							<Icon
								name="ant-design:close-outlined"
								class="close"
								@click="$emit('close')" />
						</ClientOnly>
					</div>
					<p class="common-paragraph">
						Lucien Hsieh 謝明倫 喜歡結合網頁前端與設計、插畫、資料視覺化方面的興趣。希望能將不同的內容轉譯成有趣的敘事作品。
					</p>
					<p class="common-paragraph">
						I use web frontend technologies to express my interests in design, illustration, story, and data visualization.
					</p>
				</div>
				<div class="social-media-card">
					<Button class="w-full d-flex justify-contents-space-between">
						<span>@luclucxn</span>
						<span>Icon</span>
					</Button>
				</div>
				<div class="education-card">
					Education
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});
defineEmits(['close']);
</script>

<style scoped lang="scss">
.about-modal {
	display: flex;
	flex-direction: column;

	@include response(md) {
		max-width: 388px;
	}

	.info-card, .social-media-card, .education-card {
		background-color: $color-white;
		padding: $space-xl;
		border-radius: $card-radius;
	}

	.info-card {
		.close {
			cursor: pointer;
		}
	}
}
</style>

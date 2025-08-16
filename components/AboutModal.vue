<template>
	<Teleport to="body">
		<Transition name="fade">
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
						<div class="d-flex flex-column gap-space-sm common-paragraph">
							<p>
								Lucien Hsieh 謝明倫 喜歡結合網頁前端與設計、插畫、資料視覺化方面的興趣。希望能將不同的內容轉譯成有趣的敘事作品。
							</p>
							<p>
								I use web frontend technologies to express my interests in design, illustration, story, and data visualization.
							</p>
						</div>
					</div>
					<div class="social-media-card">
						<Button class="w-full d-flex justify-contents-space-between">
							<span>@luclucxn</span>
							<ClientOnly>
								<Icon name="ant-design:instagram-outlined" />
							</ClientOnly>
						</Button>
					</div>
					<div class="education-card">
						<ul class="d-flex flex-column gap-space-sm">
							<li class="d-flex flex-column edu-item">
								<span class="text-muted">M.A.</span>
								<span>Interaction Design (Creative Industry Design), NCKU</span>
							</li>
							<li class="d-flex flex-column edu-item">
								<span class="text-muted">B.SC.</span>
								<span>Digital Contents & Technologies, NCCU</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</Transition>
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
		border: 1px solid $color-neutral-900;
		padding: $space-xl;
		border-radius: $card-radius;
	}

	.info-card {
		.close {
			cursor: pointer;
		}
	}

	.education-card {
		.edu-item {
			font-size: $font-size-base;
			border-bottom: 1px solid $color-neutral-900;
			padding-bottom: $space-sm;
		}
	}
}
</style>

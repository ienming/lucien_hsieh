<template>
	<ModalOverlay
		:open="open"
		transition="slide-from-right"
		class="align-items-end"
		@update:open="$emit('update:open', $event)">
		<div
			class="about-modal"
			@click.self="$emit('update:open', false)">
			<div class="d-flex flex-column gap-space-2xl info-card">
				<div class="d-flex align-items-start justify-contents-space-between">
					<Avatar :img="'/avatar.jpg'" />
					<ClientOnly>
						<Icon
							name="iconoir:xmark"
							class="close micro-interactable-btn"
							@click="$emit('update:open', false)" />
					</ClientOnly>
				</div>
				<div class="d-flex flex-column gap-space-sm common-paragraph">
					<p>
						Lucien Hsieh 謝明倫專注於 UI/UX 與前端開發，有約 3 年網頁設計與開發經驗。喜歡結合設計、前端與插畫方面的興趣。希望能將不同的內容轉譯成有趣的敘事作品。
					</p>
					<p>
						I’m Lucien — a UI/UX designer and front-end developer, having 3 years experiences in the field. I craft interfaces, build interactions, illustrate, and wrap them in concepts that tell a story.
					</p>
				</div>
			</div>
			<ContactCard />
			<EducationCard />
		</div>
	</ModalOverlay>
</template>

<script setup>
defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});
defineEmits(['update:open']);
</script>

<style scoped lang="scss">
.about-modal {
	display: flex;
	flex-direction: column;
	margin: $space-sm $space-sm 0 0;

	@include response(md) {
		max-width: 388px;
	}

	.info-card, .contact-card, .education-card {
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
}
</style>

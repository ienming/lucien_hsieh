<template>
	<ClientOnly>
		<BottomSheet
			v-model="isSheetOpen"
			:blocking="true"
			:can-swipe-close="true"
			:snap-points="['95%', '60%']"
			header-class="meta-title"
			content-class="meta-content"
			@opening-started="resetOverflow"
			@closed="resetBody">
			<template #header>
				{{ title }}
			</template>
			<section>
				<div class="d-flex flex-column gap-space-sm meta">
					<div class="year">
						<span class="mr-space-sm">&lt;Year&gt;</span>
						<span>{{ year }}</span>
					</div>
					<div class="d-flex gap-space-xs flex-wrap align-items-start types">
						<span class="mr-space-sm">&lt;Type&gt;</span>
						<WorkTypeChip
							v-for="tag of tags" 
							:key="tag"
							:type="tag"
							:clickable="false" />
					</div>
				</div>
				<div class="common-paragraph content">
					<!-- TODO: 換資料結構 -->
					{{ about }}
				</div>
			</section>
		</BottomSheet>
	</ClientOnly>
</template>

<script setup>
import BottomSheet from "@douxcode/vue-spring-bottom-sheet";
import "@douxcode/vue-spring-bottom-sheet/dist/style.css";

const {title, meta} = defineProps({
	title: {
		type: String,
		default: 'Project Title',
	},
	meta: {
		type: Object,
		default: () => {},
	},
});
const {year, tags, about} = meta;
const isSheetOpen = defineModel({
	type: Boolean,
});

function resetOverflow() {
	document.body.classList.add('reset-overflow');
}

function resetBody() {
	document.body.classList.remove('reset-overflow');
}
</script>

<style lang="scss" scoped>
:deep(.meta-title) {
	text-align: center;
}

.meta-content {
	.meta {
		font-size: $font-size-sm;
		border-bottom: 1px solid $color-neutral-900;
		padding-bottom: $space-sm;
		margin-left: -16px;
		margin-right: -16px;
		padding-left: 16px;
		padding-right: 16px;
	}

	.content {
		margin-top: $space-base;
	}
}
</style>

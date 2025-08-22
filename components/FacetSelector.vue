<template>
	<ModalOverlay
		:open="open"
		@update:open="('update:open', $event)">
		<!-- TODO: 讓手機版也變成 bottomSheet -->
		<div class="facet-selector">
			<div class="d-flex justify-contents-end align-items-center">
				<ClientOnly>
					<Icon
						name="iconoir:xmark"
						size="24"
						class="close"
						@click="$emit('update:open', false)" />
				</ClientOnly>
			</div>
			<div class="d-flex flex-column gap-space-md">
				<section class="d-flex flex-column align-items-center gap-space-base">
					<ClientOnly>
						<Icon
							v-show="isFacetsSelected"
							size="48"
							name="iconoir:cube-dots-solid"
							class="fragments-active" />
						<Icon
							v-show="!isFacetsSelected"
							size="48"
							name="iconoir:cube-dots" />
					</ClientOnly>
					<div class="title">
						<p class="title-zh">查看切面</p>
						<p class="title-en mt-space-xs">View different angles</p>
					</div>
				</section>
				<section class="selector-container">
					<div class="d-flex gap-space-xs selector-type">
						<p>類型</p>
						<p>Types</p>
					</div>
					<div class="d-flex gap-space-xs flex-wrap">
						<!-- TODO: 準備真資料 -->
						<WorkTypeChip
							v-for="facet of fragments"
							:key="facet"
							:type="facet"
							:selected="selectingFacets.includes(facet)"
							@toggle="toggleFacet" />
					</div>
				</section>
				<Button
					size="large"
					class="justify-contents-center"
					@click="$emit('update-fragments', selectingFacets);
						$emit('update:open', false)">
					更新
				</Button>
			</div>
		</div>
	</ModalOverlay>
</template>

<script setup>
defineProps({
	open: {
		type: Boolean,
		default: false,
	},
	fragments: {
		type: Array,
		default: () => [],
	},
	// TODO: prop 接收目前的 fragments
});

// TODO: watch 把 prop 換成 ref

const selectingFacets = ref([]);
const isFacetsSelected = computed(() => {
	return !!selectingFacets.value.length;
})

function toggleFacet(facet) {
	if (selectingFacets.value.includes(facet)) {
		selectingFacets.value = selectingFacets.value.filter(f => f !== facet)
	} else {
		selectingFacets.value.push(facet)
	}
}

defineEmits(['update-fragments', 'update:open']);
</script>

<style lang="scss" scoped>
.facet-selector {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: $z-index-common-modal;
	width: 100%;
	max-width: 393px;
	background-color: $color-white;
	border-radius: $radius-base;
	padding: $space-2xl;
	border: 1px solid $color-neutral-900;

	.close {
		cursor: pointer;
	}

	.title {
		text-align: center;

		.title-zh {
			font-size: $font-size-lg;
		}

		.title-en {
			font-size: $font-size-sm;
		}
	}

	.selector-container {
		border-radius: $radius-xs;
		border: 1px solid $color-neutral-900;
		padding: $space-base $space-sm $space-md $space-sm;

		.selector-type {
			font-size: $font-size-sm;
			margin-bottom: $space-base;
		}
	}
}
</style>

<template>
	<div class="container">
		<div v-if="isDataReady">
			<section class="facets-container">
				<div class="facet-intro">
					<div class="d-flex flex-column gap-space-md intro">
						<p class="title">Place for my other facets</p>
						<div class="tagline">
							<p>主軸之外的創作延伸，我其他面向的片段</p>
							<p>Documenting extensions of my work beyond the main focus, presenting fragments of different facets.</p>
						</div>
					</div>
					<div
						class="d-flex flex-column gap-space-xs facet-selector"
						@click="isFacetSelectorOpen = true">
						<div class="d-flex align-items-center justify-contents-space-between header">
							<div class="d-flex gap-space-xs">
								<span class="title-zh">選擇切面</span>
								<span>View different angles</span>
							</div>
							<ClientOnly>
								<Icon
									size="24"
									:name="isFacetsSelected ? 'iconoir:cube-dots-solid' : 'iconoir:cube-dots'"
									:class="{'facets-active': isFacetsSelected}" />
							</ClientOnly>
						</div>
						<div class="text-muted now-selects">
							<span v-if="!selectingFacets.length || selectingFacets.length === facetsOptions.length">
								全部
							</span>
							<p v-else>
								<span
									v-for="(facet, idx) of selectingFacets"
									:key="facet">
									{{ facet }}
									<span v-if="idx !== selectingFacets.length - 1">, </span>
								</span>
							</p>
						</div>
					</div>
				</div>
				<!-- TODO: 加上 v-for 抓真資料 -->
				<FacetCard
					v-for="facet of facets"
					:key="facet.id"
					:title="facet.title"
					:desc="facet.desc"
					:types="facet.tags"
					:images="facet.images" />
			</section>
		</div>
		<div v-else>
			<Skeleton class="mb-space-2xl" />
			<Skeleton />
		</div>
		<FacetSelector
			v-model:open="isFacetSelectorOpen"
			:facets="facetsOptions"
			@update-facets="updateFacets" />
	</div>
</template>

<script setup>
const isDataReady = ref(false);
const facets = ref([]);
const isFacetSelectorOpen = ref(false);
// TODO: 抓到資料後用 Set 過濾
const facetsOptions = ref(['UIUX', 'FE', 'LANDING_PAGE']);
const selectingFacets = ref([]);
const isFacetsSelected = computed(() => {
	return !!selectingFacets.value.length;
})

const getData = async () => {
	const { data } = await useAsyncData('facets', async () => {
		return queryCollection('facets').all();
	});

	facets.value = data.value;
}

function updateFacets(facets) {
	console.log(facets);
	selectingFacets.value = facets;
}

try {
	await getData();

	// TODO: loading 測試用
	setTimeout(() => {
		isDataReady.value = true;
	}, 1500);
} catch (error) {
	throw createError(error);
}
</script>

<style lang="scss" scoped>
.facets-container {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	gap: $space-xs;

	@include response(sm) {
		grid-template-columns: repeat(2, 1fr);
	}

	@include response(md) {
		grid-template-columns: repeat(3, 1fr);
	}

	@include response(xl) {
		grid-template-columns: repeat(4, 1fr);
		gap: $space-sm;
	}

	.facet-intro {
		background-color: $color-white;
		border-radius: $radius-sm;
		padding: $space-base $space-md;
		border: 1px solid $color-neutral-900;

		.intro {
			padding-bottom: $space-sm;
			margin-bottom: $space-sm;
			border-bottom: 1px solid $color-neutral-900;

			.title {
				font-size: $font-size-lg;
				font-weight: medium;
			}
	
			.tagline {
				font-size: $font-size-md;
				color: $color-text-secondary;
			}
		}


		.facet-selector {
			padding-bottom: $space-base;
			border-bottom: 1px solid $color-neutral-900;
			cursor: pointer;

			.header {
				font-size: $font-size-base;

				.title-zh {
					font-weight: bold;
				}
			}

			.now-selects {
				font-size: $font-size-sm;
			}
		}
	}

	:global(.facets-active) {
		background: linear-gradient(45deg, #E356FF, #5CD6FF, #FFEC5F);
	}
}
</style>

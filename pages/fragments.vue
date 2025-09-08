<template>
	<div class="container">
		<div v-if="isDataReady && fragments.length">
			<MasonryWall
				:items="fragments"
				:ssr-columns="1"
				:column-width="300"
				:gap="16"
				class="fragments-container">
				<template #default="{ item, index }">
					<div
						v-if="index === 0"
						class="facet-intro">
						<div class="d-flex flex-column gap-space-md intro">
							<p class="title">Place for my other creations</p>
							<div class="tagline">
								<p>Documenting extensions of my work beyond the main focus, fragments of my creative in different forms.</p>
							</div>
						</div>
						<!-- <div
							class="d-flex flex-column gap-space-xs facet-selector"
							@click="isFacetSelectorOpen = true">
							<div class="d-flex align-items-center justify-contents-space-between header">
								<div class="d-flex gap-space-xs">
									<span class="title-zh">查看切面</span>
									<span>View different angles</span>
								</div>
								<ClientOnly>
									<Icon
										size="24"
										:name="isFacetsSelected ? 'iconoir:cube-dots-solid' : 'iconoir:cube-dots'"
										:class="{'fragments-active': isFacetsSelected}" />
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
						</div> -->
					</div>
					<FacetCard
						:title="item.title"
						:desc="item.desc"
						:types="item.tags"
						:images="item.images" />
				</template>
			</MasonryWall>
		</div>
		<div v-else>
			<Skeleton class="mb-space-2xl" />
			<Skeleton />
		</div>
		<!-- <FacetSelector
			v-model:open="isFacetSelectorOpen"
			:fragments="facetsOptions"
			@update-fragments="updateFacets" /> -->
	</div>
</template>

<script setup>
import MasonryWall from '@yeger/vue-masonry-wall';

const isDataReady = ref(false);
const fragments = ref([]);
// const isFacetSelectorOpen = ref(false);
// TODO: 抓到資料後用 Set 過濾
// const facetsOptions = ref(['UIUX', 'FE', 'LANDING_PAGE']);
// const selectingFacets = ref([]);
// const isFacetsSelected = computed(() => {
// 	return !!selectingFacets.value.length;
// })

useHead({
	title: 'Fragments'
});

const getData = async () => {
	const { data } = await useAsyncData('fragments', async () => {
		return queryCollection('fragments').all();
	});

	fragments.value = data.value;
}

// function updateFacets(fragments) {
// 	console.log(fragments);
// 	selectingFacets.value = fragments;
// }

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
.fragments-container {
	.facet-intro {
		background-color: $color-white;
		border-radius: $radius-sm;
		padding: $space-base $space-md;
		border: 1px solid $color-neutral-900;
		margin-bottom: $space-md; //Hack the first masonry item

		.intro {
			padding-bottom: $space-sm;
			margin-bottom: $space-sm;
			// border-bottom: 1px solid $color-neutral-900;

			.title {
				font-size: $font-size-lg;
				font-weight: medium;
			}
	
			.tagline {
				font-size: $font-size-md;
				color: $color-text-secondary;
			}
		}


		// .facet-selector {
		// 	padding-bottom: $space-base;
		// 	border-bottom: 1px solid $color-neutral-900;
		// 	cursor: pointer;

		// 	.header {
		// 		font-size: $font-size-base;

		// 		.title-zh {
		// 			font-weight: bold;
		// 		}
		// 	}

		// 	.now-selects {
		// 		font-size: $font-size-sm;
		// 	}
		// }
	}

	// :global(.fragments-active) {
	// 	background: linear-gradient(45deg, #E356FF, #5CD6FF, #FFEC5F);
	// }
}
</style>

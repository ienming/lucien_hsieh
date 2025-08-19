<template>
	<div class="container">
		<div v-if="isDataReady">
			<section class="facets-container">
				<div class="facet-intro"></div>
				<!-- TODO: 加上 v-for 抓真資料 -->
				<FacetCard />
			</section>
		</div>
		<div v-else>
			<Skeleton class="mb-space-2xl" />
			<Skeleton />
		</div>
	</div>
</template>

<script setup>
const isDataReady = ref(false);

const getData = async () => {
	const { data } = await useAsyncData('facets', async () => {
		return queryCollection('facets').all();
	});

	console.log(data);
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

	@include response(md) {
		grid-template-columns: repeat(3, 1fr);
	}

	@include response(lg) {
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>

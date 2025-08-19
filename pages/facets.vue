<template>
	<div class="container">
		<div v-if="isDataReady">
			<section class="facets-container">
				<div class="facet-intro"></div>
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
	grid-template-columns: repeat(4, 1fr);
}
</style>

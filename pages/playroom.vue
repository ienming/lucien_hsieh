<template>
	<div class="container">
		<div v-if="isDataReady">
			<!-- TODO: 測試 -->
			<ul>
				<li
					v-for="work of works"
					:key="work.title">
					{{ work.title }}
				</li>
			</ul>
		</div>
		<div v-else>
			<Skeleton class="mb-space-xxl" />
			<Skeleton />
		</div>
	</div>
</template>

<script setup>
const isDataReady = ref(false);
const works = ref([]);

const getData = async () => {
	const { data } = await useAsyncData('playroom', async () => {
		return queryCollection('playroom').all();
	});

	works.value = data.value.map(item => ({
		title: item.title,
		image: item.image,
		caption: item.caption,
		tags: item.tags,
		date: item.date,
	}));
}

try {
	await getData();

	setTimeout(() => {
		isDataReady.value = true;
	}, 1500);
} catch (error) {
	throw createError(error);
}
</script>

<template>
	<div class="container">
		<div v-if="isDataReady">
			<ColumnWrapper
				column="4"
				class="images-container sm:grid-template-columns-2">
				<ImageRenderer
					v-for="work of works"
					:key="work.image"
					class="lightbox"
					:alt="work.title"
					:title="work.title"
					:src="work.image"
					@preview="openLightbox(work.image)" />
			</ColumnWrapper>
		</div>
		<div v-else>
			<Skeleton class="mb-space-xxl" />
			<Skeleton />
		</div>
		<Lightbox
			:open="isLightboxVisible"
			:start-idx="currentImg"
			:images="lightboxImages"
			@close="closeLightbox"/>
	</div>
</template>

<script setup>
const isDataReady = ref(false);
const works = ref([]);
const currentImg = ref(0);
const lightboxImages = ref([]);
const isLightboxVisible = ref(false);

const getData = async () => {
	const { data } = await useAsyncData('playroom', async () => {
		return queryCollection('playroom').all();
	});

	data.value.forEach(d => {
		const {title, image, caption, tags, date} = d;

		if (image &&
			!lightboxImages.value.includes(image)) {
			lightboxImages.value.push(image);
		}

		const result = {
			title,
			image,
			caption,
			tags,
			date,
		};
		
		works.value.push(result);
	})
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

function openLightbox(src) {
	const index = lightboxImages.value.indexOf(src);

	if (index !== -1) {
		currentImg.value = index;
		isLightboxVisible.value = true;
		document.body.style.overflow = 'hidden';
	}
}

function closeLightbox() {
	isLightboxVisible.value = false;
	document.body.style.overflow = 'auto';
}
</script>

<style lang="scss" scoped>
.images-container {
	:deep(img) {
		aspect-ratio: 3 / 4;
		object-fit: cover;

	}
}
</style>

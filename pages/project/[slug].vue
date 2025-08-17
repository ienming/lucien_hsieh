<template>
	<div>
		<article
			v-if="isPageDataReady"
			class="project-article">
			<section class="d-grid header">
				<div class="project-intro">
					<p v-if="meta.intros">{{ meta.intros }}</p>
				</div>
				<ProjectMeta :meta="meta" />
			</section>
			<ContentRenderer
				:value="pageData"
				:components="{
					img: prepareContentImages,
				}"
			/>
			<!-- Footer Area -->
			<section class="d-flex justify-contents-end credit-container">
				<ProjectCredit />
			</section>
			<section class="d-flex justify-contents-center align-items-center next-container">
				<!-- TODO: meta 要換成下一個 project 的資料 -->
				<ProjectNext :meta="meta" />
			</section>
		</article>
		<article
			v-else
			class="project-article loading">
			<Skeleton class="mb-space-2xl" />
			<Skeleton />
		</article>
		<Lightbox
			:open="isLightboxVisible"
			:start-idx="currentImg"
			:images="lightboxImages"
			@close="closeLightbox"/>
	</div>
</template>

<script setup>
import ProjectMeta from './partial/ProjectMeta.vue';
import ProjectCredit from './partial/ProjectCredit.vue';
import ProjectNext from './partial/ProjectNext.vue';
import ImageRenderer from '~/components/content/ImageRenderer.vue'
import Lightbox from '~/components/Lightbox.vue';
import { LIGHTBOX_CLASS_NAME } from '~/constants/content';

const pageData = ref({});
const isPageDataReady = ref(false);
const meta = ref({});

const currentImg = ref(0);
const lightboxImages = ref([]);
const isLightboxVisible = ref(false);

const getPageData = async () => {
	const route = useRoute();
	const { slug } = route.params;

	if (!slug) return;

	const { data } = await useAsyncData(`project-${slug}`, async () => {
		return await queryCollection('project').path(`/project/${slug}`).first();
	});
	
	pageData.value = data.value;
	meta.value = data.value?.meta;
};

function prepareContentImages(props) {
	const {src, alt, title, class: className} = props;
						
	if (src &&
		className?.includes(LIGHTBOX_CLASS_NAME) &&
		!lightboxImages.value.includes(src)) {
		lightboxImages.value.push(src);
	}
		
	return h(ImageRenderer, {
		src,
		alt,
		title,
		onPreview: src => openLightbox(src),
	});
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

try {
	await getPageData();

	// TODO: 移除 loading 元件測試用
	setTimeout(() => {
		isPageDataReady.value = true;
	}, 1500);
} catch (error) {
	throw createError(error);
}
</script>

<style lang="scss" scoped>
.project-article {
	max-width: $content-max-width;
	margin: 0 auto;
	padding-top: $space-5xl;

	.header {
		grid-template-columns: auto;

		@include response(md) {
			grid-template-columns: repeat(6, 1fr);
			padding: 0 $space-xl;
		}
		
		.project-intro {
			white-space: pre-wrap;
			grid-column: 1 / 4;
			margin-bottom: $space-xl;
		}
	}

	&.loading {
		min-height: 60vh;
	}

	.credit-container {
		padding-right: $space-lg;
		margin-top: 130px;
		margin-bottom: 272px;
	}

	.next-container {
		margin-bottom: 46px;
	}
}
</style>
<template>
	<div>
		<article
			v-if="isPageDataReady"
			class="project-article">
			<div class="d-grid gap-space-sm header">
				<div>
					<div class="title">
						<h1>{{ pageData.title }}</h1>
						<h2>{{ meta.subtitle }}</h2>
					</div>
					<p v-if="meta.intros">{{ meta.intros }}</p>
				</div>
				<ProjectMeta
					:meta="meta" />
			</div>
			<ContentRenderer
				:value="pageData"
				:components="{
					img: prepareContentImages,
				}"
			/>
			<div class="back-to-index">
				<NuxtLink
					to="/"
					class="link fade-right-link">
					<ClientOnly>
						<Icon name="ant-design:arrow-right-outlined" />
					</ClientOnly>
					INDEX
				</NuxtLink>
			</div>
		</article>
		<article
			v-else
			class="project-article loading">
			<Skeleton class="mb-space-xxl" />
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
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 $space-base;
	margin-top: $space-base;

	.header {
		grid-template-columns: auto;

		@include response(md) {
			grid-template-columns: 3fr 1fr;
			gap: $space-md;
		}

		.title {
			margin-bottom: $space-lg;
		}

		.info {
			margin-bottom: $space-lg;
			
			.link {
				margin-top: $space-lg;
			}
		}

		p {
			white-space: pre-wrap;
		}
	}

	:deep(p) {
		margin-top: $space-sm;
		margin-bottom: $space-sm;
	}

	&.loading {
		min-height: 60vh;
	}

	.back-to-index {
		margin-top: $space-3xl;
		font-size: $font-size-xl;
		
		@include response(md) {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
		}

		.fade-right-link {
			display: inline-flex;
			align-items: center;
			gap: $space-xs;
			grid-column-start: 4;
		}
	}
}
</style>
<template>
	<div>
		<article
			v-if="isPageDataReady"
			class="project-article">
			<div class="d-grid gap-space-sm header">
				<div>
					<h1 class="title">{{ pageData.title }}</h1>
					<p v-if="meta.intros">{{ meta.intros }}</p>
				</div>
				<ProjectMeta
					:meta="meta" />
			</div>
			<ContentRenderer
				:value="pageData"
				:components="{
					img: (props) =>{
						const {src, alt, title} = props;
		
						if (src && !lightboxImages.includes(src)) {
							lightboxImages.push(src);
						}
		
						return h(ImageRenderer, {
							src,
							alt,
							title,
							onPreview: src => openLightbox(src),
						});
					},
				}"
			/>
		</article>
		<article
			v-else
			class="project-article loading">
			<!-- TODO: 加上 Loading 元件 -->
			<span>
				Loading...
			</span>
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

const pageData = ref({});
const isPageDataReady = ref(false);
const meta = ref({});

const currentImg = ref(0);
const lightboxImages = ref([]);
const isLightboxVisible = ref(false);

const getPageData = async () => {
	const route = useRoute();
	const { slug } = route.params;
	const { data } = await useAsyncData(`project-${slug}`, async () => {
		return await queryCollection('project').path(`/project/${slug}`).first();
	});
	pageData.value = data.value;
	meta.value = data.value.meta;
};

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
	isPageDataReady.value = true;
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

    @include response(md) {
        margin-top: $space-xxl;
    }

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
		margin-bottom: $space-base;
	}

	&.loading {
		min-height: 60vh;
	}
}
</style>
<template>
	<div>
		<article class="project-article">
			<Transition
				name="fade"
				mode="out-in">
				<section v-if="isPageDataReady">
					<div>
						<NuxtImg
							:src="projectData.cover"
							class="w-full hero-img" />
					</div>
					<section class="d-grid header">
						<div class="project-intro">
							<p
								v-for="(para, idx) of projectData.introParas"
								:key="idx"
								:class="{'mb-space-base': idx !== projectData.introParas.length - 1}">
								{{ para }}
							</p>
						</div>
						<ProjectMeta
							v-if="!isMobile"
							:title="projectData.title"
							:meta="projectData" />
					</section>
					<section
						v-if="isMobile"
						class="d-flex flex-column gap-space-base project-meta-mobile">
						<div class="d-flex justify-contents-space-between flex-wrap gap-space-base meta-mobile-header">
							<span class="d-flex align-items-center">&lt;Year&gt; {{ projectData.year }}</span>
							<div class="d-flex gap-space-xs flex-wrap align-items-center types">
								&lt;Type&gt;
								<WorkTypeChip
									v-for="tag of projectData.tags" 
									:key="tag"
									:type="tag"
									:clickable="false" />
							</div>
						</div>
						<Link
							v-for="link of projectData.links"
							:key="link.url"
							:url="link.url"
							:label="link.label"
							class="meta-mobile-link" />
					</section>
					<ContentRenderer
						:value="projectData"
						:components="{
							img: prepareContentImages,
						}"
					/>
					<!-- Footer Area -->
					<section class="d-flex credit-container">
						<ProjectCredit :credits="projectData.credits" />
					</section>
					<section class="d-flex justify-contents-center align-items-center next-container">
						<ProjectNext :meta="nextProjectData" />
					</section>
				</section>
				<section
					v-else
					class="skeleton-container">
					<Skeleton
						type="imageProfile"
						class="mb-space-4xl" />
					<div class="pl-space-base pr-space-base w-half">
						<Skeleton class="mb-space-xl" />
						<Skeleton />
					</div>
				</section>
			</Transition>
		</article>
		<Lightbox
			v-model:open="isLightboxVisible"
			:start-idx="currentImg"
			:images="lightboxImages" />
		<PageLockModal
			v-model:open="isPageLockVisible"
			:page-id="route.params.slug"
			:page-title="projectData.title"
			:password="projectData.password"
			@pass="unlockPage" />
	</div>
</template>

<script setup>
import ProjectMeta from '~/components/project/ProjectMeta.vue';
import ProjectCredit from '~/components/project/ProjectCredit.vue';
import ProjectNext from '~/components/project/ProjectNext.vue';
import PageLockModal from '~/components/project/PageLockModal.vue';
import ImageRenderer from '~/components/content/ImageRenderer.vue'
import Lightbox from '~/components/Lightbox.vue';
import Link from '~/components/Link.vue';
import { LIGHTBOX_CLASS_NAME } from '~/constants/content';
import { splitMultiLine, getPageUnlockRecords } from '~/libs/helper';

const route = useRoute();
const {isMobile} = useIsMobile();

const projectData = ref({});
const nextProjectData = ref({});
const isPageDataReady = ref(false);
const currentImg = ref(0);
const lightboxImages = ref([]);
const isLightboxVisible = ref(false);
const isPageLockVisible = ref(false);

const { slug } = route.params;
const { data, error } = await useLazyAsyncData(`project-${slug}`, async () => {
	const project = await queryCollection('project')
		.path(`/project/${slug}`)
		.select('password', 'title', 'tagline', 'year', 'cover', 'credits', 'tags', 'links', 'about', 'intros', 'body')
		.first();

	const projects = await queryCollection('project')
		.where('draft', '=', false)
		.select('title', 'subtitle', 'path', 'tags', 'cover')
		.all();

	const index = projects.findIndex(p => p.path === `/project/${slug}`);
	const nextProject = projects[index + 1] ?? projects[0];

	return { project, nextProject };
});

watch(data, newData => {
	if (!newData) return;

	projectData.value = newData.project;
	nextProjectData.value = newData.nextProject;

	useHead({
		title: projectData.value.title,
	});

	// 整理資料
	projectData.value.introParas = splitMultiLine(projectData.value.intros);

	if (import.meta.client) {
		setTimeout(() => {
			const unlockedRecords = getPageUnlockRecords();
			const isPageUnlocked = !!unlockedRecords[route.params.slug];
	
			if (projectData.value.password && !isPageUnlocked) {
				isPageLockVisible.value = true;
			} else {
				isPageDataReady.value = true;
			}
		}, 300);
	}
}, {
	immediate: true,
});

watch(error, err => {
	if (!err) return;

	showError({
		statusCode: error.value?.statusCode || 400,
		message: error.value?.data?.message || error.value?.message || 'Something went wrong',
		fatal: true,
	});
});

function prepareContentImages(props) {
	const {src, alt, title, desc, class: className} = props;
						
	if (src &&
		className?.includes(LIGHTBOX_CLASS_NAME) &&
		!lightboxImages.value.filter(img => img.url === src).length) {
		lightboxImages.value.push({
			title: title ?? '',
			desc: desc ?? '',
			url: src,
		});
	}
		
	return h(ImageRenderer, {
		src,
		alt,
		title,
		onPreview: src => openLightbox(src),
	});
}

function openLightbox(src) {
	const index = lightboxImages.value.findIndex(img => img.url === src);

	if (index !== -1) {
		currentImg.value = index;
		isLightboxVisible.value = true;
	}
}

function unlockPage() {
	isPageLockVisible.value = false;
	isPageDataReady.value = true;
}
</script>

<style lang="scss" scoped>
.project-article {
	max-width: $content-max-width;
	min-height: 100vh;
	margin: 0 auto;

	.project-meta-mobile {
		margin: $space-base $space-base $space-4xl $space-base;
		padding: $space-sm;
		justify-content: flex-start;

		.meta-mobile-header {
			font-size: $font-size-sm;
		}

		.meta-mobile-link {
			align-self: self-end;
		}
	}

	.header {
		grid-template-columns: auto;
		padding: 0 $space-base;

		@include response(md) {
			grid-template-columns: repeat(6, 1fr);
			padding: 0 $space-xl;
		}
		
		.project-intro {
			grid-column: 1 / 4;
			margin: $space-xl 0 $space-4xl 0;
			font-size: $font-size-md;
			line-height: 1.5;
			text-align: justify;

			@include response(md) {
				font-size: $font-size-lg;
			}
		}
	}

	.hero-img {
		aspect-ratio: 1 / 1.25;
		object-fit: cover;

		@include response(md) {
			aspect-ratio: 9 / 4;
		}
	}

	.credit-container {
		margin-top: 130px;
		margin-bottom: $space-3xl;
		justify-content: center;

		@include response(md) {
			margin-bottom: 272px;
			justify-content: end;
			padding-right: $space-lg;
		}
	}

	.next-container {
		margin-bottom: 46px;
	}

	.skeleton-container {
		position: absolute;
		width: 100%;
	}
}
</style>
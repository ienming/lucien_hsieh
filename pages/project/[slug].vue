<template>
	<div>
		<article
			v-if="isPageDataReady"
			class="project-article">
			<!-- ProjectMeta for mobile -->
			<ProjectMeta
				v-if="isMobile"
				:title="projectData.title"
				:meta="projectData"
				class="project-meta-mobile"
				@open-btm-sheet="isBottomSheetOpen = true" />
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
		</article>
		<article
			v-else
			class="project-article loading">
			<div class="p-space-xl">
				<Skeleton class="mb-space-2xl" />
				<Skeleton />
			</div>
		</article>
		<Lightbox
			v-model:open="isLightboxVisible"
			:start-idx="currentImg"
			:images="lightboxImages" />
		<MetaBottomSheet
			v-if="isPageDataReady"
			v-model="isBottomSheetOpen"
			:title="projectData.title"
			:meta="projectData" />
		<PageLockModal
			v-model:open="isPageLockVisible"
			:page-id="route.params.slug"
			:password="projectData.password"
			@pass="unlockPage" />
	</div>
</template>

<script setup>
import ProjectMeta from '~/components/project/ProjectMeta.vue';
import ProjectCredit from '~/components/project/ProjectCredit.vue';
import ProjectNext from '~/components/project/ProjectNext.vue';
import MetaBottomSheet from '~/components/project/MetaBottomSheet.vue';
import PageLockModal from '~/components/project/PageLockModal.vue';
import ImageRenderer from '~/components/content/ImageRenderer.vue'
import Lightbox from '~/components/Lightbox.vue';
import { LIGHTBOX_CLASS_NAME } from '~/constants/content';
import { splitMultiLine, getPageUnlockRecords } from '~/libs/helper';

const route = useRoute();
const projectData = ref({});
const nextProjectData = ref({});
const isPageDataReady = ref(false);
const {isMobile} = useIsMobile();

const currentImg = ref(0);
const lightboxImages = ref([]);
const isLightboxVisible = ref(false);
const isBottomSheetOpen = ref(false);
const isPageLockVisible = ref(false);

const getPageData = async () => {
	// TODO: 搬到 middleware 配合頁面密碼鎖定作檢查
	const { slug } = route.params;

	if (!slug) return;

	const { data } = await useAsyncData(`project-${slug}`, async () => {
		const project = await queryCollection('project')
			.path(`/project/${slug}`)
			.select('password', 'title', 'tagline', 'year', 'credits', 'tags', 'links', 'about', 'intros', 'body')
			.first();

		const projects = await queryCollection('project')
			.where('draft', '=', false)
			.order('year', 'DESC')
			.select('title', 'subtitle', 'path', 'tags', 'cover')
			.all();

		const index = projects.findIndex(p => p.path === `/project/${slug}`);
		const nextProject = projects[index + 1] ?? projects[0];

		return { project, nextProject };
	})
	
	projectData.value = data.value.project;
	nextProjectData.value = data.value.nextProject;

	// 整理資料
	projectData.value.introParas = splitMultiLine(projectData.value.intros);
};

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

try {
	await getPageData();

	setTimeout(() => {
		const unlockedRecords = getPageUnlockRecords();
		const isPageUnlocked = !!unlockedRecords[route.params.slug];

		if (projectData.value.password && !isPageUnlocked) {
			isPageLockVisible.value = true;
		} else {
			isPageDataReady.value = true;
		}
	}, 300);
} catch (error) {
	throw createError(error);
}
</script>

<style lang="scss" scoped>
.project-article {
	max-width: $content-max-width;
	margin: 0 auto;

	@include response(md) {
		padding-top: $space-5xl;
	}

	.project-meta-mobile {
		position: initial;
		margin-bottom: $space-base;
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
			margin-bottom: $space-xl;
			text-align: justify;
		}
	}

	&.loading {
		min-height: 60vh;
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
}
</style>
<template>
	<section class="mb-space-6xl">
		<Workbench :projects="allProjects" />
		<HeroIntro />
		<h1
			id="allWorksH1"
			class="container all-works-h1">All works</h1>
		<section v-if="error">
			Something went wrong...
		</section>
		<section v-else-if="allProjects.length">
			<!-- TODO: 可以考慮加上按鈕切換 list view / card view -->
			<div
				v-if="filters.length"
				class="d-flex align-items-center gap-space-xs flex-wrap ml-space-sm container filter-container">
				<span class="text-muted">Tagged with</span>
				<Chip
					v-for="filter of filters"
					:key="filter"
					:label="WORK_TYPES[filter].id"
					:closable="true"
					@click="removeFilter(filter)" />
			</div>
			<div @mouseleave="handleProjectHoverEnd">
				<ul class="d-flex flex-column align-items-center project-list">
					<TransitionGroup name="fade">
						<ImageListItem
							v-for="project of projects"
							:key="project.id"
							:title="project.title"
							:sub-title="project.subTitle"
							:tagline="project.tagline"
							:cover="project.cover"
							:year="project.year"
							:tags="project.tags"
							class="w-full"
							@mouse-enter-item="handleProjectHoverStart(project.id)"
							@filter-by-tag="filterProject"
							@click="GoToProject(project.id)" />
					</TransitionGroup>
				</ul>
				<Transition name="slide-from-right">
					<KeyImage
						v-if="!isMobile && nowImgUrl"
						:url="nowImgUrl"
						:tagline="nowProject.tagline ? nowProject.tagline : 'Find out the process...'"
						@click="GoToProject(nowProject.id)" />
				</Transition>
			</div>
		</section>
		<section v-else>
			<Skeleton class="mb-space-2xl" />
			<Skeleton />
		</section>
	</section>
</template>

<script setup>
import Workbench from '~/components/index/Workbench.vue';
import HeroIntro from '~/components/index/HeroIntro.vue';
import { WORK_TYPES } from '~/constants/content';

useHead({
	title: 'Lucien Hsieh',
	titleTemplate: null,
});
const router = useRouter();
const {isMobile} = useIsMobile();

const nowProject = ref({});
const nowImgUrl = ref('');
const filters = ref([]);

const { data: allProjects, error } = await useAsyncData('works', async () => {
	const allResults = await queryCollection('project')
		.where('draft', '=', false)
		.select('path', 'title', 'subtitle', 'tagline', 'year', 'type', 'tags', 'cover', 'mineral')
		.all();

	return allResults.map(project => ({
		id: project.path.split('/')[2],
		title: project.title,
		subTitle: project.subtitle,
		tagline: project.tagline,
		year: String(project.year),
		type: project.type,
		tags: project.tags,
		cover: project.cover,
		mineral: project.mineral,
	}));
});

const projects = computed(() => {
	if (!filters.value.length) {
		return allProjects.value;
	}

	const results = [];

	for (let i = 0; i < filters.value.length; i ++) {
		const filter = filters.value[i];
		for (let j = 0; j < allProjects.value.length; j++) {
			const nowProject = allProjects.value[j];

			if (nowProject.tags.includes(filter) &&
				!results.includes(nowProject)) {
				results.push(nowProject);
			}
		}
	}

	return results;
});

function handleProjectHoverStart(id) {
	const targetProject = findTargetProject(id);
	nowImgUrl.value = targetProject.cover;
	nowProject.value = targetProject;
}

function handleProjectHoverEnd() {
	nowProject.value = {};
	nowImgUrl.value = '';
}

function findTargetProject(id) {
	return projects.value.find(project => project.id === id);
}

function filterProject(tag) {
	if (filters.value.includes(tag)) {
		return;
	}

	filters.value.push(tag);
}

function removeFilter(tag) {
	const filterIndex = filters.value.findIndex(item => item === tag);
	filters.value.splice(filterIndex, 1);
}

function GoToProject(id) {
	router.push(`/project/${id}`);
}
</script>

<style lang="scss" scoped>
.all-works-h1 {
	font-size: $font-size-xl;
	padding: $space-md;
	padding-top: 80px;
	border-radius: $radius-sm;
	background: linear-gradient(270deg, $color-neutral-900, $color-neutral-950);
	color: $color-neutral-200;

	@include response(lg) {
		font-size: $font-size-4xl;
		padding-top: 180px;
	}
}

.filter-container {
	position: relative;
	z-index: 1;
}

.project-list {
	gap: $space-sm;

	@include response(md) {
		gap: 0;
	}
}
</style>

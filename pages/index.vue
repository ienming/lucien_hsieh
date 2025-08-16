<template>
	<div>
		<div
			v-if="filters.length"
			class="d-flex align-items-center gap-space-xs flex-wrap ml-space-sm container filter-container">
			<span class="text-muted">Filter by</span>
			<Chip
				v-for="filter of filters"
				:key="filter"
				:label="filter" 
				@close="removeFilter(filter)" />
		</div>
		<ul class="img-list">
			<TransitionGroup name="fade">
				<ImageListItem
					v-for="project of projects"
					:key="project.id"
					:title="project.title"
					:sub-title="project.subTitle"
					:cover="project.cover"
					:year="project.year"
					:tags="project.tags"
					@mouse-enter-item="handleImgEnter(project.cover)"
					@mouse-leave-item="handleImgLeave(project.cover)"
					@filter-by-tag="filterProject"
					@click="GoToProject(project.id)" />
			</TransitionGroup>
		</ul>
		<KeyImage
			v-if="!isMobile"
			:url="nowHoverImg"/>
	</div>
</template>

<script setup>
const nowHoverImg = ref('');
const allProjects = ref([]);
const filters = ref([]);
const {isMobile} = useIsMobile();

const getPageData = async () => {
	const { data } = await useAsyncData('', async () => {
		return await queryCollection('project').all();
	});

	allProjects.value = data.value.map(project => ({
		id: project.path,
		title: project.title,
		subTitle: project.meta.subtitle,
		year: String(project.meta.date),
		tags: project.meta.tags,
		cover: project.meta.cover,
	}));
};

try {
	await getPageData();
} catch(error) {
	throw createError(error);
}

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

function handleImgEnter(imgUrl) {
	nowHoverImg.value = imgUrl;
}

function handleImgLeave(imgUrl) {
	if (nowHoverImg.value === imgUrl) {
		nowHoverImg.value = '';
	}
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
	const router = useRouter();
	router.push(id);
}
</script>

<style lang="scss" scoped>
.filter-container {
	position: relative;
	z-index: 1;
}

.img-list {
	padding: 0 $space-xs;
}
</style>
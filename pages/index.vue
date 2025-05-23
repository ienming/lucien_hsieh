<template>
    <div>
        <ul class="filters">
          Filter by:
          <li
            v-for="filter of filters"
            :key="filter">
            <span>{{ filter }}</span>
            <span @click="removeFilter(filter)">X</span>
          </li>
        </ul>
        <ul class="img-list">
            <ImageListItem
                v-for="project of projects"
                :key="project.id"
                :title="project.title"
                :sub-title="project.subTitle"
                :year="project.year"
                :tags="project.tags"
                @mouse-enter-item="handleProjectEnter(project.id)"
                @mouse-leave-item="handleProjectLeave(project.id)"
                @filter-by-tag="filterProject"
                @click="GoToProject(project.id)" />
        </ul>
        <KeyImage :id="nowHoverProject"/>
    </div>
</template>

<script setup>
const nowHoverProject = ref();
const allProjects = ref([]);
const filters = ref([]);

const getPageData = async () => {
	const { data } = await useAsyncData('', async () => {
		return await queryCollection('project').all();
	});
  console.log(data.value);
  allProjects.value = data.value.map(project => ({
    id: project.path,
    title: project.title,
    subTitle: project.meta.subtitle,
    year: project.date,
    tags: project.meta.tags,
  }));
};

try {
    await getPageData();
} catch (error) {
    console.log(error);
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
      console.log(nowProject, filter);
      if (nowProject.tags.includes(filter) &&
          !results.includes(nowProject)) {
            results.push(nowProject);
      }
    }
  }

  return results;
});

function handleProjectEnter(key) {
  nowHoverProject.value = key;
}

function handleProjectLeave(key) {
  if (nowHoverProject.value === key) {
    nowHoverProject.value = '';
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
.filters {
  display: flex;
  align-items: center;
  gap: 12px;

  li {
    border: 1px solid #000;
    padding: 8px;
    border-radius: 50px;
  }
}
</style>
<template>
  <div>
      <div class="filters">
        <span>Filter by:</span>
        <span
          v-for="filter of filters"
          :key="filter"
          class="d-flex align-items-center gap-space-xs filter-item">
          <span>{{ filter }}</span>
          <span
            class="close"
            @click="removeFilter(filter)">X</span>
        </span>
      </div>
      <ul class="img-list">
          <ImageListItem
              v-for="project of projects"
              :key="project.id"
              :title="project.title"
              :sub-title="project.subTitle"
              :cover="project.cover"
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
defineEmits(['page-load-fail']);

const getPageData = async () => {
	const { data } = await useAsyncData('', async () => {
		return await queryCollection('project').all();
	});

  // TODO: 調整照片資料
  allProjects.value = data.value.map(project => ({
    id: project.path,
    title: project.title,
    subTitle: project.meta.subtitle,
    year: project.date,
    tags: project.meta.tags,
    cover: project.meta.cover,
  }));
};

try {
    await getPageData();
} catch (error) {
    console.log(error);
    // TODO: 希望可以統一處理錯誤
    emit('page-load-fail');
    
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
  gap: $space-sm;

  .filter-item{
    border: 1px solid $color-text-secondary;
    padding: $space-xxs $space-sm;

    .close {
      cursor: pointer;
      font-size: $font-size-sm;
      border-radius: 50%;
      border-radius: 1px solid $color-text-secondary;
    }
  }
}
</style>
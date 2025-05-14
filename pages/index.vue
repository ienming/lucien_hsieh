<template>
    <div>
        <ul class="img-list">
            <ImageListItem
                v-for="project of projects"
                :key="project.id"
                :title="project.title"
                :sub-title="project.subTitle"
                :year="project.year"
                :tags="project.tags"
                @mouse-enter-item="handleProjectEnter(project.id)"
                @mouse-leave-item="handleProjectLeave(project.id)" />
        </ul>
        <KeyImage :id="nowHoverProject"/>
    </div>
</template>

<script setup>
import { CATEGORIES } from '@/constants/project';

// 移除在地資料前，先用 ref 儲存
const nowHoverProject = ref();

// TODO: 把資料移出去
const projects = ref([
  {
    id: 'iroironairo',
    title: '色々な色',
    subTitle: 'iroironairo: A Data Visualization of Photos in Japan',
    year: '2023',
    tags: [CATEGORIES.DATA_VIZ, CATEGORIES.WEB_DESIGN],
  },
  {
    id: 'alishan',
    title: '阿里山林業鐵路',
    subTitle: 'Alishan Forest Railway pamphlet and flyer',
    year: '2021, 2024',
    tags: [CATEGORIES.EDITORIAL],
  },
]);

function handleProjectEnter(key) {
  nowHoverProject.value = key;
}

function handleProjectLeave(key) {
  if (nowHoverProject.value === key) {
    nowHoverProject.value = '';
  }
}
</script>

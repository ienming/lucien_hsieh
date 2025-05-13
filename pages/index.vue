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
                @mouse-leave-item="handleProjectLeave(project.id)"
                @click="" />
        </ul>
        <KeyImage :id="nowHoverProject"/>
    </div>
</template>

<script>
import {CATEGORIES} from '@/constants/project';

export default {
    data() {
        return {
            nowHoverProject: undefined,
            // TODO: 把資料移出去
            projects: [
                {
                    id: 'iroironairo',
                    title: '色々な色',
                    subTitle: 'iroironairo: A Data Visualization of Photos in Japan',
                    year: '2023',
                    tags: [CATEGORIES.DATA_VIZ, CATEGORIES.WEB_DESIGN],
                },
            ],
        };
    },
    methods: {
        handleProjectEnter(key) {
            console.log(key);
            this.nowHoverProject = key;
        },
        handleProjectLeave(key) {
            if (this.nowHoverProject === key) {
                this.nowHoverProject = '';
            }
        },
    },
};
</script>

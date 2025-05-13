<template>
    <ul class="img-list">
        <ImageListItem
            v-for="project of projects"
            :key="project.id"
            :id="project.id"
            :title="project.title"
            :tags="project.tags"
            @mouse-enter-item="handleProjectEnter(project.id)"
            @mouse-leave-item="handleProjectLeave(project.id)"
            @click="" />
    </ul>
    <KeyImage :id="nowHoverProject"/>
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
                    title: 'iroironairo',
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

<template>
    <Teleport to="body">
        <div
            v-show="open"
            class="lightbox-modal">
            <div class="img-header">
                <h2>{{ title }}</h2>
                <div class="actions">
                    <div
                        class="close"
                        @click="$emit('close')">
                        Close
                    </div>
                </div>
            </div>
            <div class="img-container">
                {{ currentIdx }}
                {{ images }}
                <!-- <NuxtImg :src="url" /> -->
            </div>
            <div class="img-footer">
                <p
                    v-if="caption"
                    class="caption">
                    {{ caption }}
                </p>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { getImg } from '~/libs/helper';

defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    currentIdx: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
        default: () => [],
    },
    // url: {
    //     type: String,
    //     default: '',
    // },
    title: {
        type: String,
        default: '',
    },
    caption: {
        type: String,
        default: '',
    },
});
defineEmits(['close']);

// TODO: images 似乎找不到
// console.log(images);
// const currentImg = getImg({url: images[currentIdx]});
// console.log(currentImg);
</script>

<style scoped lang="scss">
.lightbox-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, .85);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    .img-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        width: 100%;

        .actions {
            cursor: pointer;
        }
    }

    .img-container {
        img {
            max-width: 600px;
        }
    }
}
</style>

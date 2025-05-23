<template>
    <div
        class="lightbox-image"
        :class="{'disabled': !clickable}">
        <NuxtImg 
            :src="url"
            @click="isLightboxOpen = true" />
        <slot />
    </div>
    <Teleport to="body">
        <div
            v-show="isLightboxOpen"
            class="lightbox-modal">
            <div class="img-header">
                <h2>{{ title }}</h2>
                <div class="actions">
                    <div
                        class="close"
                        @click="isLightboxOpen = false">
                        Close
                    </div>
                </div>
            </div>
            <div class="img-container">
                <NuxtImg :src="url" />
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
defineProps({
    clickable: {
        type: Boolean,
        default: true,
    },
    url: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    caption: {
        type: String,
        default: '',
    },
});

const isLightboxOpen = ref(false);
</script>

<style lang="scss" scoped>
.lightbox-image {
    margin: $space-sm 0;
    
    img {
        cursor: pointer;
        transition: opacity .3s ease-in-out;

        &:hover {
            opacity: .8;
        }

        &.disabled {
            pointer-events: none;
        }
    }
}

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

    // .img-container {
    //     img {
    //         max-width: 600px;
    //     }
    // }
}
</style>

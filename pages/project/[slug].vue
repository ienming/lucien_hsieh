<template>
    <!-- TODO: 換 loading 效果 -->
    <article
        v-if="isPageDataReady"
        class="container project-article">
        <div class="d-grid gap-space-sm header">
            <div>
                <h1 class="title">{{ pageData.title }}</h1>
                <ProjectMeta
                    class="d-block d-md-none"
                    :meta="meta" />
                <p v-if="meta.intros">{{ meta.intros }}</p>
            </div>
            <ProjectMeta
                class="d-none d-md-block"
                :meta="meta" />
        </div>
        <ContentRenderer
            :value="pageData"
            :components="{
                img: (props) =>{
                    const {src, alt, title} = props;

                    if (src && !lightboxImages.includes(src)) {
                        lightboxImages.push(src);
                    }

                    return h(ImageRenderer, {
                        src,
                        alt,
                        title,
                        onPreview: src => openLightbox(src),
                    });
                },
            }"/>
    </article>
    <div v-else>Page not found</div>
    <Lightbox
        v-if="lightboxImages.length"
        :open="isLightboxVisible"
        :current-idx="currentImg"
        :images="lightboxImages"
        @close="closeLightbox"/>
</template>

<script setup>
import ProjectMeta from './partial/ProjectMeta.vue';
import ImageRenderer from '~/components/content/ImageRenderer.vue'
import Lightbox from '~/components/Lightbox.vue';

const pageData = ref({});
const isPageDataReady = ref(false);
const meta = ref({});

const currentImg = ref(0);
const lightboxImages = ref([]);
const isLightboxVisible = ref(false);

const getPageData = async () => {
    const route = useRoute();
	const { slug } = route.params;
	const { data } = await useAsyncData(`project-${slug}`, async () => {
		return await queryCollection('project').path(`/project/${slug}`).first();
	});
	pageData.value = data.value;
    meta.value = data.value.meta;
};

function openLightbox(src) {
    const index = lightboxImages.value.indexOf(src);

    if (index !== -1) {
        currentImg.value = index;
        isLightboxVisible.value = true;
    }
}

function closeLightbox() {
    isLightboxVisible.value = false;
}

try {
    await getPageData();
    isPageDataReady.value = true;
} catch (error) {
    console.log(error);
}
</script>

<style lang="scss" scoped>
.project-article {
    .header {
        grid-template-columns: auto;

        @media screen and (min-width: 768px) {
            grid-template-columns: 3fr 1fr;
            gap: $space-md;
        }

        .title {
            margin-bottom: $space-lg;
        }

        .info {
            margin-bottom: $space-lg;
            
            .link {
                margin-top: $space-lg;
            }
        }

        p {
            white-space: pre-wrap;
        }
    }

    :deep(p) {
        margin-bottom: $space-base;
    }
}
</style>
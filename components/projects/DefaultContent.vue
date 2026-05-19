<template>
  <div class="default-content">
    <ProjectMeta :description="project.description" :link="project.link" />
    <img
      v-if="project.coverImage"
      :src="project.coverImage"
      :alt="project.name"
      class="modal-cover"
    />
    <div class="modal-content">
      <p v-if="project.description" class="modal-description">
        {{ project.description }}
      </p>
      <a
        v-if="project.link"
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="modal-link"
      >
        {{ t('viewProject') }}
      </a>
      <div v-if="project.images?.length" class="modal-images">
        <figure
          v-for="(img, i) in project.images"
          :key="i"
          class="modal-image-figure"
        >
          <img :src="img.src" :alt="img.caption" class="modal-image" />
          <figcaption v-if="img.caption" class="modal-caption">
            {{ img.caption }}
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectMeta from '~/components/project/ProjectMeta.vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.default-content {
  display: flex;
  flex-direction: column;
}

.modal-cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) var(--spacing-md);
  padding-bottom: var(--spacing-2xl);
}

.modal-description {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
}

.modal-link {
  display: inline-block;
  font-size: 12px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 2px;
  width: fit-content;
  transition: color var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
    border-color: var(--color-text-primary);
  }
}

.modal-images {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.modal-image-figure {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.modal-image {
  width: 100%;
  border-radius: 4px;
}

.modal-caption {
  font-size: 10px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}
</style>

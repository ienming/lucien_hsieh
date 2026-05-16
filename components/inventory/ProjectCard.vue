<template>
  <div class="project-card" :class="`type-${project.type}`">
    <!-- Card Header -->
    <div class="card-header">
      <div class="card-meta">
        <span class="meta-label">Name</span>
        <span class="meta-value">{{ project.name }}</span>
      </div>
      <div class="card-meta">
        <span class="meta-label">No</span>
        <span class="meta-value">{{ project.no }}</span>
      </div>
      <div class="card-meta">
        <span class="meta-label">Medium</span>
        <span class="meta-value">{{ project.medium }}</span>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <!-- Profile 型：純文字 -->
      <div v-if="project.type === 'profile'" class="card-body--profile">
        <p class="profile-text">{{ project.description }}</p>
      </div>

      <!-- Project 型：封面圖 -->
      <div v-else class="card-body--project">
        <img
          v-if="project.coverImage"
          :src="project.coverImage"
          :alt="project.name"
          class="cover-image"
        />
        <!-- 圖片上的文字（第三階段 hover 時會切換） -->
        <div class="cover-overlay">
          <p class="overlay-tagline">{{ project.tagline }}</p>
          <p class="overlay-sub">{{ project.taglineSub }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.project-card {
  background: var(--color-surface);
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: 0 2px 16px var(--color-card-shadow);
  width: 100%;
  max-width: var(--card-max-width);
  transition: box-shadow var(--transition-base);

  // 第三階段 hover 3D 效果的容器設定
  // transform-style: preserve-3d 會在第三階段加入
}

// ─── Card Header ──────────────────────────────────────
.card-header {
  display: flex;
  gap: var(--spacing-xl);
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 9px;
  color: var(--color-text-faint);
  letter-spacing: 0.06em;
}

.meta-value {
  font-size: 12px;
  color: var(--color-text-primary);
}

// ─── Card Body ────────────────────────────────────────
.card-body {
  position: relative;
}

// Profile 型
.card-body--profile {
  padding: var(--spacing-lg) var(--spacing-md);
  min-height: 200px;
}

.profile-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
}

// Project 型
.card-body--project {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-border); // 圖片載入前的佔位色
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--spacing-md);

  // 漸層讓文字可讀
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    transparent 50%
  );
}

.overlay-tagline {
  font-size: 18px;
  color: #fff;
  font-style: italic;
  line-height: 1.3;
  margin-bottom: 4px;
}

.overlay-sub {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.04em;
}
</style>

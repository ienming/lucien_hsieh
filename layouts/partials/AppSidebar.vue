<script setup>
import EnvironmentPanel from './EnvironmentPanel.vue';

const { projects, currentIndex, progressLabel, goTo } = useProjects();
const { isCoordinateModalOpen } = useCoordinate();
const { t } = useI18n();
const hoveredIndex = ref(null);

const visibleDots = computed(() => {
	const total = projects.value.length;
	const cur = currentIndex.value;

	if (total <= 5) {
		return projects.value.map((p, i) => ({ ...p, index: i }));
	}

	let start = Math.max(0, cur - 2);
	let end = Math.min(total - 1, cur + 2);

	if (end - start < 4) {
		if (start === 0) end = Math.min(total - 1, 4);
		if (end === total - 1) start = Math.max(0, total - 5);
	}

	return projects.value.slice(start, end + 1).map((p, i) => ({ ...p, index: start + i }));
});
</script>

<template>
	<aside class="app-sidebar">
		<span
			class="nav-link"
			@click="isCoordinateModalOpen = true"
			>{{ t('work_category') }}</span
		>
		<EnvironmentPanel />
		<section class="progress-hint">
			<ul class="dot-list">
				<li
					v-for="project in visibleDots"
					:key="project.id"
					class="dot-item"
					:class="{
						'is-active': project.index === currentIndex,
						'is-near': Math.abs(project.index - currentIndex) === 1,
						'is-far': Math.abs(project.index - currentIndex) >= 2,
					}"
					@click="goTo(project.index)"
					@mouseenter="hoveredIndex = project.index"
					@mouseleave="hoveredIndex = null"
				>
					<span
						class="dot-label desktop-only"
						:class="{
							'is-visible':
								project.index === currentIndex || project.index === hoveredIndex,
							'is-hovered':
								project.index === hoveredIndex && project.index !== currentIndex,
						}"
					>
						{{ project.name }}
					</span>
					<span class="dot" />
				</li>
			</ul>

			<!-- 進度數字 -->
			<div class="progress-label">{{ progressLabel }}</div>
		</section>
	</aside>
</template>

<style lang="scss" scoped>
.app-sidebar {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	gap: var(--spacing-sm);

	@media (min-width: 768px) {
		position: fixed;
		right: var(--spacing-sm);
		top: 50%;
		z-index: var(--z-index-common-fixed);
		transform: translateY(-50%);
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
	}
}

.progress-hint {
	@media (min-width: 768px) {
		margin-top: 20px;
	}
}

.dot-list {
	display: none;

	@media (min-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
}

.dot-item {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: var(--spacing-sm);
	cursor: pointer;

	&.is-active .dot {
		width: 8px;
		height: 8px;
		background-color: var(--color-text-primary);
		opacity: 1;
	}

	&.is-near .dot {
		width: 6px;
		height: 6px;
		background-color: var(--color-text-muted);
		opacity: 0.6;
	}

	&.is-far .dot {
		width: 5px;
		height: 5px;
		background-color: var(--color-text-faint);
		opacity: 0.35;
	}
}

.dot {
	border-radius: 50%;
	flex-shrink: 0;
	transition:
		width var(--transition-base),
		height var(--transition-base),
		opacity var(--transition-base),
		background-color var(--transition-base);
}

.dot-label {
	font-size: 12px;
	font-family: 'Courier Prime';
	color: var(--color-text-primary);
	letter-spacing: 0.04em;
	white-space: nowrap;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.2s ease;

	&.is-visible {
		opacity: 1;
	}

	&.is-hovered {
		color: var(--color-text-muted);
	}
}

.desktop-only {
	@media (max-width: 767px) {
		display: none;
	}
}

.progress-label {
	text-align: right;
	font-size: 20px;

	@media (min-width: 768px) {
		font-size: 28px;
		margin-block-start: 16px;
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateX(-4px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>

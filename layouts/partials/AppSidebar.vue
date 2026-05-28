<template>
	<aside class="app-sidebar">
		<nav class="app-nav">
			<!-- TODO -->
			<!-- <div class="view">
				<button class="nav-link">CARD</button>
				/
				<button class="nav-link">LIST</button>
			</div>
			<button class="nav-link">{{ t('fileExplorer') }}</button> -->
		</nav>
		<div class="env-section">
			<button
				class="nav-link env-trigger"
				@click="togglePanel"
			>
				{{ t('environment') }}
			</button>

			<EnvironmentPanel
				:is-open="isEnvOpen"
				:language="language"
				:is-dark="isDark"
				@close="closePanel"
				@toggle-language="toggleLanguage"
				@toggle-theme="toggleTheme"
			/>
		</div>
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
					<span class="dot" />
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
				</li>
			</ul>

			<!-- 進度數字 -->
			<div class="progress-label">{{ progressLabel }}</div>
		</section>
	</aside>
</template>

<script setup>
import EnvironmentPanel from './EnvironmentPanel.vue';

const { projects, currentIndex, progressLabel, goTo } = useProjects();
const hoveredIndex = ref(null);
const { isEnvOpen, language, isDark, togglePanel, closePanel, toggleLanguage, toggleTheme } =
	useEnvironment();
const { t } = useI18n();

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

<style lang="scss" scoped>
.app-sidebar {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	gap: var(--spacing-sm);

	@media (min-width: 768px) {
		align-items: start;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--spacing-sm);
	}
}

.app-nav {
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	gap: 8px;
	height: 100%;
}

.nav-link {
	font-size: 12px;
	font-family: var(--font-mono);
	font-weight: 500;
	color: var(--color-text-muted);
	text-align: left;
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-text-primary);
	}
}

.env-section {
	position: relative;
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
		gap: 16px;
	}
}

.dot-item {
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	cursor: pointer;
	position: relative;

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
	position: absolute;
	left: calc(8px + var(--spacing-sm));
	top: 50%;
	transform: translateY(-50%);
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

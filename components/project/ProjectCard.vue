<script setup>
const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
	clickable: {
		type: Boolean,
		default: true,
	},
});
const emits = defineEmits(['goToProject']);

const { currentProject } = useProjects();
const { openModal, isOpen: isModalOpen } = useModal();
const { t } = useI18n();
const { language } = useEnvironment();

const cardEl = ref(null);
const isHovered = ref(false);
const tiltX = ref(0);
const tiltY = ref(0);

const MAX_TILT = 10;

const projectDesc = computed(() => props.project.description?.[language.value.toLowerCase()]);

// Modal 開啟時重置 hover 狀態，避免卡片 frozen 在橘色 overlay
watch(isModalOpen, (open) => {
	if (open) {
		isHovered.value = false;
		tiltX.value = 0;
		tiltY.value = 0;
	}
});

function onClick() {
	const { project, clickable } = props;

	if (project.no !== currentProject.value.no) {
		emits('goToProject');
		return;
	}

	if (!clickable) {
		return;
	}

	openModal(props.project);
}

function onMouseEnter() {
	isHovered.value = true;
}

function onMouseMove(e) {
	if (!cardEl.value) return;
	const rect = cardEl.value.getBoundingClientRect();
	const cx = rect.width / 2;
	const cy = rect.height / 2;
	tiltY.value = ((e.clientX - rect.left - cx) / cx) * MAX_TILT;
	tiltX.value = -((e.clientY - rect.top - cy) / cy) * MAX_TILT;
}

function onMouseLeave() {
	isHovered.value = false;
	tiltX.value = 0;
	tiltY.value = 0;
}
</script>

<template>
	<div
		ref="cardEl"
		class="project-card"
		:class="[
			`type-${project.type}`,
			{ 'is-hovering': isHovered },
			{ clickable: project.isOpen },
		]"
		@mouseenter="onMouseEnter"
		@mousemove="onMouseMove"
		@mouseleave="onMouseLeave"
		@click="onClick"
	>
		<div class="card-header">
			<div class="card-meta meta-title">
				<span class="meta-label">{{ t('name') }}</span>
				<span class="meta-value">{{ project.name }}</span>
			</div>
			<div class="card-meta meta-no">
				<span class="meta-label">{{ t('no') }}</span>
				<span class="meta-value">{{ project.no }}</span>
			</div>
			<div class="card-meta meta-medium">
				<span class="meta-label">{{ t('medium') }}</span>
				<span class="meta-value">{{ project.medium }}</span>
			</div>
		</div>
		<div class="card-body">
			<div
				v-if="project.type === 'profile'"
				class="card-body--profile"
			>
				<p class="profile-text">{{ projectDesc }}</p>
			</div>
			<div
				v-else
				class="card-body--project"
			>
				<NuxtImg
					v-if="project.coverImage"
					:src="project.coverImage"
					:provider="project.coverImage.startsWith('/imgs') ? null : 'cloudinary'"
					:alt="project.name"
					class="cover-image"
					:class="{ 'is-hidden': isHovered }"
				/>
				<div
					class="hover-overlay"
					:class="{ 'is-visible': isHovered }"
				>
					<p class="hover-description">{{ projectDesc }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.project-card {
	position: absolute;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	background: var(--color-surface);
	border-radius: var(--card-radius);
	overflow: hidden;
	box-shadow: 0 2px 16px var(--color-card-shadow);
	width: 100%;
	max-width: var(--card-max-width);
	height: 85vh;
	opacity: 0;
	transform-origin: top center;
	transform: translateY(200px);
	transition:
		transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
		box-shadow var(--transition-base);

	@media screen and (min-width: 768px) {
		max-height: 540px;
	}

	&.clickable {
		cursor: pointer;
	}

	&.is-hovering {
		transition:
			transform 0.08s linear,
			box-shadow var(--transition-base);
		box-shadow: 0 8px 32px var(--color-card-shadow);
	}
}

.card-header {
	display: flex;
	gap: var(--spacing-sm);
	padding: var(--spacing-md);
	border-bottom: 1px solid var(--color-border);

	@media screen and (min-width: 768px) {
		padding: var(--spacing-sm) var(--spacing-md);
		gap: 0;
	}
}

.card-meta {
	display: flex;
	flex-direction: column;
	gap: 2px;
	width: 100%;

	&.meta-title {
		flex: 3;
	}

	&.meta-no {
		flex: 1;
		@media screen and (min-width: 768px) {
			max-width: 90px;
		}
	}

	&.meta-medium {
		flex: 1;
		max-width: 120px;
	}
}

.meta-label {
	font-size: 12px;
	color: var(--color-text-faint);
	letter-spacing: 0.06em;
}

.meta-value {
	font-size: 16px;
	font-weight: 500;
	color: var(--color-text-primary);
}

.card-body {
	position: relative;
	flex: 1;
}

// Profile 型
.card-body--profile {
	padding: var(--spacing-lg) var(--spacing-md);
	min-height: 200px;
}

.profile-text {
	font-size: 20px;
	line-height: 1.5;
	color: var(--color-text-primary);
	font-family: var(--font-sans);

	@media screen and (min-width: 768px) {
		font-size: 28px;
	}
}

// Project 型
.card-body--project {
	position: relative;
	overflow: hidden;
	background: var(--color-border);
	height: 100%;
}

.cover-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: opacity 0.4s ease;

	&.is-hidden {
		opacity: 0;
	}
}

.hover-overlay {
	position: absolute;
	inset: 0;
	background: var(--color-surface);
	display: flex;
	align-items: flex-start;
	padding: var(--spacing-lg) var(--spacing-md);
	opacity: 0;

	&.is-visible {
		opacity: 1;
	}
}

.hover-description {
	font-size: 20px;
	line-height: 1.5;
	color: var(--color-text-primary);
	font-family: var(--font-sans);

	@media screen and (min-width: 768px) {
		font-size: 28px;
	}
}
</style>

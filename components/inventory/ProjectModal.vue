<template>
	<!-- TODO: refactor with ModalOverlay -->
	<Teleport to="body">
		<Transition name="modal-fade">
			<div
				v-if="isOpen"
				class="modal-backdrop"
			/>
		</Transition>
		<Transition :name="scrollTransitionName">
			<div
				v-if="isOpen"
				class="modal-scroll"
				:style="scrollStyle"
				@click="onScrollClick"
			>
				<div
					ref="panelEl"
					class="modal-panel"
					@click.stop
				>
					<div
						class="modal-drag-handle"
						@touchstart.passive="onDragStart"
						@touchmove.prevent="onDragMove"
						@touchend.passive="onDragEnd"
					>
						<div class="drag-pill" />
					</div>

					<div
						class="modal-header"
						@touchstart.passive="onDragStart"
						@touchmove.prevent="onDragMove"
						@touchend.passive="onDragEnd"
					>
						<div class="modal-meta">
							<div class="meta-group">
								<span class="meta-label">{{ t('name') }}</span>
								<span class="meta-value">{{ project?.name }}</span>
							</div>
							<div class="meta-group meta-no">
								<span class="meta-label">{{ t('no') }}</span>
								<span class="meta-value">{{ project?.no }}</span>
							</div>
							<div class="meta-group meta-year">
								<span class="meta-label">{{ t('year') }}</span>
								<span class="meta-value">{{ project?.year }}</span>
							</div>
							<div class="meta-group meta-medium">
								<span class="meta-label">{{ t('medium') }}</span>
								<span class="meta-value">{{ project?.medium }}</span>
							</div>
						</div>
					</div>

					<div class="modal-content-area">
						<component
							:is="contentComponent"
							v-if="contentComponent && project"
							:project="project"
						/>
					</div>

					<div class="credit-container">
						<project-credit :credits="project.credits" />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
import ProjectCredit from '../project/ProjectCredit.vue';

const { isOpen, project, closeModal } = useModal();
const { t } = useI18n();

const contentRegistry = {
	// shyline: resolveComponent('LazyProjectsShylineContent'),
	iroironairo: resolveComponent('LazyProjectsIroironairoContent'),
};
const DRAG_THRESHOLD = 120;

const defaultContent = resolveComponent('LazyProjectsDefaultContent');

const panelEl = ref(null);
const dragY = ref(0);
const touchStartY = ref(0);
const isSnappingBack = ref(false);
const isClosingFromDrag = ref(false);
const skipScrollTransition = ref(false);

const scrollTransitionName = computed(() => (skipScrollTransition.value ? '' : 'modal-slide'));
const scrollStyle = computed(() => {
	if (isClosingFromDrag.value) {
		return { transform: 'translateY(110vh)', transition: 'transform 0.3s ease-in' };
	}
	if (dragY.value > 0) {
		return { transform: `translateY(${dragY.value}px)`, transition: 'none' };
	}
	if (isSnappingBack.value) {
		return {
			transform: 'translateY(0)',
			transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
		};
	}
	return {};
});
const contentComponent = computed(() =>
	project.value ? (contentRegistry[project.value.id] ?? defaultContent) : null,
);

onMounted(() => document.addEventListener('keydown', onKeyDown));
onUnmounted(() => document.removeEventListener('keydown', onKeyDown));

function onScrollClick(e) {
	if (!panelEl.value?.contains(e.target)) closeModal();
}

function onKeyDown(e) {
	if (e.key === 'Escape' && isOpen.value) closeModal();
}

function onDragStart(e) {
	touchStartY.value = e.touches[0].clientY;
	isSnappingBack.value = false;
	isClosingFromDrag.value = false;
}

function onDragMove(e) {
	const delta = e.touches[0].clientY - touchStartY.value;
	dragY.value = Math.max(0, delta);
}

function onDragEnd() {
	if (dragY.value > DRAG_THRESHOLD) {
		isClosingFromDrag.value = true;
		dragY.value = 0;
		setTimeout(() => {
			skipScrollTransition.value = true;
			isClosingFromDrag.value = false;
			closeModal();
			nextTick(() => {
				skipScrollTransition.value = false;
			});
		}, 300);
	} else {
		isSnappingBack.value = true;
		dragY.value = 0;
		setTimeout(() => {
			isSnappingBack.value = false;
		}, 300);
	}
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.45);
	backdrop-filter: blur(4px);
	z-index: var(--z-index-common-modal);
}

.modal-scroll {
	position: fixed;
	inset: 0;
	z-index: calc(var(--z-index-common-modal) + 1);
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

.modal-panel {
	margin-top: 15vh;
	background: var(--color-surface);
	border-radius: 16px 16px 0 0;
	box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.15);
	min-height: 85vh;

	@media (min-width: 768px) {
		margin: 8vh auto;
		width: min(1200px, 90vw);
		border-radius: 16px;
		min-height: auto;
		box-shadow: 0 8px 48px rgba(0, 0, 0, 0.2);
	}
}

.modal-drag-handle {
	display: flex;
	justify-content: center;
	padding: var(--spacing-sm) 0 4px;
	flex-shrink: 0;
	touch-action: none;

	@media (min-width: 768px) {
		display: none;
	}
}

.drag-pill {
	width: 36px;
	height: 4px;
	background: var(--color-border);
	border-radius: 2px;
}

.modal-header {
	position: sticky;
	top: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: var(--color-surface);
	touch-action: none;
	border-radius: 16px 16px 0 0;

	@media (max-width: 767px) {
		cursor: grab;
		&:active {
			cursor: grabbing;
		}
	}
}

.modal-meta {
	display: flex;
	width: 100%;
}

.meta-group {
	display: flex;
	flex-direction: column;
	gap: 2px;
	width: 100%;
	border-left: 1px solid var(--color-border);
	padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);

	&:first-child {
		border-left: none;
		padding-left: var(--spacing-md);

		@media screen and (min-width: 768px) {
			padding-left: var(--spacing-xl);
		}
	}

	&.meta-no,
	&.meta-year {
		max-width: 90px;
	}

	&.meta-medium {
		max-width: 180px;
	}
}

.meta-label {
	font-size: 12px;
	color: var(--color-text-faint);
}

.meta-value {
	font-size: 16px;
	font-weight: 500;
	font-family: var(--font-mono);
	color: var(--color-text-primary);
}

.modal-content-area {
	padding: var(--spacing-md);

	@media screen and (min-width: 768px) {
		padding: var(--spacing-xl);
	}
}

.credit-container {
	padding: var(--spacing-xl);
	margin-top: 80px;
	display: flex;
	justify-content: center;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	opacity: 0;
}

.modal-slide-enter-active {
	transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.modal-slide-leave-active {
	transition: transform 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}

.modal-slide-enter-from,
.modal-slide-leave-to {
	transform: translateY(100vh);
}
</style>

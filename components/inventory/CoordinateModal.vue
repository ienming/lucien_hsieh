<script setup>
import ModalOverlay from '../ModalOverlay.vue';
const { isCoordinateModalOpen } = useCoordinate();

const { projects } = useProjects();
const { t } = useI18n();
const { openModal } = useModal();
const selectedWorkNumber = ref(null);

const filteredProjects = projects.value.filter((item) => item.type === 'project');
const coordinateProjects = Object.values(
	filteredProjects.reduce((acc, current) => {
		if (!acc[current.year]) {
			acc[current.year] = {
				year: current.year,
				projects: [toRaw(current)],
			};
		} else {
			acc[current.year].projects.push(current);
		}
		return acc;
	}, {}),
);

function goToProject(project) {
	openModal(project);
}
</script>

<template>
	<ModalOverlay
		:open="isCoordinateModalOpen"
		transition="slide-from-bottom"
		@update:open="isCoordinateModalOpen = $event"
	>
		<div class="coordinate-modal">
			<div class="coordinate-panel">
				<p>
					This map explores how my practice shifts across media and time. My work operates
					across three layers of understanding: interface systems that shape action,
					narrative systems that structure experience over time, and meaning systems that
					define how information is organized and interpreted.
				</p>
				<p class="coordinate-chart-title">
					{{ t('chart') }} 0-0. {{ t('works_coordinate') }}
				</p>
				<div class="coordinate-chart">
					<div class="chart-body">
						<div class="axis-label y-axis">
							<span>{{ t('digital') }}</span>
							<span>{{ t('physical') }}</span>
						</div>
						<div class="body-panel">
							<div
								v-for="project of coordinateProjects"
								:key="project.year"
								class="year-panel"
							>
								<span class="x-label">{{ project.year }}</span>
								<div
									v-for="work of project.projects"
									:key="work.no"
									tabindex="0"
									class="works"
									:style="{ top: `${100 - work.digitization}%` }"
									@mouseenter="selectedWorkNumber = work.no"
									@mouseleave="selectedWorkNumber = null"
									@focus="selectedWorkNumber = work.no"
									@blur="selectedWorkNumber = null"
									@keydown.enter="selectedWorkNumber ? goToProject(work) : null"
									@click="selectedWorkNumber ? goToProject(work) : null"
								>
									<div class="word-label">[{{ work.no }}]</div>
									<div class="work-dot"></div>
									<div
										class="work-panel"
										:class="{ show: selectedWorkNumber === work.no }"
									>
										<span class="work-panel-name">{{ work.name }}</span>
										<NuxtImg
											:src="work.coverImage"
											:provider="
												work.coverImage.startsWith('/imgs')
													? null
													: 'cloudinary'
											"
											:alt="work.name"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="axis-label x-axis">{{ t('year') }}</div>
				</div>
				<ul>
					<li>digital = interface-based thinking</li>
					<li>physical = material / tactile thinking</li>
				</ul>
			</div>
		</div>
	</ModalOverlay>
</template>

<style lang="scss" scoped>
.coordinate-modal {
	max-width: var(--card-max-width);
	background: var(--color-surface);
	border-radius: 16px;
	padding: var(--spacing-lg);
}

.coordinate-panel {
	width: 100%;
}

.coordinate-chart-title {
	font-size: 14px;
	font-weight: bold;
	text-align: center;
	margin-block-end: var(--spacing-md);
}

.coordinate-chart {
	margin: 0 auto;
	width: 330px;

	.y-axis {
		writing-mode: vertical-rl;
		display: inline-flex;
		justify-content: space-between;
		margin-block-start: var(--spacing-sm);
	}

	.chart-body {
		display: flex;
	}

	.body-panel {
		width: 100%;
		height: 300px;
		display: flex;
		border-left: 1px solid var(--color-text-faint);
		border-bottom: 1px solid var(--color-text-faint);
	}

	.year-panel {
		background-color: var(--color-bg);
		flex: 1;
		position: relative;
		border-right: 1px solid var(--color-border);
	}

	.x-label {
		position: absolute;
		right: 0;
		bottom: calc(var(--spacing-lg) * -1);
		font-size: 12px;
	}

	.x-axis {
		text-align: right;
		margin-block-start: calc(var(--spacing-lg) + var(--spacing-sm));
	}

	.axis-label {
		font-size: 12px;
		color: var(--color-text-muted);
	}
}

.works {
	--work-dot-size: 8px;
	position: absolute;
	right: calc(-0.5 * var(--work-dot-size) - var(--spacing-xs));
	display: flex;
	gap: 4px;
	align-items: center;
	z-index: var(--z-index-common-fixed);
	padding: var(--spacing-xs);
	cursor: pointer;

	.work-dot {
		width: var(--work-dot-size);
		height: var(--work-dot-size);
		border-radius: 50%;
		background-color: var(--color-text-primary);
	}

	.work-panel {
		width: 180px;
		position: absolute;
		padding: var(--spacing-sm);
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 4px;
		top: 30px;
		left: 60%;
		transform: translateY(16px);
		opacity: 0;
		pointer-events: none;
		transition:
			transform 0.3s ease,
			opacity 0.1s ease-in-out;

		&.show {
			opacity: 1;
			transform: translateY(0);
			pointer-events: auto;
		}
	}

	.work-panel-name {
		display: inline-block;
		margin-block-end: var(--spacing-sm);
	}
}
</style>

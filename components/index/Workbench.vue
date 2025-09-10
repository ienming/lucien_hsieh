<template>
	<div class="w-full workbench">
		<canvas ref="canvasRef" />
		<Transition name="slide-from-right">
			<div
				v-if="nowHoverProject"
				class="d-flex flex-column align-items-center work-tooltip">
				<div class="info-card">
					<div class="title">{{ nowHoverProject.title }}</div>
					<div
						v-if="!isMobile"
						class="tagline">{{ nowHoverProject.tagline }}</div>
					<div class="d-flex gap-space-sm align-items-center justify-contents-center tags">
						<WorkTypeChip
							v-for="tag of nowHoverProject.tags"
							:key="tag"
							:type="tag"
							:clickable="false" />
					</div>
				</div>
				<Button
					:to="`/project/${nowHoverProject.id}`"
					class="d-flex gap-space-xs align-items-center hint">
					<span>查看作品 Investigate work</span>
					<span class="shortcut">W</span>
				</Button>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { MINERALS_CONFIG } from '~/constants/matter';
import { getMineralBody } from '~/libs/matterHelper';

const canvasRef = ref(null);
const nowHoverProjectId = ref('');
const {isMobile} = useIsMobile();
//Matter JS
let engine, render, runner;

const { data: projects } = await useAsyncData('workbench', async () => {
	const allResults = await queryCollection('project')
		.where('draft', '=', false)
		.where('mineral', 'IS NOT NULL')
		.select('path', 'title', 'tagline', 'tags', 'mineral')
		.all();

	return allResults.map(project => ({
		id: project.path.split('/')[2],
		title: project.title,
		tagline: project.tagline,
		tags: project.tags,
		mineral: project.mineral,
	}));
});

const nowHoverProject = computed(() => {
	return projects.value.find(project => project.mineral === nowHoverProjectId.value);
});

async function goToProject(e) {
	if (e.code === 'KeyW' && nowHoverProject.value?.title) {
		await navigateTo(`/project/${nowHoverProject.value.id}`)
	}
}

onMounted(async () => {
	if (!import.meta.client) return;
	
	// INIT
	const Matter = await import('matter-js');
	const { Engine, Render, Runner, Bodies, Body, Composite, Mouse,
		MouseConstraint, Events, Query } = Matter;

	const canvasContainer = canvasRef.value.parentElement;
	let { width: canvasWidth, height: canvasHeight } = canvasContainer.getBoundingClientRect();
	const canvasPadding = parseFloat(getComputedStyle(canvasContainer).padding);
	canvasWidth = canvasWidth - canvasPadding * 2;
	canvasHeight = canvasHeight - canvasPadding * 2;

	engine = Engine.create();
	const world = engine.world;
	render = Render.create({
		element: canvasContainer,
		canvas: canvasRef.value,
		engine,
		options: {
			width: canvasWidth,
			height: canvasHeight,
			wireframes: false,
			background: '#E5E5E5',
		}
	});
	runner = Runner.create();
	Runner.run(runner, engine);
	Render.run(render);

	// FLOOR
	const floorHeight = 100;
	const floor = Bodies.rectangle(
		canvasWidth / 2,
		canvasHeight - floorHeight / 2,
		canvasWidth,
		floorHeight,
		{
			isStatic: true,
			restitution: 1,
			friction: 0.1,
			render: {
				visible: false,
			},
		},
	);

	// WALLS
	const thickness = 50;
	const wallRenderConfig = {
		isStatic: true,
		render: {
			visible: false,
		},
	};
	const walls = [
		Bodies.rectangle(canvasWidth/2, -thickness/2, canvasWidth, thickness, wallRenderConfig), // top
		Bodies.rectangle(canvasWidth/2, canvasHeight + thickness/2, canvasWidth, thickness, wallRenderConfig), // bottom
		Bodies.rectangle(-thickness/2, canvasHeight/2, thickness, canvasHeight, wallRenderConfig), // left
		Bodies.rectangle(canvasWidth + thickness/2, canvasHeight/2, thickness, canvasHeight, wallRenderConfig) // right
	];
	Composite.add(world, walls);

	// BODIES
	const rockStartX = canvasWidth / 2;
	const rockScale = isMobile.value ? 0.3 : 0.45;

	const projectBodies = [];
	projects.value.forEach(project => {
		const targetConfig = MINERALS_CONFIG.find(config => config.id === project.mineral);
		if (!targetConfig) return;

		// OVERRIDE
		targetConfig.startX = rockStartX;
		targetConfig.xScale = rockScale;
		targetConfig.yScale = rockScale;

		const body = getMineralBody(targetConfig);
		if (!body) return;
		
		projectBodies.push(body);
		Body.scale(body, rockScale, rockScale);
	});

	// FLOOR
	Events.on(render, 'afterRender', () => {
		const ctx = render.context;
		const { position, bounds } = floor;
		const floorWidth = bounds.max.x - bounds.min.x;
		const floorHeight = bounds.max.y - bounds.min.y;
		const scaleY = 0.4;
		const gradientSpan = canvasWidth * 0.8 < 400 ? canvasWidth * 0.8 : 400; 

		ctx.save();
		ctx.translate(position.x, bounds.min.y);
		ctx.scale(1, scaleY);

		const gradient = ctx.createRadialGradient(
			0, 0, 0,
			0, 0, gradientSpan,
		);
		gradient.addColorStop(0, 'rgba(153,153,153)'); //$color-neutral-500;
		gradient.addColorStop(1, 'rgba(229,229,229)'); //$color-neutral-900;

		ctx.fillStyle = gradient;
		ctx.fillRect(floorWidth * -1 / 2, 0,
			floorWidth, floorHeight / scaleY);

		ctx.restore();
	});

	// MOUSE
	const mouse = Mouse.create(render.canvas);
	const mouseConstraint = MouseConstraint.create(engine, {
		mouse,
		constraint: {
			stiffness: 1.5,
			render: {
				visible: false,
			},
		},
	});
	Composite.add(world, mouseConstraint);
	render.mouse = mouse;

	// MOUSE HOVER
	if (isMobile.value) {
		Events.on(mouseConstraint, 'mousedown', e => {
			detectShowProject(e);
		});
	} else {
		Events.on(mouseConstraint, 'mousemove', e => {
			detectShowProject(e);
		});
	}

	const originalScales = new Map();
	const targetScales = new Map();
	let animating = false;

	function detectShowProject(e) {
		const mousePosition = e.mouse.position;
		const bodiesUnderMouse = Query.point(world.bodies, mousePosition);
		let hoveredBody = null;

		if (bodiesUnderMouse.length) {
			canvasRef.value.style.cursor = 'grab';
			hoveredBody = bodiesUnderMouse[0];
		} else {
			canvasRef.value.style.cursor = 'auto';
		}

		world.bodies.forEach(body => {
			// 紀錄原始 scale
			if (!originalScales.has(body.id)) {
				originalScales.set(body.id, {
					x: body.render.sprite.xScale,
					y: body.render.sprite.yScale,
				});
			}

			// 設定目標 scale
			if (body === hoveredBody) {
				targetScales.set(body.id, {
					x: originalScales.get(body.id).x * 0.8,
					y: originalScales.get(body.id).y * 0.8,
				});
				nowHoverProjectId.value = body.id;
			} else {
				targetScales.set(body.id, { ...originalScales.get(body.id) });
			}
		});

		if (!animating) {
			animating = true;
			requestAnimationFrame(step);
		}
	}

	function step() {
		let stillAnimating = false;

		targetScales.forEach((target, id) => {
			const body = world.bodies.find(b => b.id === id);
			if (!body) return;

			const currX = body.render.sprite.xScale;
			const currY = body.render.sprite.yScale;

			// 線性補間
			const newX = currX + (target.x - currX) * 0.15;
			const newY = currY + (target.y - currY) * 0.15;

			body.render.sprite.xScale = newX;
			body.render.sprite.yScale = newY;

			if (Math.abs(newX - target.x) > 0.001 || Math.abs(newY - target.y) > 0.001) {
				stillAnimating = true;
			}
		});

		if (stillAnimating) {
			requestAnimationFrame(step);
		} else {
			animating = false;
		}
	}

	Events.on(mouseConstraint, 'mouseup', () => {
		canvasRef.value.style.cursor = 'auto';
	})

	// Reset canvas wheel event
	mouseConstraint.mouse.element.removeEventListener('wheel', mouseConstraint.mouse.mousewheel);

	Composite.add(world, [...projectBodies, floor]);

	// Keydown for navigation
	document.addEventListener('keydown', goToProject);

	// TEST debugger
	// openBoundingWireFrame(world, render);
});

onUnmounted(async() => {
	if (import.meta.client && engine) {
		const Matter = await import('matter-js');
		const { Engine, Render, Runner} = Matter;
		Render.stop(render);
		Runner.stop(runner);
		Engine.clear(engine);
	}

	document.removeEventListener('keydown', goToProject);
});
</script>

<style lang="scss" scoped>
.workbench {
	height: calc(80vh - ($space-sm * 2));
	border-radius: $radius-lg;
	padding: $space-base;
	background-color: $color-white;
	border: 1px solid $color-neutral-800;
	overflow: hidden;
	position: relative;

	@include response(md) {
		padding: $space-sm;
	}

	>canvas {
		border-radius: $radius-md;
	}

	.link-to-core-works {
		position: absolute;
		width: max-content;
		right: 50%;
		bottom: $space-lg;
		transform: translateX(50%);
		justify-content: center;
		padding: $space-sm $space-base;
		font-size: $font-size-base;

		@include response(md) {
			width: max-content;
			right: $space-sm;
			bottom: $space-sm;
			transform: unset;
			padding: $space-xs $space-sm;
			font-size: $font-size-base;
		}
	}
}

.work-tooltip{
	--shortcut-size: 24px;
	position: absolute;
	width: 80vw;
	top: $space-lg;
	left: 50%;
	transform: translateX(-50%);

	@include response(sm) {
		max-width: 375px;
	}
	
	@include response(md) {
		max-width: 430px;
		top: $space-md;
	}
	
	.info-card {
		width: 100%;
		background-color: $color-white;
		padding: $space-sm;
		border-radius: $radius-sm;
		border: 1px solid $color-neutral-900;
		display: flex;
		flex-direction: column;
		gap: $space-xs;

		.title {
			text-align: center;
			font-size: $font-size-base;

			@include response(md) {
				font-size: $font-size-md;
			}
		}

		.tagline {
			font-size: $font-size-base;
			line-height: 1.3;
			color: $color-text-secondary;
			text-align: center;
		}
	}

	.hint {
		padding: $space-xs $space-xs $space-xs $space-sm;
		font-size: $font-size-sm;

		.shortcut {
			display: inline-block;
			width: var(--shortcut-size);
			height: var(--shortcut-size);
			margin-left: $space-sm;
			background-color: $color-neutral-400;
			color: $color-neutral-850;
			border-radius: $radius-xs;
			text-align: center;
			line-height: var(--shortcut-size);
		}
	}
}

</style>
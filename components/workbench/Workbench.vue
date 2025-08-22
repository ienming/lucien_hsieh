<template>
	<div class="w-full workbench">
		<div class="w-full d-flex info-container">
			<Transition name="fade">
				<WorkbenchIntro v-if="isMobile ? !nowHoverProject : true" />
			</Transition>
			<Transition name="slide-from-right">
				<div
					v-if="nowHoverProject"
					class="d-flex flex-column gap-space-sm work-tooltip">
					<div class="info-card">
						<div class="title">{{ nowHoverProject.title }}</div>
						<div class="tagline">{{ nowHoverProject.tagline }}</div>
						<div class="d-flex gap-space-sm align-items-center justify-contents-end tags">
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
		<canvas ref="canvasRef"/>
		<Button
			to="/works"
			:type="isMobile ? 'filled' : 'outlined'"
			class="link-to-core-works">
			Find core works in list
			<ClientOnly>
				<Icon name="iconoir:arrow-right" />
			</ClientOnly>
		</Button>
	</div>
</template>

<script setup>
import { MINERALS_CONFIG } from '~/constants/matter';
import { getMineralBody } from '~/libs/matterHelper';
import WorkbenchIntro from '~/components/workbench/WorkbenchIntro.vue';

const { projects } = defineProps({
	projects: {
		type: Array,
		default: () => [],
	},
});

const canvasRef = ref(null);
const nowHoverProjectId = ref('');
const {isMobile} = useIsMobile();

const nowHoverProject = computed(() => {
	return projects.find(project => project.mineral === nowHoverProjectId.value);
});

let engine, render, runner;

async function listenOnInvestigate() {
	await navigateTo(`/project/${nowHoverProject.value.id}`)
}

onMounted(async () => {
	if (!import.meta.client) return;

	// Matter Start
	const Matter = await import('matter-js');
	const { Engine, Render, Runner, Bodies, Body, Composite, Mouse,
		MouseConstraint, Events, Query } = Matter;

	// Setting initial
	const canvasContainer = canvasRef.value.parentElement;
	const { width: canvasWidth, height: canvasHeight } = canvasContainer.getBoundingClientRect();
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

	// Add floor
	const floorHeight = isMobile.value ? 100 : 200;
	const floor = Bodies.rectangle(canvasWidth / 2,
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

	// Add walls
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

	// Add bodies to the world
	const rockStartX = canvasWidth / 2;
	const rockScale = isMobile.value ? 0.3 : 0.45;

	const projectBodies = [];
	projects.forEach(project => {
		const targetConfig = MINERALS_CONFIG.find(config => config.id === project.mineral);
		if (!targetConfig) return;

		// Override
		targetConfig.startX = rockStartX;
		targetConfig.xScale = rockScale;
		targetConfig.yScale = rockScale;

		const body = getMineralBody(targetConfig);
		if (!body) return;
		
		projectBodies.push(body);
		Body.scale(body, rockScale, rockScale);
	});

	// Draw the floor
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

	// Mouse
	const mouse = Mouse.create(render.canvas);
	const mouseConstraint = MouseConstraint.create(engine, {
		mouse,
		constraint: {
			stiffness: 1.8,
			render: {
				visible: false,
			},
		},
	});
	Composite.add(world, mouseConstraint);
	render.mouse = mouse;

	// Mouse hover
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

		const hoveredBody = bodiesUnderMouse.length > 0 ? bodiesUnderMouse[0] : null;

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

	// Reset canvas wheel event
	mouseConstraint.mouse.element.removeEventListener('wheel', mouseConstraint.mouse.mousewheel);

	Composite.add(world, [...projectBodies, floor]);

	// Keydown for navigation
	document.addEventListener('keydown', e => {
		if (e.code === 'KeyW' && nowHoverProject.value?.title) {
			listenOnInvestigate();
		}
	});

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
});
</script>

<style lang="scss" scoped>
.workbench {
	height: calc(100vh - ($space-sm * 2));
	border-radius: $radius-sm;
	border: 1px solid $color-neutral-800;
	overflow: hidden;
	position: relative;

	.link-to-core-works {
		position: absolute;
		width: 90vw;
		right: 50%;
		bottom: $space-lg;
		transform: translateX(50%);
		justify-content: center;

		@include response(md) {
			width: max-content;
			right: $space-sm;
			bottom: $space-sm;
			transform: unset;
		}
	}
}

.info-container {
	position: absolute;
	right: $space-sm;
	top: $space-sm;
	width: calc(100% - ($space-sm * 2));
	flex-direction: column;
	gap: $space-sm;
	pointer-events: none;

	@include response(md) {
		flex-direction: row;
		justify-content: space-between;
		align-items: start;
	}

	.work-tooltip{
		--shortcut-size: 24px;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		align-items: flex-end;
		pointer-events: auto;
	
		@include response(md) {
			max-width: 330px;
		}
		
		.info-card {
			width: 100%;
			background-color: $color-white;
			padding: $space-sm;
			border-radius: $radius-sm;
			border: 1px solid $color-neutral-900;
	
			.title {
				font-size: $font-size-md;
			}
	
			.tagline {
				font-size: $font-size-base;
				color: $color-text-secondary;
			}
		}
	
		.hint {
			padding: $space-sm;
			box-shadow: 0 4px 20px 5px rgba(0, 0, 0, .15);
	
			.shortcut {
				display: inline-block;
				background-color: $color-neutral-400;
				color: $color-neutral-850;
				border-radius: $radius-xs;
				width: var(--shortcut-size);
				height: var(--shortcut-size);
				text-align: center;
				line-height: var(--shortcut-size);
			}
		}
	}
}

</style>

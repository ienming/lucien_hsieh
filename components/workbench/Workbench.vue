<template>
	<div class="w-full workbench">
		<div class="w-full d-flex info-container">
			<Transition name="fade">
				<WorkbenchIntro v-if="isMobile ? !nowHoverProject : true" />
			</Transition>
			<Transition name="fade">
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
					<div class="d-flex gap-space-xs align-items-center hint">
						<!-- TODO: 加上 eventlistener keydown -->
						<span class="shortcut">I</span>
						<span>查看作品 Investigate work</span>
					</div>
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
import { MINERALS_CONFIG, BODY_TYPES } from '~/constants/matter';
import { getMineralBody, openBoundingWireFrame } from '~/libs/matterHelper';
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

// function listenOnInvestigate(projectId) {
// 	document.addEventListener('keydown', e => {
// 		console.log(e);
// 		if (e.code === 'i') {
// 			alert(`Go to ${projectId}`);
// 		}
// 	});
// }

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
	const rockSize = 46;
	const rockStartX = canvasWidth / 2 - rockSize / 2;
	const rockScale = isMobile.value ? 0.3 : 0.45;

	const projectBodies = [];
	projects.forEach(project => {
		const targetConfig = MINERALS_CONFIG.find(config => config.id === project.mineral);
		if (!targetConfig) return;

		// Override
		targetConfig.startX = rockStartX;
		targetConfig.xScale = rockScale;
		targetConfig.yScale = rockScale;
		if (targetConfig.type === BODY_TYPES.CIRCLE) {
			targetConfig.radius = rockSize;
		}

		const body = getMineralBody(targetConfig);
		if (!body) return;
		
		projectBodies.push(body);

		if (targetConfig.type === BODY_TYPES.VERTEX) {
			Body.scale(body, rockScale, rockScale)
		};
	});

	// Draw the floor
	// CHECK: Events
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
	// CHECK: mouse 機制
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
	// CHECK: mouseConstraint
	let hoveredBody;

	if (isMobile.value) {
		Events.on(mouseConstraint, 'mousedown', e => {
			detectShowProject(e);
		});
	} else {
		Events.on(mouseConstraint, 'mousemove', e => {
			detectShowProject(e);
		});
	}

	function detectShowProject(e) {
		const mousePosition = e.mouse.position;
		const bodiesUnderMouse = Query.point(world.bodies, mousePosition);
		
		if (bodiesUnderMouse.length <= 0) return;
		
		const currentHoveredBody = bodiesUnderMouse[0];
		if (currentHoveredBody !== hoveredBody) {
			hoveredBody = currentHoveredBody;
			nowHoverProjectId.value = hoveredBody.id;
		}
	}

	Events.on(mouseConstraint, 'startdrag', () => {
		nowHoverProjectId.value = '';
	});

	// Reset canvas wheel event
	mouseConstraint.mouse.element.removeEventListener('wheel', mouseConstraint.mouse.mousewheel);

	Composite.add(world, [...projectBodies, floor]);

	// TODO: remote TEST
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
	height: 90vh;
	border-radius: $radius-sm;
	border: 1px solid $color-neutral-800;
	overflow: hidden;
	position: relative;

	@include response(md) {
		height: 85vh;
	}

	.link-to-core-works {
		position: absolute;
		width: max-content;
		right: 50%;
		bottom: $space-lg;
		transform: translateX(50%);

		@include response(md) {
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
			border-radius: $radius-round;
			background-color: $color-neutral-50;
			color: $color-white;
			font-size: $font-size-sm;
			box-shadow: 0 4px 20px 5px rgba(0, 0, 0, .15);
	
			.shortcut {
				display: inline-block;
				background-color: $color-white;
				color: $color-neutral-50;
				border-radius: $radius-round;
				width: var(--shortcut-size);
				height: var(--shortcut-size);
				text-align: center;
				line-height: var(--shortcut-size);
			}
		}
	}
}

</style>

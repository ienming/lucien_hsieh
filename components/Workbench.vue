<template>
	<div style="position: fixed; right: 30px; top: 30px;">
		{{ nowHoverProject }}
	</div>
	<div class="w-full workbench">
		<canvas ref="canvasRef"/>
	</div>
</template>

<script setup>
const canvasRef = ref(null);
const nowHoverProject = ref('');
// TODO: 整理這三個變數
let engine, runner, render;

const {isMobile} = useIsMobile();

onMounted(async () => {
	if (!import.meta.client) return;

	// Matter Start
	const Matter = await import('matter-js');
	const { Engine, Render, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events, Query } = Matter;

	engine = Engine.create();
	const world = engine.world;

	const canvasContainer = canvasRef.value.parentElement;
	const { width: canvasWidth, height: canvasHeight } = canvasContainer.getBoundingClientRect();
	render = Render.create({
		element: canvasContainer, // Render into the parent element of the canvas
		canvas: canvasRef.value,
		engine: engine,
		options: {
			width: canvasWidth,
			height: canvasHeight,
			wireframes: false,
			background: '#E5E5E5',
		}
	});

	// CHECK: matter 機制
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
	const rockSize = 40;
	const rockStartX = canvasWidth / 2 - rockSize / 2;
	const rockScale = isMobile.value ? 0.3 : 0.45;

	const vertices1 = [
		{ x: -130, y: -114 },
		{ x: -130, y: -114 },
		{ x: 130, y: -114 },
		{ x: 130, y: 114 },
		{ x: -130, y: 114 }
	];
	const rock = Bodies.fromVertices(rockStartX, 300, vertices1, {
		id: 'my-unique-id-1',
		restitution: 0.2,
		friction: 0.8,
		render: {
			sprite: {
				texture: '/rock-1.png',
				xScale: rockScale,
				yScale: rockScale,
			},
		},
	});
	Body.scale(rock, rockScale, rockScale);

	const rubberBall = Bodies.circle(rockStartX, 100, rockSize, {
		restitution: 0.2,
		friction: 0.05,
		density: 0.01,
		render: {
			sprite: {
				texture: '/rock-2.png',
				xScale: rockScale,
				yScale: rockScale,
			},
		},
	});
	// Body.scale(rubberBall, rockScale, rockScale);

	const rock3 = Bodies.circle(rockStartX, 100, rockSize, {
		restitution: 0.3,
		friction: 0.3,
		render: {
			sprite: {
				texture: '/rock-3.png',
				xScale: rockScale,
				yScale: rockScale,
			},
		},
	});
	// Body.scale(rock3, rockScale, rockScale);

	const vertices4 = [
		{ x: -189, y: -95 },
		{ x: 94, y: -95 },
		{ x: 189, y: 0},
		{ x: 94, y: 95 },
		{ x: -189, y: 95 }
	];
	const rock4 = Bodies.fromVertices(rockStartX, 200, vertices4, {
		restitution: 0.3,
		friction: 0.3,
		render: {
			sprite: {
				texture: '/rock-4.png',
				xScale: rockScale,
				yScale: rockScale,
			},
		},
	});
	Body.scale(rock4, rockScale, rockScale);

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
	Events.on(mouseConstraint, 'mousemove', e => {
		const mousePosition = e.mouse.position;
		const bodiesUnderMouse = Query.point(world.bodies, mousePosition);

		// Reset previous hover state (if any)
		if (hoveredBody && hoveredBody !== bodiesUnderMouse[0]) {
			console.log(`Revert previous body's appearance`);
		}

		// Apply hover state to the new body (if found)
		if (bodiesUnderMouse.length > 0) {
			const currentHoveredBody = bodiesUnderMouse[0];
			if (currentHoveredBody !== hoveredBody) {
				hoveredBody = currentHoveredBody;
				nowHoverProject.value = hoveredBody.id;
				console.log('Apply hover effect', hoveredBody);
				// TODO: 加上縮小的漸變效果
			}
		} else {
			hoveredBody = null;
			nowHoverProject.value = '';
			console.log('No body is currently hovered');
		}
	});

	Events.on(mouseConstraint, 'startdrag', e => {
		const draggedBody = e.body;
		console.log('關掉 tooltip', draggedBody);
	});

	// TEST
	function openRedWireframe() {
		Events.on(render, 'afterRender', function() {
			const ctx = render.context;
	
			ctx.strokeStyle = 'red';
			ctx.lineWidth = 2;
	
			world.bodies.forEach(body => {
				// 畫多邊形碰撞範圍
				ctx.beginPath();
				ctx.moveTo(body.vertices[0].x, body.vertices[0].y);
				for (let i = 1; i < body.vertices.length; i++) {
					ctx.lineTo(body.vertices[i].x, body.vertices[i].y);
				}
				ctx.closePath();
				ctx.stroke();
			});
		});
	}
	openRedWireframe();

	// Reset canvas wheel event
	mouseConstraint.mouse.element.removeEventListener('wheel', mouseConstraint.mouse.mousewheel);

	Composite.add(world, [
		rock,
		rubberBall,
		rock3,
		rock4,
		floor,
	]);
});

onUnmounted(() => {
	if (import.meta.client && engine) {
		Render.stop(render);
		Runner.stop(runner);
		Engine.clear(engine);
	}
});
</script>

<style lang="scss" scoped>
.workbench {
	height: 77vh;
	border-radius: $radius-sm;
	border: 1px solid $color-neutral-800;
	overflow: hidden;
}
</style>

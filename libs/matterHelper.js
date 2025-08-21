import * as Matter from 'matter-js';
import { BODY_TYPES } from '~/constants/matter';

export const mineralsConfig = [
	{
		id: 'moonstone',
		startX: undefined,
		startY: 30,
		type: BODY_TYPES.VERTEX,
		vertices: [
			{ x: -130, y: -114 },
			{ x: -130, y: -114 },
			{ x: 130, y: -114 },
			{ x: 130, y: 114 },
			{ x: -130, y: 114 },
		],
		physics: {
			restitution: 0.2,
			friction: 0.8,
		},
		texture: '/moonstone.png',
		xScale: undefined,
		yScale: undefined,
	},
	{
		id: 'blossom-agate',
		startX: undefined,
		startY: 300,
		type: BODY_TYPES.CIRCLE,
		radius: 40,
		physics: {
			restitution: 0.2,
			friction: 0.05,
		},
		texture: '/blossom-agate.png',
		xScale: undefined,
		yScale: undefined,
	},
	{
		id: 'labradorite-oval',
		startX: undefined,
		startY: 100,
		type: BODY_TYPES.CIRCLE,
		radius: 40,
		physics: {
			restitution: 0.3,
			friction: 0.3,
		},
		texture: '/labradorite-oval.png',
		xScale: undefined,
		yScale: undefined,
	},
	{
		id: 'labradorite-yellow-rectangle',
		startX: undefined,
		startY: 200,
		type: BODY_TYPES.VERTEX,
		vertices: [
			{ x: -189, y: -95 },
			{ x: 94, y: -95 },
			{ x: 189, y: 0},
			{ x: 94, y: 95 },
			{ x: -189, y: 95 }
		],
		physics: {
			restitution: 0.3,
			friction: 0.3,
		},
		texture: '/labradorite-yellow-rectangle.png',
		xScale: undefined,
		yScale: undefined,
	},
];

export function getMineralBody(config) {
	const {id, startX, startY, type, vertices, radius, physics, texture, xScale, yScale} = config;
	let rigidBody;

	if (type === BODY_TYPES.VERTEX) {
		if (!Array.isArray(vertices)) return;

		rigidBody = Matter.Bodies.fromVertices(startX, startY, vertices, {
			id,
			restitution: physics.restitution,
			friction: physics.friction,
			render: {
				sprite: {
					texture,
					xScale,
					yScale,
				},
			},
		});
	}

	if (type === BODY_TYPES.CIRCLE) {
		rigidBody = Matter.Bodies.circle(startX, startY, radius, {
			id,
			restitution: physics.restitution,
			friction: physics.friction,
			render: {
				sprite: {
					texture,
					xScale,
					yScale,
				},
			},
		});
	}

	console.log(rigidBody);
	return rigidBody;
};

export function openBoundingWireFrame(world, render) {
	Matter.Events.on(render, 'afterRender', () => {
		const ctx = render.context;

		ctx.strokeStyle = 'blue';
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
};

import * as Matter from 'matter-js';
import { BODY_TYPES } from '~/constants/matter';

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

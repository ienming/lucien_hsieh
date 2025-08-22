import * as Matter from 'matter-js';
import { BODY_SHRINK_SCALE, BODY_TYPES } from '~/constants/matter';

export function getMineralBody(config) {
	const {id, startX, startY, type, vertices, radius, physics, texture, xScale, yScale} = config;
	let rigidBody;

	if (type === BODY_TYPES.VERTEX) {
		if (!Array.isArray(vertices)) return;

		rigidBody = Matter.Bodies.fromVertices(startX, startY, vertices, {
			id,
			density: physics.density ? physics.density : 1,
			friction: physics.friction ? physics.friction : 1,
			frictionAir: physics.frictionAir ? physics.frictionAir : 1,
			frictionStatic: physics.frictionStatic ? physics.frictionStatic : 1,
			restitution: physics.restitution ? physics.restitution : 1,
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
			density: physics.density ? physics.density : 1,
			friction: physics.friction ? physics.friction : 1,
			frictionAir: physics.frictionAir ? physics.frictionAir : 1,
			frictionStatic: physics.frictionStatic ? physics.frictionStatic : 1,
			restitution: physics.restitution ? physics.restitution : 1,
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

export function shrinkBodyScale(body, scaleMap) {
	const originScale = scaleMap.get(body.id);
	if (!originScale) {
		scaleMap.set(body.id, {
			x: body.render.sprite.xScale,
			y: body.render.sprite.yScale,
		});
	}

	body.render.sprite.xScale *= BODY_SHRINK_SCALE;
	body.render.sprite.yScale *= BODY_SHRINK_SCALE;
}

export function resetBodyScale(body, scaleMap) {
	const originScale = scaleMap.get(body.id);
	if (!originScale) return;

	body.render.sprite.xScale = originScale.x;
	body.render.sprite.yScale = originScale.y;
}

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

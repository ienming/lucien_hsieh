import * as Matter from 'matter-js';

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

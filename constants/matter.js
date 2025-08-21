export const BODY_TYPES = {
	VERTEX: 'VERTEX',
	CIRCLE: 'CIRCLE',
	RECT: 'RECT',
};

export const MINERALS_CONFIG = [
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
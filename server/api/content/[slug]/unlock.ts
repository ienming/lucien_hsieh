import { STATUS_AUTH_INVALID, STATUS_SUCCESS } from "~/constants/system";

export default defineEventHandler(async event => {
	const body = await readBody(event);
	const { slug } = getRouterParams(event);
	const project = await queryCollection(event, 'project')
		.path(`/project/${slug}`)
		.select('password')
		.first();

	if (body.password !== project?.password) {
		return {
			data: null,
			statusCode: STATUS_AUTH_INVALID,
		}
	}

	return { 
		data: null,
		statusCode: STATUS_SUCCESS,
	};
});

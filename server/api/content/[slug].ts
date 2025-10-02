export default defineEventHandler(async event => {
	const { slug } = getRouterParams(event);
	const project = await queryCollection(event, 'project')
		.path(`/project/${slug}`)
		.select('password', 'title')
		.first();

	return {
		title: project?.title,
		needPassword: !!project?.password,
	};
});

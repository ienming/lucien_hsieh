export default defineEventHandler(async event => {
	const { slug } = getRouterParams(event);
	const project = await queryCollection(event, 'project')
		.path(`/project/${slug}`)
		.select('title', 'tagline', 'year', 'cover', 'credits', 'tags', 'links', 'about', 'intros', 'body')
		.first();

	const projects = await queryCollection(event, 'project')
		.where('draft', '=', false)
		.select('title', 'subtitle', 'path', 'tags', 'cover')
		.all();

	const index = projects.findIndex(p => p.path === `/project/${slug}`);
	const nextProject = projects[index + 1] ?? projects[0];

	return { project, nextProject };
});

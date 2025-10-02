export default defineNuxtRouteMiddleware(to => {
	const validPages = ['index', 'project-slug'];

	if (!validPages.includes(to.name)) return navigateTo('/');
});
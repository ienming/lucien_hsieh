export default defineNuxtRouteMiddleware((to) => {
	const validPages = ['index'];

	if (!validPages.includes(to.name)) return navigateTo('/');
});

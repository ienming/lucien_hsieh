export default defineNuxtRouteMiddleware((to) => {
	const knownRoutes = ['/', '/info', '/playroom', '/project'];

	if (!knownRoutes.some((path) => to.path.startsWith(path))) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
		});
	}
})

export default defineNuxtRouteMiddleware(to => {
	const config = useRuntimeConfig();
	const isMaintenance = config.public.maintenanceMode;

	if (isMaintenance && to.path !== '/maintenance') {
		return navigateTo('/maintenance');
	}
})

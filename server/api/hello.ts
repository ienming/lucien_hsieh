export default defineEventHandler((event) => {
	// TODO: 改成 queryCollection
	// https://content.nuxt.com/docs/utils/query-collection#server-usage
	return {
		hello: 'world',
	};
});

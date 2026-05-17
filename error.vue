<template>
	<div class="container error">
		<div v-if="error.statusCode === 404">
			<h2>404 page not found</h2>
		</div>
		<div v-else>
			<h2>{{ error.statusCode }}</h2>
		</div>
		<p>{{ error.message }}</p>
		<Button
			@click="handleError">
			Clear errors
		</Button>
	</div>
</template>

<script setup>
defineProps({
	error: {
		type: Object,
		required: true
	}
});

const handleError = () => clearError({ redirect: '/' });
</script>

<style lang="scss" scoped>
.container.error {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	min-height: 50vh;
	gap: $space-base;
}
</style>

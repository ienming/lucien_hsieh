<template>
	<DefaultHeader />
	<div class="container error">
		<ClientOnly>
			<Icon
				name="ant-design:smile-outlined"
				size="48" />
		</ClientOnly>
		<div v-if="error.statusCode === 404">
			<h2>404 page not found</h2>
		</div>
		<div v-else>
			<h2>{{ error.statusCode }}</h2>
		</div>
		<button
			class="custom-btn"
			@click="handleError">Clear errors</button>
	</div>
	<DefaultFooter />
</template>

<script setup>
import DefaultHeader from '~/layouts/partials/DefaultHeader';
import DefaultFooter from '~/layouts/partials/DefaultFooter';

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

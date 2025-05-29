<template>
	<div class="empty">
		<ClientOnly v-if="icon">
			<Icon
				:name="icon"
				size="24" />
		</ClientOnly>
		<p>{{ msg }}</p>
	</div>
</template>

<script setup>
defineProps({
	msg: {
		type: String,
		default: 'To Be Continued...',
	},
	icon: {
		type: String,
		default: '',
	},
});
</script>

<style lang="scss" scoped>
.empty {
	display: flex;
	align-items: center;
	gap: $space-sm;
}
</style>

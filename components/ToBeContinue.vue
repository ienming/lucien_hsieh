<template>
	<div class="to-be-continue">
		<ClientOnly v-if="icon">
			<Icon
				:name="icon"
				size="24" />
		</ClientOnly>
		<h2>{{ msg }}</h2>
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
.to-be-continue {
	display: flex;
	align-items: center;
	gap: $space-sm;
}
</style>

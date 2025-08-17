<template>
	<Teleport to="body">
		<Transition name="fade">
			<div
				v-if="open"
				class="common-modal-overlay">
				<div class="mobile-menu">
					<span class="close">
						Mobile menu
					</span>
					<div class="close">
						<ClientOnly>
							<Icon
								name="iconoir:xmark"
								@click="$emit('close')" />
						</ClientOnly>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});

defineEmits(['close']);
</script>

<style lang="scss" scoped>
.mobile-menu {
	background-color: $color-neutral-100;
	color: $color-white;
	padding: $space-xl;
	border-radius: $radius-base;
	height: 100dvh;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: $z-index-common-modal;

	.clsoe {
		&:hover {
			opacity: $opacity-50;
		}
	}
}
</style>

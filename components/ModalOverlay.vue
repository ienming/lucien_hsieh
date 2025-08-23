<template>
	<Teleport to="body">
		<Transition name="fade">
			<div
				v-if="isOverlayOpen"
				class="overlay"
				:class="[attrs.class]"
				@click.self="$emit('update:open', false)">
				<Transition
					:name="transition"
					mode="out-in">
					<slot v-if="isModalOpen" />
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup>
defineOptions({
	inheritAttrs: false
});
const {open} = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
	transition: {
		type: String,
		default: 'fade',
	},
});
defineEmits(['update:open']);
const attrs = useAttrs();
const isOverlayOpen = ref(false);
const isModalOpen = ref(false);
const delayTime = 350;

watch(() => open, newVal => {
	if (newVal){
		// TODO: 如果打開 modal 的情況下按上一頁，這邊就會因為被鎖住而無法滾動
		document.body.style.overflow = 'hidden';
		isOverlayOpen.value = true;
		setTimeout(() => {
			isModalOpen.value = true;
		}, delayTime)
	} else {
		document.body.style.overflow = 'auto';
		isModalOpen.value = false;
		setTimeout(() => {
			isOverlayOpen.value = false;
		}, delayTime)
	}
});
</script>

<style lang="scss" scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	z-index: $z-index-common-modal;
	overflow: auto;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, .5);
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
}
</style>
<template>
	<Teleport to="body">
		<Transition name="fade">
			<div
				v-if="isOverlayOpen"
				class="overlay"
				:class="[attrs.class]"
				@click.self="overlayClosable ? $emit('update:open', false) : null">
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
	overlayClosable: {
		type: Boolean,
		default: true,
	},
	transition: {
		type: String,
		default: 'fade',
	},
});
const emits = defineEmits(['update:open']);
const attrs = useAttrs();
const router = useRouter();

const isOverlayOpen = ref(false);
const isModalOpen = ref(false);
const delayTime = 350;

watch(() => open, newVal => {
	if (newVal){
		freezeBody();
		isOverlayOpen.value = true;
		setTimeout(() => {
			isModalOpen.value = true;
		}, delayTime)
	} else {
		unfreezeBody();
		isModalOpen.value = false;
		setTimeout(() => {
			isOverlayOpen.value = false;
		}, delayTime)
	}
});

function freezeBody() {
	document.body.style.overflow = 'hidden';
}

function unfreezeBody() {
	document.body.style.overflow = 'auto';
}

const closeAfterNavigation = router.afterEach(() => {
	emits('update:open', false);
});

onUnmounted(() => {
	unfreezeBody();
	closeAfterNavigation();
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
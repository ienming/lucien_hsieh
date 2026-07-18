<script setup>
import { watch, useAttrs, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
	inheritAttrs: false,
});

const props = defineProps({
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

watch(
	() => props.open,
	(newVal) => {
		if (newVal) {
			freezeBody();
		} else {
			unfreezeBody();
		}
	},
);

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

<template>
	<Teleport to="body">
		<Transition
			name="fade"
			appear
		>
			<div
				v-if="props.open"
				class="modal-backdrop"
				@click="props.overlayClosable ? $emit('update:open', false) : null"
			/>
		</Transition>
		<Transition
			:name="props.transition"
			appear
		>
			<div
				v-if="props.open"
				class="modal-content-wrapper"
				:class="[attrs.class]"
				@click.self="props.overlayClosable ? $emit('update:open', false) : null"
			>
				<slot />
			</div>
		</Transition>
	</Teleport>
</template>

<style lang="scss" scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	z-index: var(--z-index-common-modal);
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
}

.modal-content-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	z-index: calc(var(--z-index-common-modal) + 1);
	width: 100vw;
	height: 100vh;
	overflow: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

<template>
	<div
		ref="aboutCard"
		class="about modal-clip-mask">
		<section>
			<div class="info-card">
				<div class="close">
					<ClientOnly>
						<Icon
							name="iconoir:xmark"
							@click="handleClose" />
					</ClientOnly>
				</div>
				<div class="d-flex flex-column gap-space-sm common-paragraph">
					<p>
						Lucien Hsieh 謝明倫，有三年前端開發與網頁設計經驗，透過網頁互動，把想法轉化為實際體驗。
					</p>
					<p>
						Hi, I'm Lucien Hsieh. I bring creative ideas to life through web experiences. With 3 years of experience in design-led front-end development, I combine design and code to craft unique, engaging experiences that connect with audiences.
					</p>
				</div>
			</div>
			<ContactCard />
			<EducationCard />
		</section>
	</div>
</template>

<script setup>
import gsap from 'gsap';

const {open} = defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['update:open']);
const router = useRouter();
const aboutCardRef = useTemplateRef('aboutCard');
let closeAfterNavigate = null;
let ctx;

watch(() => open, async(newVal) => {
	await nextTick();
	if (newVal){
		revealModal();
	}
}, {
	immediate: true,
});

// TODO: check
onMounted(() => {
	closeAfterNavigate = router.afterEach(() => {
		emits('update:open', false);
	});
});

onUnmounted(() => {
	if (closeAfterNavigate) closeAfterNavigate();
	ctx?.revert();
});

function revealModal() {
	if (!aboutCardRef.value) return;

	ctx = gsap.context(() => {
		gsap.to(aboutCardRef.value, {
			clipPath: 'inset(0% 0% 0% 0% round 6px)',
			ease: 'power4.out',
			duration: 0.8,
		});
	});
}

function handleClose() {
	if (!aboutCardRef.value) return;

	ctx = gsap.context(() => {
		gsap.to(aboutCardRef.value, {
			clipPath: 'inset(0% 0% 100% 0% round 6px)',
			ease: 'power1.in',
			onComplete: () => {
				emits('update:open', false);
			},
		});
	});

}
</script>

<style lang="scss" scoped>
.about {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	z-index: $z-index-common-modal;
	color: $color-neutral-850;
	padding: $space-3xl;
	border-radius: $radius-base;
	max-height: 100vh;
	overflow-y: scroll;

	.info-card, .contact-card, .education-card {
		padding: $space-md;
		border-radius: $radius-base;
		background-color: $color-neutral-200;
	}

	.info-card {
		position: relative;

		.close {
			position: absolute;
			right: calc($space-xs * -1);
			top: calc($space-xs * -1);
			font-size: $font-size-md;
			border-radius: $radius-round;
			background-color: $color-neutral-800;
			color: $color-neutral-50;
			width: 24px;
			height: 24px;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			transition: transform .3s ease-in-out;
			cursor: pointer;

			&:hover {
				transform: scale(1.15);
			}
		}
	}

	.education-card {
		font-size: $font-size-base;
	}

	:deep(.luc-button.outlined) {
		border: 1px solid $color-neutral-800;
		color: $color-neutral-950;

		&:hover {
			background-color: $color-neutral-300;
		}
	}

	&.about-card-desktop {
		top: 68px;
		right: 0;
		left: unset;
		max-width: 400px;
		transform: unset;
	}
}
</style>

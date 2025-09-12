<template>
	<div
		ref="mobileMenuTrigger"
		class="mobile-menu-hamburger"
		:class="{hide: direction === GESTURE_DIRECTION.DOWN}"
		@click="isMobileMenuOpen = !isMobileMenuOpen">
		<span class="trigger">
			<span>MENU</span>
		</span>
		<Transition name="fade">
			<MobileMenu v-show="isMobileMenuOpen" />
		</Transition>
	</div>
</template>

<script setup>
import gsap from 'gsap';
import { GESTURE_DIRECTION } from '~/constants/interaction';

const {direction} = useScrollDirection();
const router = useRouter();
const triggerRef = useTemplateRef('mobileMenuTrigger');

const isMobileMenuOpen = ref(false);

watch(direction, newVal => {
	if (newVal === GESTURE_DIRECTION.DOWN) {
		isMobileMenuOpen.value = false;
	}
});

let ctx, tl;
watch(triggerRef, (newVal) => {
	if (!newVal) return;

	ctx = gsap.context(() => {
		const listItemStagger = 0.1;
		const menuOpenTime = 0.2;
		gsap.set('.link-item', {
			y: 20,
		});

		tl = gsap.timeline({
			paused: true,
		});
		tl
			.to('.trigger',{
				width: 182,
				height: 157,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				ease: 'power3.out',
				duration: menuOpenTime,
			})
			.to('.link-item', {
				y: 0,
				stagger: listItemStagger,
			}, `-=0.2`)
	}, triggerRef.value);
}, {
	once: true,
});

// TODO: refactor to useGSAP or plugin
watch(isMobileMenuOpen, newVal => {
	console.log(triggerRef.value);
	if (!triggerRef.value || !tl) return;
	
	if (newVal) {
		tl.play();
	} else {
		tl.reverse();
	}
})

const closeAfterNavigation = router.afterEach(() => {
	isMobileMenuOpen.value = false;
});

onUnmounted(() => {
	closeAfterNavigation();
	if (ctx) ctx.revert();
})
</script>

<style lang="scss" scoped>
.mobile-menu-hamburger {
	position: sticky;
	z-index: $z-index-common-fixed;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: max-content;
	padding-bottom: $space-md;
	transition: transform .3s ease-in-out;
	
	.trigger {
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: center;
		margin: 0 auto;
		width: auto;
		height: auto;
		background-color: rgba(0, 0, 0, 1);
		backdrop-filter: blur(4px);
		border-radius: $radius-md;
		color: $color-white;
		padding: $space-sm $space-base;
		font-size: $font-size-xs;
		letter-spacing: 1px;
	}

	@include response(md) {
		display: none;
	}

	&.hide {
		transform: translateX(-50%) translateY(100%);
	}
}
</style>
<template>
	<ModalOverlay
		:open="open"
		@update:open="('update:open', $event)">
		<div class="mobile-menu">
			<div class="d-flex justify-contents-space-between align-items-center mb-space-md header">
				<div class="text-muted logo">
					LUCIEN
				</div>
				<div class="close">
				<ClientOnly>
					<Icon
						name="iconoir:xmark"
						@click="$emit('update:open', false)" />
				</ClientOnly>
				</div>
			</div>
			<nav>
				<ul class="d-flex flex-column gap-space-md">
					<li class="nav-link">
						<NuxtLink
							to="/works"
							class="d-block">
							<span>WORKS</span>
						</NuxtLink>
					</li>
					<li class="nav-link">
						<NuxtLink
							to="/fragments"
							class="d-block">
							<span>FRAGMENTS</span>
						</NuxtLink>
					</li>
				</ul>
			</nav>
			<section class="about">
				<div class="info-card">
					<Avatar :img="'/avatar.jpg'" />
					<div class="d-flex flex-column gap-space-sm mt-space-base common-paragraph">
						<p>
							Lucien Hsieh 謝明倫專注於將概念轉化為視覺、可互動的數位媒體，有約 3 年設計與前端開發經驗。希望能將不同的內容轉譯成有趣的敘事作品。
						</p>
						<p>
							I’m Lucien — a front-end developer who also design. I have 3 years experiences in the field. I craft interfaces, build interactions and wrap them in concepts that tell a story.
						</p>
					</div>
				</div>
				<ContactCard />
				<EducationCard />
			</section>
		</div>
	</ModalOverlay>
</template>

<script setup>
defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['update:open']);

const router = useRouter();
let closeAfterNavigate = null;

onMounted(() => {
	closeAfterNavigate = router.afterEach(() => {
		emits('update:open', false);
	});
});

onUnmounted(() => {
	if (closeAfterNavigate) closeAfterNavigate();
})
</script>

<style lang="scss" scoped>
.mobile-menu {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: $z-index-common-modal;
	height: 100dvh;
	background-color: $color-neutral-100;
	color: $color-neutral-850;
	padding: $space-xl;
	border-radius: $radius-base;
	overflow-y: scroll;

	.close {
		font-size: $font-size-2xl;
	}

	.nav-link {
		font-size: $font-size-xl;
		padding: 0 $space-sm;
	}

	.about {
		margin-top: $space-6xl;

		.info-card, .contact-card, .education-card {
			padding: $space-md;
			border-radius: $radius-base;
			background-color: $color-neutral-200;
		}

		.education-card {
			font-size: $font-size-base;
		}
	}

	:deep(.me-button.outlined) {
		border: 1px solid $color-neutral-800;
		color: $color-neutral-950;

		&:hover {
			background-color: $color-neutral-300;
		}
	}
}
</style>

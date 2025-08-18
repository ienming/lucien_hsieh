<template>
	<Teleport to="body">
		<Transition name="fade">
			<div
				v-if="open"
				class="common-modal-overlay">
				<div class="mobile-menu">
					<div class="d-flex justify-contents-space-between align-items-center mb-space-md header">
						<div class="text-muted logo">
							LUUUUUCIEN
						</div>
						<div class="close">
						<ClientOnly>
							<Icon
								name="iconoir:xmark"
								@click="$emit('close')" />
						</ClientOnly>
						</div>
					</div>
					<nav>
						<ul class="d-flex flex-column gap-space-md">
							<!-- TODO: 關掉 modal -->
							<li class="nav-link">
								<NuxtLink
									to="/"
									class="fade-right-link">
									<span>WORKS</span>
								</NuxtLink>
							</li>
							<li class="nav-link">
								<NuxtLink
									to="/playroom"
									class="fade-right-link">
									<span>PLAYGROUND</span>
								</NuxtLink>
							</li>
						</ul>
					</nav>
					<section class="about">
						<div class="info-card">
							<Avatar :img="'/avatar.jpg'" />
							<div class="d-flex flex-column gap-space-sm mt-space-base common-paragraph">
								<p>
									Lucien Hsieh 謝明倫 專注在使用者前端體驗，有約 3 年UIUX 設計及前端開發經驗。喜歡結合網頁前端與設計、資料視覺化方面的興趣。希望能將不同的內容轉譯成有趣的敘事作品。
								</p>
								<p>
									Have three years experiences in UIUX design and frontend development. I use web frontend technologies to express my interests in design, illustration, story, and data visualization.
								</p>
							</div>
						</div>
						<SocialMediaCard />
						<EducationCard />
					</section>
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
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: $z-index-common-modal;
	height: 100dvh;
	background-color: $color-neutral-100;
	color: $color-white;
	padding: $space-xl;
	border-radius: $radius-base;
	overflow-y: scroll;

	.close {
		font-size: $font-size-2xl;
	}

	.nav-link {
		font-size: $font-size-4xl;
		padding: 0 $space-sm;
		border-bottom: 1px solid $color-neutral-300;
	}

	.about {
		margin-top: $space-6xl;

		.info-card, .social-media-card, .education-card {
			padding: $space-md;
			border-radius: $radius-base;
			background-color: $color-neutral-200;
			color: $color-neutral-850;
		}

		.education-card {
			font-size: $font-size-base;
		}
	}
}
</style>

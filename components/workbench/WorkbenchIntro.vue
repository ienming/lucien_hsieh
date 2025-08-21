<template>
	<div class="d-flex flex-column gap-space-sm workbench-intro">
		<div class="d-flex gap-space-lg justify-contents-space-between align-items-start">
			<p class="title">Hi👋 I'm Lucien, a designer focused on UI/UX and front-end development.</p>
			<div class="switch">
				<ClientOnly v-if="showContent">
					<Icon
						name="iconoir:switch-on"
						@click="showContent = !showContent" />
				</ClientOnly>
				<ClientOnly v-if="!showContent">
					<Icon
						name="iconoir:switch-off"
						@click="showContent = !showContent" />
				</ClientOnly>
			</div>
		</div>
		<div
			v-if="showContent"
			class="common-paragraph">
			<p>這裡就像我的工作調查台，收藏著我在沿途探索與挖掘出的作品。</p>
			<p>Think of this as my work desk — a place where I collect and examine the projects I've unearthed along the way.</p>
		</div>
		<Button
			type="outlined"
			class="core-work-btn">
			Find core works in List
			<ClientOnly>
				<Icon name="iconoir:arrow-right" />
			</ClientOnly>
		</Button>
	</div>
</template>

<script setup>
const showContent = ref(true);
</script>

<style lang="scss" scoped>
.workbench-intro {
	position: absolute;
	top: $space-sm;
	left: $space-sm;
	background-color: $color-white;
	padding: $space-sm;
	border-radius: $radius-sm;
	border: 1px solid $color-neutral-900;
	width: calc(100% - ($space-sm * 2));
	max-width: 420px;

	.title {
		font-size: $font-size-lg;
	}

	.switch {
		font-size: $font-size-md;
		color: $color-text-secondary;
		cursor: pointer;

		&:hover {
			color: $color-text-default;
		}
	}
}
</style>
<template>
	<div class="container hero-intro">
		<div class="header">
			<Logo class="logo-title" />
			<Button
				class="d-md-none"
				@click="isAllWorksOpen = true">
				All works
			</Button>
		</div>
		<div>
			<p class="message">Hi! I'm Lucien, I tell the story on web through code and design</p>
			<p class="common-paragraph">這裡就像我的工作調查台，收藏我在沿途探索與挖掘出的作品。</p>
		</div>
	</div>
</template>

<script setup>
const {isAllWorksOpen} = useAllWorksModal();
</script>

<style lang="scss" scoped>
.hero-intro {
	background-color: $color-white;
	padding: $space-md;
	border-radius: $radius-sm;
	border: 1px solid $color-neutral-900;
	margin-top: -1px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: $space-base;

	@include response(md) {
		flex-direction: row;
		align-items: center;
		gap: $space-4xl;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		@include response(md) {
			align-items: start;
		}

		.logo-title {
			@include response(md) {
				font-size: 12vh;
				align-items: start;
			}
		}
	}
	

	.message {
		margin-bottom: $space-sm;
		font-size: $font-size-md;
		line-height: 1.25;
		letter-spacing: -0.3px;

		@include response(md) {
			font-size: $font-size-2xl;
			letter-spacing: -1px;
		}
	}
}
</style>
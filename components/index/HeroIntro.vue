<template>
	<div class="d-grid gap-space-sm hero-intro">
		<div class="header">
			<h1 class="title">LUUUUUUUCIEN</h1>
			<Button @click="goToWorks">
				GO TO WORKS
				<ClientOnly>
					<Icon name="iconoir:arrow-down" />
				</ClientOnly>
			</Button>
		</div>
		<div>
			<p class="message">Hi! I'm Lucien, I tell the story on web through code and design</p>
			<p class="common-paragraph">這裡就像我的工作調查台，收藏我在沿途探索與挖掘出的作品。</p>
		</div>
	</div>
</template>

<script setup>
function goToWorks() {
	document.querySelector('#allWorksH1').scrollIntoView({
		behavior: 'smooth',
	});
}
</script>

<style lang="scss" scoped>
.hero-intro {
	background-color: $color-white;
	padding: $space-md;
	border-radius: $radius-sm;
	border: 1px solid $color-neutral-900;
	pointer-events: auto;
	grid-template-rows: max-content max-content;
	margin-top: -1px;

	@include response(md) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: unset;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		@include response(md) {
			flex-direction: column;
			align-items: start;
		}

		.title {
			letter-spacing: -1.75px;
		}
	}

	.message {
		margin-bottom: $space-sm;
		font-size: $font-size-md;
		line-height: 1.25;
		letter-spacing: -0.3px;

		@include response(md) {
			font-size: $font-size-lg;
		}
	}
}
</style>
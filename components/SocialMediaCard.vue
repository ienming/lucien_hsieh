<template>
	<div class="social-media-card">
		<Button
			to="https://www.instagram.com/luclucxn/"
			class="w-full d-flex justify-contents-space-between">
			@luclucxn
			<ClientOnly>
				<Icon name="iconoir:instagram" />
			</ClientOnly>
		</Button>
	</div>
</template>

<style lang="scss" scoped>
.social-media-card {
	padding: $space-lg $space-xl;
}
</style>

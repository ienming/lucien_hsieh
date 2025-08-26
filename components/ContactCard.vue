<template>
	<div class="d-flex flex-column contact-card">
		<Button
			to="mailto:hsieh.alan.0726@gmail.com"
			class="w-full d-flex justify-contents-space-between">
			hsieh.alan.0726@gmail.com
			<ClientOnly>
				<Icon name="iconoir:send-mail" />
			</ClientOnly>
		</Button>
		<Button
			to="https://www.instagram.com/luclucxn/"
			type="outlined"
			class="w-full d-flex justify-contents-space-between">
			@luclucxn
			<ClientOnly>
				<Icon name="iconoir:instagram" />
			</ClientOnly>
		</Button>
	</div>
</template>

<style lang="scss" scoped>
.contact-card {
	padding: $space-lg $space-xl;
}
</style>

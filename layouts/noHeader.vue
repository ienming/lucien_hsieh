<template>
	<div>
		<main>
			<slot />
		</main>
		<DefaultFooter />
	</div>
</template>

<script setup>
import DefaultFooter from './partials/DefaultFooter';
</script>

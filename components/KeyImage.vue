<template>
    	Key image: {{ id }}
</template>

<script setup>
defineProps({
	id: {
		type: String,
		default: '',
	},
});
</script>

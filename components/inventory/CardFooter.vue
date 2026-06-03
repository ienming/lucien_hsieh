<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
	<div class="card-footer">
		<p class="text-muted">{{ t('get_in_touch_greeting') }}</p>
		<a
			href="mailto:hsieh.alan.0726@gmail.com"
			class="contact-link"
		>
			hsieh.alan.0726@gmail.com
		</a>
	</div>
</template>

<style lang="scss" scoped>
.card-footer {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 16px;
	height: 30vh;
	text-align: center;
}

.contact-link {
	font-family: 'Courier Prime';
	text-decoration: underline;
	text-underline-offset: 3px;
	text-decoration-thickness: 1px;
	color: var(--color-text-primary);
	transition: color 0.1s ease;

	&:hover {
		color: var(--color-text-faint);
	}
}
</style>

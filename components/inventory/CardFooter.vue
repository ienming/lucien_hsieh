<script lang="ts" setup></script>

<template>
	<div class="card-footer">
		<a
			href="mailto:hsieh.alan.0726@gmail.com"
			class="contact-link"
		>
			GETinTOUCH
		</a>
	</div>
</template>

<style lang="scss" scoped>
.card-footer {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	height: 30vh;
}

.contact-link {
	font-family: 'Courier Prime';
	font-size: 24px;
	font-weight: 400;
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

<template>
	<ul class="info">
		<li
			v-for="info of meta.infos"
			:key="info.type"
			class="text-muted">
			{{ info.type }} / {{ info.desc }}
		</li>
		<div
			v-if="meta.links?.length"
			class="d-flex flex-wrap gap-space-base link-container">
			<a
				v-for="link of meta.links"
				:key="link.url"
				class="link fade-right-link"
				target="_blank"
				:href="link.url">
				<ClientOnly>
					<Icon
						name="ant-design:global-outlined"
						size="24"/>
				</ClientOnly>
				<span>{{ link.label ? link.label : 'LINK TO PROJECT' }}</span>
			</a>
		</div>
	</ul>
</template>

<script setup>
defineProps({
	meta: {
		type: Object,
		default: () => {},
	},
})
</script>

<style lang="scss" scoped>
.info {
	.text-muted {
		margin-bottom: $space-xxs;
	}

	.link-container {
		margin: $space-lg 0 0 0;
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: $space-sm;
	}
}
</style>

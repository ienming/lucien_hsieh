<template>
	<div class="project-next">
		<div class="d-flex justify-contents-space-between align-items-center header">
			<span class="title">
				Next
			</span>
			<ClientOnly>
				<Icon name="iconoir:arrow-right" />
			</ClientOnly>
		</div>
		<div class="d-flex gap-space-lg align-items-center content">
			<!-- NuxtImage -->
			<div class="next-cover" />
			<!-- TEST -->
			<div class="d-flex flex-column gap-space-base next-info">
				<div class="title">WHPC</div>
				<div class="subtitle">WHPC: Taiwan Chapter</div>
				<div class="d-flex gap-space-sm tags">
					<WorkTypeChip
						v-for="tag of tags"
						:key="tag"
						:type="tag" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const {meta} = defineProps({
	meta: {
		type: Object,
		default: () => {},
	},
})

const {tags} = meta;
</script>

<style scoped lang="scss">
.project-next{
	width: 90vw;

	.header, .content {
		border-radius: $radius-base;
		background-color: $color-white;
	}
	
	.header {
		padding: $space-base $space-sm;
		border: 1px solid $color-neutral-900;

		.title {
			font-size: $font-size-lg;
		}
	}

	.content {
		padding: $space-sm;
		height: 280px;
	}

	.next-cover {
		border-radius: $radius-sm;
		background-color: $color-neutral-800;
		height: 100%;
		max-width: 550px;
		aspect-ratio: 6 / 4;
	}

	.next-info {
		.title {
			font-size: $font-size-xl;
		}

		.subtitle {
			font-size: $font-size-md;
		}
	}
}
</style>

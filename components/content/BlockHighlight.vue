<template>
	<div class="block-highlight">
		<div class="container">
			<h3 class="title">
				{{ title }}
			</h3>
			<!-- <Button
				v-if="isMore"
				variant="outlined"
				@click="isContentOpen = !isContentOpen">
				Read more
				<ClientOnly>
					<Icon name="iconoir:plus" />
				</ClientOnly>
			</Button> -->
			<div class="text-muted content">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: '',
	},
	isMore: {
		type: Boolean,
		default: false,
	},
});

// TODO: 之後改成 Modal
// const isContentOpen = ref(false);
</script>

<style scoped lang="scss">
.block-highlight {
	display: grid;
	gap: $space-md;
	padding: 0 $space-base;

	@include response(md) {
		grid-template-columns: repeat(2, 1fr);
		gap: 0;
	}
	
	.container {
		grid-column: 2 / -1;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: $space-md;
		margin: 60px auto;
		padding: 0;
		max-width: $project-text-paragraph-max-width;
		position: relative;

		@include response(md) {
			padding: 0 $space-4xl 0 0;
		}

		.title {
			// TODO: 調整整個網站字型
			font-family: 'Noto Sans Traditional Chinese', 'Urbanist', 'ArialNarrow', sans-serif;
			font-size: $font-size-xl;
			font-weight: 600;
			line-height: 1.25;
		}

		.content {
			font-size: $font-size-base;

			:deep(p) {
				margin-bottom: $space-sm;
			}

			:deep(ul, ol) {
				list-style: decimal;
				padding-inline-start: $space-md;
				margin-bottom: $space-sm;
			}

			:deep(ul) {
				list-style: disc;
			}
		}
	}
}
</style>

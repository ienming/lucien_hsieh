<template>
	<div
		class="project-meta"
		:class="{'align-top': direction === SCROLL_DIRECTION.DOWN}">
		<div class="header">
			<div class="d-flex flex-column gap-space-xxs project-title">
				<p class="title">{{ title }}</p>
				<p class="tagline">{{ tagline }}</p>
			</div>
			<div class="d-flex flex-column flex-md-row gap-space-xs justify-contents-space-between actions">
				<Button class="w-full d-flex justify-contents-space-between">
					<span>Link To Webpage</span>
					<ClientOnly>
						<Icon name="iconoir:arrow-up-right-square-solid" />
					</ClientOnly>
				</Button>
				<Button
					type="outlined"
					class="w-full d-flex justify-contents-space-between"
					@click="isMobile ? $emit('open-btm-sheet') : toggleContent()">
					<span>About the project</span>
					<ClientOnly>
						<Icon
							:name="isMobile ? 'iconoir:plus' : 'iconoir:nav-arrow-up'"
							class="toggle-btn"
							:class="{'downward': isContentShow}" />
					</ClientOnly>
				</Button>
			</div>
		</div>
		<div
			v-show="isContentShow"
			class="body">
			<div class="d-flex justify-contents-space-between flex-wrap meta">
				<div class="year">
					<span class="mr-space-sm">&lt;Year&gt;</span>
					<span>{{ year }}</span>
				</div>
				<div class="d-flex gap-space-xs flex-wrap align-items-start types">
					<span class="mr-space-sm">&lt;Type&gt;</span>
					<WorkTypeChip
						v-for="tag of tags" 
						:key="tag"
						:type="tag"
						:clickable="false" />
				</div>
			</div>
			<div class="common-paragraph content">
				<!-- TODO: 換資料結構 -->
				{{ about }}
			</div>
		</div>
	</div>
</template>

<script setup>
import {SCROLL_DIRECTION} from '~/constants/interaction';

const {meta} = defineProps({
	title: {
		type: String,
		default: 'Project Title',
	},
	meta: {
		type: Object,
		default: () => {},
	},
})

defineEmits(['open-btm-sheet']);

const {direction} = useScrollDirection();
const {isMobile} = useIsMobile();
const {tagline, year, tags, about} = meta;
const isContentShow = ref(false);

function toggleContent() {
	isContentShow.value = !isContentShow.value;
}
</script>

<style lang="scss" scoped>
.project-meta {
	position: fixed;
	//TODO: 把 header 高度統一變共用
	--header-height: 68px;
	--space-between-header: calc(-1 * #{$space-base});
	top: calc(var(--header-height) + var(--space-between-header));
	left: 0;
	z-index: $z-index-common-fixed;
	width: 100vw;
	max-width: 695px;
	background-color: $color-white;
	padding: $space-sm $space-base;
	border-radius: $radius-base;
	border: 1px solid $color-neutral-900;
	transition: top .3s ease-out;

	@include response(md) {
		--space-between-header: #{$space-lg};
		width: 30vw;
		left: auto;
		right: $space-lg;
	}

	.header {
		.project-title {
			padding-bottom: $space-sm;
			border-bottom: 1px solid $color-neutral-900;
	
			.title {
				font-size: $font-size-lg;
				transition: font-size .3s ease-out;
			}
	
			.tagline {
				font-size: $font-size-md;
				color: $color-text-secondary;
				transition: font-size .3s ease-out;
			}
		}
	
		.actions {
			padding: $space-xs 0;

			.toggle-btn {
				transition: transform .2s ease-out;

				&.downward {
					transform: rotate(180deg);
				}
			}
		}
	}


	.body {
		.meta {
			padding: $space-sm 0;
			font-size: $font-size-sm;
		}
	}

	&.align-top {
		top: 0;

		.project-title {
			.title {
				font-size: $font-size-md;
			}

			.tagline {
				font-size: $font-size-sm;
			}
		}

		@include response(md) {
			top: $space-lg;
		}
	}
}
</style>

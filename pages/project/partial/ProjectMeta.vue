<template>
	<div
		class="project-meta"
		:class="{'align-top': direction === SCROLL_DIRECTION.DOWN}">
		<div class="header">
			<div class="d-flex flex-column gap-space-xxs project-title">
				<p class="title">色々な色 iroironairo</p>
				<p class="tagline">Colors I’ve seen in my last student year</p>
			</div>
			<div class="d-flex gap-space-xs justify-contents-space-between actions">
				<Button class="w-full d-flex justify-contents-space-between">
					<span>Link To Webpage</span>
					<ClientOnly>
						<Icon name="iconoir:arrow-up-right-square-solid" />
					</ClientOnly>
				</Button>
				<Button
					type="outlined"
					class="w-full d-flex justify-contents-space-between"
					@click="toggleContent">
					<span>About the project</span>
					<ClientOnly>
						<Icon
							name="iconoir:nav-arrow-up"
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
					<span>{{ date }}</span>
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
				{{ meta.intros }}
			</div>
		</div>
	</div>
	<!-- <ul class="info">
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
	</ul> -->
</template>

<script setup>
import {SCROLL_DIRECTION} from '~/constants/interaction';

const {meta} = defineProps({
	meta: {
		type: Object,
		default: () => {},
	},
})

const {direction} = useScrollDirection();
const {date, tags} = meta;
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
	top: calc(var(--header-height) + $space-lg);
	right: $space-lg;
	z-index: $z-index-common-fixed;
	width: 30vw;
	max-width: 695px;
	background-color: $color-white;
	padding: $space-sm $space-base;
	border-radius: $radius-base;
	border: 1px solid $color-neutral-900;
	transition: top .3s ease-out;

	.header {
		.project-title {
			padding-bottom: $space-sm;
			border-bottom: 1px solid $color-neutral-900;
	
			.title {
				font-size: $font-size-lg;
			}
	
			.tagline {
				font-size: $font-size-md;
				color: $color-text-secondary;
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
		top: $space-lg;
	}
}
</style>

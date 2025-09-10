<template>
	<ModalOverlay
		:open="open"
		@update:open="$emit('update:open', $event)">
		<section class="all-works">
			<h1 class="container all-works-h1">All works</h1>
			<section v-if="error">
				Something went wrong...
			</section>
			<section v-else-if="works.length">
				<!-- TODO: 可以考慮加上按鈕切換 list view / card view -->
				<div
					v-if="filters.length"
					class="d-flex align-items-center gap-space-xs flex-wrap ml-space-sm container filter-container">
					<span>Tagged with</span>
					<Chip
						v-for="filter of filters"
						:key="filter"
						:label="WORK_TYPES[filter].id"
						:closable="true"
						@click="removeFilter(filter)" />
				</div>
				<div @mouseleave="handleWorkHoverEnd">
					<ul class="d-flex flex-column align-items-center work-list">
						<TransitionGroup name="fade">
							<ImageListItem
								v-for="work of filteredWorks"
								:key="work.id"
								:title="work.title"
								:sub-title="work.subTitle"
								:tagline="work.tagline"
								:cover="work.cover"
								:year="work.year"
								:tags="work.tags"
								class="w-full"
								@mouse-enter-item="handleWorkHoverStart(work.id)"
								@filter-by-tag="filterWork"
								@click="GoToProject(work.id)" />
						</TransitionGroup>
					</ul>
					<Transition name="slide-from-right">
						<KeyImage
							v-if="!isMobile && nowImgUrl"
							:url="nowImgUrl"
							:tagline="nowWork.tagline ? nowWork.tagline : 'Find out the process...'"
							@click="GoToProject(nowWork.id)" />
					</Transition>
				</div>
			</section>
			<section v-else>
				Loading...
			</section>
		</section>
	</ModalOverlay>
</template>

<script setup>
import ModalOverlay from './ModalOverlay.vue';
import { WORK_TYPES } from '~/constants/content';

defineProps({
	open: {
		type: Boolean,
		default: false,
	},
});
defineEmits(['update:open']);

const {isMobile} = useIsMobile();
const router = useRouter();

const nowWork = ref({});
const nowImgUrl = ref('');
const filters = ref([]);

// TODO: error handling
const { data: works, error } = await useAsyncData('all-works', async () => {
	const allWorks = await queryCollection('project')
		.where('draft', '=', false)
		.select('path', 'title', 'subtitle', 'tagline', 'year', 'type', 'tags', 'cover', 'mineral')
		.all();

	return allWorks.map(item => ({
		id: item.path.split('/')[2],
		title: item.title,
		subTitle: item.subtitle,
		tagline: item.tagline,
		year: String(item.year),
		type: item.type,
		tags: item.tags,
		cover: item.cover,
		mineral: item.mineral,
	}));
});

const filteredWorks = computed(() => {
	if (!filters.value.length) {
		return works.value;
	}

	const results = [];

	for (let i = 0; i < filters.value.length; i ++) {
		const filter = filters.value[i];
		for (let j = 0; j < works.value.length; j++) {
			const nowWork = works.value[j];

			if (nowWork.tags.includes(filter) &&
				!results.includes(nowWork)) {
				results.push(nowWork);
			}
		}
	}

	return results;
});

function handleWorkHoverStart(id) {
	const targetWork = findTargetWork(id);
	nowImgUrl.value = targetWork.cover;
	nowWork.value = targetWork;
}

function handleWorkHoverEnd() {
	nowWork.value = {};
	nowImgUrl.value = '';
}

function findTargetWork(id) {
	return filteredWorks.value.find(work => work.id === id);
}

function filterWork(tag) {
	if (filters.value.includes(tag)) {
		return;
	}

	filters.value.push(tag);
}

function removeFilter(tag) {
	const filterIndex = filters.value.findIndex(item => item === tag);
	filters.value.splice(filterIndex, 1);
}

function GoToProject(id) {
	router.push(`/project/${id}`);
}
</script>

<style lang="scss" scoped>
.all-works {
	padding: $space-md $space-md $space-4xl $space-md;
	overflow-y: scroll;
	height: 100vh;
	pointer-events: none;

	.all-works-h1 {
		color: $color-neutral-800;
		font-size: $font-size-xl;
	
		@include response(md) {
			margin-top: 35vh;
			font-size: $font-size-4xl;
		}
	}
	
	.filter-container {
		color: $color-white;
		pointer-events: auto;
	}
	
	.work-list {
		gap: $space-sm;
	
		@include response(md) {
			gap: 0;
		}
	}
}
</style>

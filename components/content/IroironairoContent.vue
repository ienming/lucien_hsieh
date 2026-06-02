<script setup>
import ProjectMeta from '@/components/project/ProjectMeta.vue';

useHead({
	title: '色々な色 iroironairo | Lucien Hsieh',
});

const props = defineProps({
	project: {
		type: Object,
		required: true,
	},
});

const { language, isEn, isZh } = useEnvironment();
const projectDesc = computed(() => props.project.description?.[language.value.toLowerCase()]);

const assets = ref([
	{
		src: 'find_colors_p5_riwcxa',
	},
	{
		src: 'color_search_cj4vpq',
	},
	{
		src: 'colors_fuji_i4ecqq',
	},
	{
		src: 'macbook_mockup_zhwgnz',
	},
]);
</script>

<template>
	<div class="project-content">
		<div class="meta-container">
			<ProjectMeta
				:description="projectDesc"
				:link="project.link"
			/>
		</div>
		<div
			v-if="isZh"
			class="project-paragraph-container"
		>
			<p class="project-paragraph">
				「這半年我見過什麼顏色？」抱持著這樣的好奇，我將在神戶生活的半年間，在學校亂晃、超市買菜、到處旅遊時拍下的九百多張照片整理成這份作品。「色々な色」(讀作：iroironairo)這個名字源自我在「中級日文會話」課的期中考，自我介紹時脫口而出這個詞，被他充滿回文的韻律吸引、進而有了這個概念。
				為了呈現我見過什麼顏色、拍了什麼照片，我盡可能保留所有生活中拍攝的面向，只過濾掉構圖相同的照片，留下所有不精雕細琢、隨意拍下的生活照。利用演算法計算每張照片的主要三大顏色來突顯「顏色」這個主角後，將擁有相近主要色調的照片以「相似色」串聯，來傳達「類似的顏色，我也在哪裡見過」這個概念。
				除了色彩之外，照片本身具備的時間、空間資訊則以另一個軸向呈現，敘述「在哪、何時見過」這些顏色。讀者可以依據拍攝時間、地點篩選、查看不同面向，從而探索出不同時空、顏色與我拍攝關注的內容。
			</p>
			<p class="project-paragraph">
				「色々な色」表示「各式各樣的顏色」，希望以這個專案的嘗試，傳達日常生活中因忙碌、疲憊而習以為常的東西，也許換個角度，就能得到些有趣發現。
			</p>
		</div>
		<div
			v-else-if="isEn"
			class="project-paragraph-container"
		>
			<p class="project-paragraph en">
				"What colors have I seen over the past six months?" Fueled by this curiosity, I
				gathered over 900 photos taken during my half-year exchange program in
				Japan—snapshots from wandering around campus, grocery shopping at supermarkets, and
				traveling to various places—and curated them into this project. The title,
				"iroironairo" (色々な色), traces back to a midterm exam in my Intermediate Japanese
				Conversation class. The phrase slipped out during my self-introduction, and I became
				captivated by its palindromic rhythm, which ultimately sparked the concept for this
				work. To showcase the colors I encountered and the moments I captured, I chose to
				preserve as many facets of daily life as possible. I only filtered out identical
				compositions, keeping all the raw, unpolished, and candid snapshots. By using an
				algorithm to extract the top three dominant colors from each photo, the concept of
				"color" takes center stage. Photos with similar dominant tones are then linked by
				"analogous colors" to convey the sentiment: "I feel like I've seen a similar color
				somewhere else before." Beyond color, the temporal and spatial data embedded in the
				photos are presented along another axis, narrating where and when these colors were
				witnessed. Readers can filter and view different perspectives based on the time and
				location of the shots, exploring the intersection of different times, spaces,
				colors, and the subjects that caught my eye.
			</p>
			<p class="project-paragraph en">
				"iroironairo" means "various colors." Through this project, I hope to convey that
				the things we take for granted in our busy, exhausting daily lives might reveal
				something fascinating if we simply look at them from a different angle.
			</p>
		</div>
		<figure class="modal-image-figure bleed">
			<NuxtImg
				v-for="img of assets"
				:key="img.src"
				:src="img.src"
				provider="cloudinary"
				class="modal-image"
			/>
			<!-- <figcaption class="modal-caption">sss</figcaption> -->
		</figure>
		<div class="d-grid grid-template-columns-2 bleed">
			<NuxtImg
				provider="cloudinary"
				src="colors_momiji_rlxjbc"
			></NuxtImg>
			<NuxtImg
				provider="cloudinary"
				src="colors_tokyo_kj2jt2"
			></NuxtImg>
		</div>
		<div class="d-grid grid-template-columns-2 bleed">
			<NuxtImg
				provider="cloudinary"
				src="color_theme_menu_skb8sy"
			></NuxtImg>
			<NuxtImg
				provider="cloudinary"
				src="color_theme_front_is22oo"
			></NuxtImg>
		</div>
		<div class="bleed">
			<NuxtImg
				src="iroironairo_mobile_e7p7lo"
				provider="cloudinary"
				class="modal-image"
			></NuxtImg>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/project';
</style>

<template>
	<div class="project-content">
		<div class="meta-container">
			<ProjectMeta
				:description="project.description"
				:link="project.link"
			/>
		</div>
		<p class="project-paragraph">
			「這半年我見過什麼顏色？」抱持著這樣的好奇，我將自己在日本交換半年間，在學校亂晃、超市買菜、到處旅遊時拍下的九百多張照片整理成這份作品。「色々な色」(讀作：iroironairo)這個名字源自我當時在「中級日文會話」課的期中考，自我介紹時脫口而出這個詞，被他充滿回文的韻律吸引、進而有了這個概念。
			為了呈現我見過什麼顏色、拍了什麼照片，我盡可能保留所有生活中拍攝的面向，只過濾掉構圖相同的照片，留下所有不精雕細琢、隨意拍下的生活照。利用演算法計算每張照片的主要三大顏色來突顯「顏色」這個主角後，將擁有相近主要色調的照片以「相似色」串聯，來傳達「類似的顏色，我也在哪裡見過」這個概念。
			除了色彩之外，照片本身具備的時間、空間資訊則以另一個軸向呈現，敘述「在哪、何時見過」這些顏色。讀者可以依據拍攝時間、地點篩選、查看不同面向，從而探索出不同時空、顏色與我拍攝關注的內容。
		</p>
		<p class="project-paragraph">
			「色々な色」表示「各式各樣的顏色」，希望以這個專案的嘗試，傳達日常生活中因忙碌、疲憊而習以為常的東西，也許換個角度，就能得到些有趣發現。
		</p>
		<figure class="modal-image-figure">
			<NuxtImg
				v-for="img of assets"
				:key="img.src"
				:src="img.src"
				provider="cloudinary"
				class="modal-image"
			/>
			<!-- <figcaption class="modal-caption">sss</figcaption> -->
		</figure>
		<div class="d-grid grid-template-columns-2">
			<NuxtImg
				provider="cloudinary"
				src="colors_momiji_rlxjbc"
			></NuxtImg>
			<NuxtImg
				provider="cloudinary"
				src="colors_tokyo_kj2jt2"
			></NuxtImg>
		</div>
		<div class="d-grid grid-template-columns-2">
			<NuxtImg
				provider="cloudinary"
				src="color_theme_menu_skb8sy"
			></NuxtImg>
			<NuxtImg
				provider="cloudinary"
				src="color_theme_front_is22oo"
			></NuxtImg>
		</div>
		<NuxtImg
			src="iroironairo_mobile_e7p7lo"
			provider="cloudinary"
			class="modal-image"
		></NuxtImg>
	</div>
</template>

<script setup>
import ProjectMeta from '../project/ProjectMeta.vue';

defineProps({
	project: {
		type: Object,
		required: true,
	},
});

const assets = ref([
	{
		src: 'colors_fuji_i4ecqq',
	},
	{
		src: 'find_colors_p5_riwcxa',
	},
	{
		src: 'color_search_cj4vpq',
	},
]);
</script>

<style scoped lang="scss">
@use '@/assets/scss/project';
</style>

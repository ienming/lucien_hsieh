<template>
	<div class="container info">
		<!-- TODO: 暫時隱藏 -->
		<!-- <div>
			<h3 class="mb-space-base">Lucien Hsieh 謝明倫</h3>
			<p>
				喜歡結合網頁前端與設計、插畫、資料視覺化方面的興趣。希望能將不同的內容轉譯成有趣的敘事作品。
			</p>
			<p>
				I use web frontend technologies to express my interests in design, illustration, story, and data visualization.
			</p>
		</div> -->
		<ToBeContinue />
	</div>
</template>

<style lang="scss" scoped>
.info {
	display: grid;

	@include response(md) {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>

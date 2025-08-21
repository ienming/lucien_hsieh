<template>
	<!-- TODO: 研究封裝 overlay 關閉和統一鎖定滾動的邏輯 -->
	<div class="common-modal-overlay overlay">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	z-index: $z-index-common-modal;
	overflow: auto;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, .75);
	backdrop-filter: blur(4px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
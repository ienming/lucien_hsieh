<template>
	<ModalOverlay
		:open="open"
		:overlay-closable="false"
		transition="slide-from-bottom"
		class="justify-contents-center align-items-center"
		@update:open="$emit('update:open', $event)">
		<div class="page-lock-modal">
			<div class="title">
				頁面已鎖定，請輸入密碼
			</div>
			<!-- TODO: 可以考慮封裝成表單驗證元件 -->
			<div class="form-input-container">
				<input
					v-model="inputPassword"
					type="password"
					class="me-input w-full"
					:class="{'error': isErrMsgShow}"
					@input="resetInputState">
				<div class="hint-container">
					<Transition name="slide-from-bottom">
						<span
							v-if="isErrMsgShow"
							class="error-msg">
							{{ errorMsg }}
						</span>
					</Transition>
				</div>
			</div>
			<div class="d-flex justify-contents-end align-items-center gap-space-xs action-btns">
				<Button
					type="outlined"
					@click="goToWorksPage">
					取消
				</Button>
				<Button
					@click="checkPassword">
					確認
				</Button>
			</div>
		</div>
	</ModalOverlay>
</template>

<script setup>
import { getPageUnlockRecords, setPageUnlockRecord } from '~/libs/helper';

const {open, password, pageId} = defineProps({
	pageId: {
		type: String,
		default: '',
	},
	open: {
		type: Boolean,
		default: false,
	},
	password: {
		type: String,
		default: '',
	},
});
const emits = defineEmits(['update:open', 'pass']);

const inputPassword = ref('');
const errorMsg = ref('');
const isErrMsgShow = ref(false);

function resetInputState() {
	if (isErrMsgShow.value) {
		isErrMsgShow.value = false;
	}
}

function checkPassword() {
	// TODO: 驗證錯誤
	isErrMsgShow.value = true;
	if (!inputPassword.value.length) {
		errorMsg.value = '請輸入密碼';
		return;
	} else if (inputPassword.value !== password) {
		errorMsg.value = '密碼錯誤';
		return;
	}

	isErrMsgShow.value = false;
	updateUnlockRecord();
	setTimeout(() => {
		emits('pass');
	}, 150);
}

function updateUnlockRecord() {
	const unlockedRecords = getPageUnlockRecords();
	unlockedRecords[pageId] = true;
	setPageUnlockRecord(unlockedRecords);
}

function goToWorksPage() {
	navigateTo('/works');
}
</script>

<style scoped lang="scss">
.page-lock-modal {
	display: flex;
	flex-direction: column;
	background-color: $color-white;
	border: 1px solid $color-neutral-900;
	padding: $space-xl;
	border-radius: $card-radius;

	.title {
		font-size: $font-size-base;
		margin-bottom: $space-base;
		text-align: center;
	}
}
</style>

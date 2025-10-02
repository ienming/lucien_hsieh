<template>
	<ModalOverlay
		:open="open"
		:overlay-closable="false"
		transition="slide-from-bottom"
		class="justify-contents-center align-items-center"
		@update:open="$emit('update:open', $event)">
		<form
			class="page-lock-modal"
			@submit.prevent="checkPassword">
			<div class="instruct">
				頁面已鎖定，請輸入密碼
			</div>
			<!-- TODO: 可以考慮封裝成表單驗證元件 -->
			<div class="form-input-container">
				<div class="input-container">
					<input
						v-model="inputPassword"
						:type="nowInputType"
						class="luc-input w-full"
						:class="{'error': isErrMsgShow}"
						@input="resetInputState">
					<ClientOnly>
						<Icon
							v-if="nowInputType === INPUT_TYPE.PASSWORD"
							name="iconoir:eye-closed"
							class="suffix-icon"
							@click="nowInputType = INPUT_TYPE.TEXT" />
						<Icon
							v-if="nowInputType === INPUT_TYPE.TEXT"
							name="iconoir:eye"
							class="suffix-icon"
							@click="nowInputType = INPUT_TYPE.PASSWORD" />
					</ClientOnly>
				</div>
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
					variant="outlined"
					type="button"
					@click="goToWorksPage">
					取消
				</Button>
				<Button type="submit">
					確認
				</Button>
			</div>
		</form>
	</ModalOverlay>
</template>

<script setup>
import { STATUS_AUTH_INVALID } from '~/constants/system';
import { getPageUnlockRecords, setPageUnlockRecord } from '~/libs/helper';

const {open, pageId} = defineProps({
	pageId: {
		type: String,
		default: '',
	},
	open: {
		type: Boolean,
		default: false,
	},
});
const emits = defineEmits(['update:open', 'pass']);

const INPUT_TYPE = {
	TEXT: 'text',
	PASSWORD: 'password',
};
const inputPassword = ref('');
const errorMsg = ref('');
const isErrMsgShow = ref(false);
const nowInputType = ref(INPUT_TYPE.PASSWORD);

function resetInputState() {
	if (isErrMsgShow.value) {
		isErrMsgShow.value = false;
	}
}

async function checkPassword() {
	isErrMsgShow.value = false;

	if (!inputPassword.value.length) {
		isErrMsgShow.value = true;
		errorMsg.value = '請輸入密碼';
		return;
	}
	
	let res;
	try {
		res = await $fetch(`/api/content/${pageId}/lock`, {
			method: 'POST',
			body: {
				password: inputPassword.value,
			},
		});
	} catch {
		return;
	}

	if (res.statusCode === STATUS_AUTH_INVALID) {
		isErrMsgShow.value = true;
		errorMsg.value = '密碼錯誤';
		return;
	}

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
	navigateTo('/');
}
</script>

<style scoped lang="scss">
.page-lock-modal {
	display: flex;
	flex-direction: column;
	background-color: $color-white;
	border: 1px solid $color-neutral-900;
	border-radius: $card-radius;
	padding: $space-base;
	margin: 0 $space-base;

	@include response(md) {
		padding: $space-xl;
		max-width: 360px;
	}

	.title {
		font-size: $font-size-md;
		font-weight: 600;
		margin: $space-md 0;
		text-align: center;
	}

	.instruct {
		font-size: $font-size-base;
		margin-bottom: $space-base;
		text-align: center;
	}

	.action-btns {
		:deep(.luc-button) {
			width: 100%;
			justify-content: center;

			@include response(md) {
				max-width: 80px;
			}
		}
	}
}

.form-input-container {
	.input-container {
		position: relative;

		.luc-input {
			padding-right: $space-lg;
		}

		.suffix-icon {
			position: absolute;
			right: $space-xs;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>

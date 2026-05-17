// composables/useCardScroll.js
//
// 負責監聽 wheel / touch 事件，轉換成卡片切換指令
// 兩個獨立的鎖：
//   - isLocked：由外部傳入，動畫進行中為 true（GSAP onComplete 精確釋放）
//   - gestureSwitched：同一個 wheel 手勢只切換一次，手勢結束後重置

export function useCardScroll({ onNext, onPrev, isLocked }) {
	// ─── Wheel（桌面）──────────────────────────────────────
	// 一個 trackpad 手勢會連續送出很多 wheel 事件
	// gestureSwitched 確保同一個手勢只觸發一次切換
	// 若超過 GESTURE_END_MS 沒有新事件，判定手勢結束並重置
	let gestureSwitched = false
	let gestureEndTimer = null
	const GESTURE_END_MS = 150

	function onWheel(event) {
		event.preventDefault()

		// 切換後不再重置計時器，讓 GESTURE_END_MS 從切換那一刻開始倒數。
		// 如果每次 wheel 都重置，手勢持續時計時器永遠不會觸發 → 卡死。
		if (!gestureSwitched) {
			clearTimeout(gestureEndTimer)
			gestureEndTimer = setTimeout(() => {
				gestureSwitched = false
			}, GESTURE_END_MS)
		}

		if (isLocked.value || gestureSwitched) return

		if (event.deltaY > 0) {
			gestureSwitched = true
			onNext()
		} else if (event.deltaY < 0) {
			gestureSwitched = true
			onPrev()
		}
	}

	// ─── Touch（手機）──────────────────────────────────────
	const touchStartY = ref(0)
	const SWIPE_THRESHOLD = 50

	function onTouchStart(event) {
		touchStartY.value = event.touches[0].clientY
	}

	function onTouchEnd(event) {
		if (isLocked.value) return

		const deltaY = touchStartY.value - event.changedTouches[0].clientY
		if (Math.abs(deltaY) < SWIPE_THRESHOLD) return

		if (deltaY > 0) {
			onNext()
		} else {
			onPrev()
		}
	}

	// ─── 掛載 / 卸載事件監聽 ───────────────────────────────
	function attach(target) {
		target.addEventListener('wheel', onWheel, { passive: false })
		target.addEventListener('touchstart', onTouchStart, { passive: true })
		target.addEventListener('touchend', onTouchEnd, { passive: true })
	}

	function detach(target) {
		clearTimeout(gestureEndTimer)
		target.removeEventListener('wheel', onWheel)
		target.removeEventListener('touchstart', onTouchStart)
		target.removeEventListener('touchend', onTouchEnd)
	}

	return { attach, detach }
}

import { ref } from 'vue';
import { GESTURE_DIRECTION } from '~/constants/interaction';

export function useSwipe(threshold = 30) {
	const swipeDirection = ref(null);
	let startX = 0;
	let startY = 0;
	let isTouching = false;

	function onTouchStart(e) {
		const touch = e.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
		isTouching = true;
		swipeDirection.value = null;
	}

	function onTouchMove(e) {
		if (!isTouching) return;
		const touch = e.touches[0];
		const dx = touch.clientX - startX;
		const dy = touch.clientY - startY;

		if (Math.abs(dx) > Math.abs(dy)) {
			// 左右滑
			if (dx > threshold) swipeDirection.value = GESTURE_DIRECTION.RIGHT;
			else if (dx < -threshold) swipeDirection.value = GESTURE_DIRECTION.LEFT;
		} else {
			// 上下滑
			if (dy > threshold) swipeDirection.value = GESTURE_DIRECTION.DOWN;
			else if (dy < -threshold) swipeDirection.value = GESTURE_DIRECTION.UP;
		}
	}

	function onTouchEnd() {
		isTouching = false;
		startX = 0;
		startY = 0;
	}

	function bindEvents(el) {
		if (!el) return;
		el.addEventListener('touchstart', onTouchStart);
		el.addEventListener('touchmove', onTouchMove);
		el.addEventListener('touchend', onTouchEnd);
	}

	function unbindEvents(el) {
		if (!el) return;
		el.removeEventListener('touchstart', onTouchStart);
		el.removeEventListener('touchmove', onTouchMove);
		el.removeEventListener('touchend', onTouchEnd);
	}

	return {
		swipeDirection,
		bindEvents,
		unbindEvents,
	};
}


import { ref, onMounted, onUnmounted } from 'vue';
import { SCROLL_DIRECTION } from '~/constants/interaction';

function throttle(fn, delay = 100) {
	let lastCall = 0;

	return function (...args) {
		const now = Date.now()

		if (now - lastCall < delay) return;
		
		lastCall = now;
		fn(...args);
	}
}

export function useScrollDirection() {
	const direction = ref('');
	let lastScrollTop = 0;

	function checkDirection() {
		const currentTop = window.pageYOffset || document.documentElement.scrollTop;

		if (currentTop > lastScrollTop) {
			direction.value = SCROLL_DIRECTION.DOWN;
		} else {
			direction.value = SCROLL_DIRECTION.UP;
		}
		
		lastScrollTop = currentTop <= 0 ? 0 : currentTop;
	}

	const handler = throttle(checkDirection);

	onMounted(() => {
		document.addEventListener('scroll', handler);
	})

	onUnmounted(() => {
		document.removeEventListener('scroll', handler);
	})

	return { direction };
}

import { ref, onMounted, onUnmounted } from 'vue';

export function useIsMobile(breakpoint = 768) {
	const isMobile = ref(false);
	let mediaQuery;

	const update = () => {
		isMobile.value = mediaQuery.matches;
	}

	onMounted(() => {
		mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
		isMobile.value = mediaQuery.matches;
		mediaQuery.addEventListener('change', update);
	})

	onUnmounted(() => {
		mediaQuery?.removeEventListener('change', update);
	})

	return { isMobile };
}

import { LANG_KEY } from "./useI18n";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function useEnvironment() {
	const language = useCookie('env:language', {
		default: () => LANG_KEY.zh,
		maxAge: ONE_YEAR,
	});
	const isDark = useState('env:isDark', () => false)
	const isEnvOpen = useState('env:isOpen', () => false)
	const isEn = computed(() => language.value === LANG_KEY.en);
	const isZh = computed(() => language.value === LANG_KEY.zh);

	function toggleLanguage() {
		language.value = isEn.value ? LANG_KEY.zh : LANG_KEY.en;
	}

	function toggleTheme() {
		isDark.value = !isDark.value
		localStorage.setItem('dark-theme', isDark.value);
	}

	function syncTheme() {
		document?.documentElement.setAttribute(
			'data-theme',
			isDark.value ? 'dark' : 'light'
		)
	}

	function initTheme() {
		let prefersDark;

		if (localStorage.getItem('dark-theme')) {
			const savedThemePrefer = JSON.parse(localStorage.getItem('dark-theme'));
			prefersDark = savedThemePrefer;
		} else {
			prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches
		}

		isDark.value = prefersDark
		syncTheme()

		window?.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => {
				isDark.value = e.matches
				syncTheme()
			})
	}

	if (import.meta.client) {
		watch(isDark, syncTheme)
	}

	function togglePanel() { isEnvOpen.value = !isEnvOpen.value }
	function closePanel() { isEnvOpen.value = false }

	return {
		language,
		toggleLanguage,
		isDark,
		toggleTheme,
		initTheme,
		syncTheme,
		isEnvOpen,
		togglePanel,
		closePanel,
		isEn,
		isZh,
	}
}
export function useEnvironment() {
	const language = useState('env:language', () => 'EN')
	const isDark = useState('env:isDark', () => false)
	const isEnvOpen = useState('env:isOpen', () => false)
	const isEn = computed(() => language.value === 'EN');
	const isZh = computed(() => language.value === 'ZH');

	function toggleLanguage() {
		language.value = isEn.value ? 'ZH' : 'EN';
	}

	function toggleTheme() {
		isDark.value = !isDark.value
	}

	function syncTheme() {
		document?.documentElement.setAttribute(
			'data-theme',
			isDark.value ? 'dark' : 'light'
		)
	}

	function initTheme() {
		const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches
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
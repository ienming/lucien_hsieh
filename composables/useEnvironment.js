// composables/useEnvironment.js

export function useEnvironment() {
	// ─── 語言 ──────────────────────────────────────────────
	const language = useState('env:language', () => 'EN')

	function toggleLanguage() {
		language.value = language.value === 'EN' ? 'ZH' : 'EN'
	}

	// ─── 深色模式 ───────────────────────────────────────────
	// 初始值給 false，client 端 onMounted 再讀系統偏好
	// 避免 SSR 環境存取 window 報錯
	const isDark = useState('env:isDark', () => false)

	function toggleTheme() {
		isDark.value = !isDark.value
	}

	// 同步 data-theme 到 <html>（只在 client 執行）
	// 在需要這個 composable 的元件 onMounted 裡呼叫 syncTheme()
	function syncTheme() {
		document?.documentElement.setAttribute(
			'data-theme',
			isDark.value ? 'dark' : 'light'
		)
	}

	// 讀取系統偏好（只在 client 執行）
	function initTheme() {
		const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches
		isDark.value = prefersDark
		syncTheme()

		// 監聽系統偏好變化
		window?.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => {
				isDark.value = e.matches
				syncTheme()
			})
	}

	// watch isDark 同步到 DOM（僅 client）
	if (import.meta.client) {
		watch(isDark, syncTheme)
	}

	// ─── Panel 開關 ─────────────────────────────────────────
	const isEnvOpen = useState('env:isOpen', () => false)

	function togglePanel() { isEnvOpen.value = !isEnvOpen.value }
	function closePanel() { isEnvOpen.value = false }

	return {
		language,
		toggleLanguage,
		isDark,
		toggleTheme,
		initTheme,   // 在 layout/default.vue 的 onMounted 呼叫一次
		syncTheme,
		isEnvOpen,
		togglePanel,
		closePanel,
	}
}
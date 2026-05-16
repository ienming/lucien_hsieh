import { ref, watch } from 'vue'

export function useEnvironment() {
	// ─── 語言 ─────────────────────────────────────────────
	const language = ref('EN') // 'EN' | 'ZH'

	function toggleLanguage() {
		language.value = language.value === 'EN' ? 'ZH' : 'EN'
	}

	// ─── 深色模式 ──────────────────────────────────────────
	// 初始值讀系統偏好
	const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)').matches
	const isDark = ref(prefersDark)

	function toggleTheme() {
		isDark.value = !isDark.value
	}

	// 同步 data-theme 到 <html>
	watch(isDark, (val) => {
		document?.documentElement.setAttribute('data-theme', val ? 'dark' : 'light')
	}, { immediate: true })

	// ─── Panel 開關 ────────────────────────────────────────
	const isOpen = ref(false)

	function openPanel() { isOpen.value = true }
	function closePanel() { isOpen.value = false }
	function togglePanel() { isOpen.value = !isOpen.value }

	return {
		language,
		toggleLanguage,
		isDark,
		toggleTheme,
		isOpen,
		openPanel,
		closePanel,
		togglePanel,
	}
}

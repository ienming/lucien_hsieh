const T = {
	EN: {
		fileExplorer: 'FILE EXPLORER',
		viewInList:   'VIEW IN LIST',
		environment:  'ENVIRONMENT',
		translation:  'Translation',
		light:        'Light',
		name:         'Name',
		no:           'No',
		medium:       'Medium',
		viewProject:  'View Project →',
	},
	ZH: {
		fileExplorer: '所有專案',
		viewInList:   '在清單閱讀',
		environment:  '設定',
		translation:  '語言',
		light:        '外觀',
		name:         'name',
		no:           'no',
		medium:       'medium',
		viewProject:  '查看作品 →',
	},
}

export function useI18n() {
	const { language } = useEnvironment()
	// t() 直接讀 language.value，Vue 追蹤依賴，語言切換時元件自動重渲染
	const t = (key) => T[language.value]?.[key] ?? T.EN[key] ?? key
	return { t }
}

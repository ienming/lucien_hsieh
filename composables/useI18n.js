const T = {
	EN: {
		siteTitle:    "LUCIEN'S INVENTORY",
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
		siteTitle:    'LUCIEN 的作品',
		fileExplorer: '所有作品',
		viewInList:   '清單模式',
		environment:  '環境設定',
		translation:  '語言切換',
		light:        '深色模式',
		name:         '名稱',
		no:           '編號',
		medium:       '媒介',
		viewProject:  '查看作品 →',
	},
}

export function useI18n() {
	const { language } = useEnvironment()
	// t() 直接讀 language.value，Vue 追蹤依賴，語言切換時元件自動重渲染
	const t = (key) => T[language.value]?.[key] ?? T.EN[key] ?? key
	return { t }
}

import { useEnvironment } from "./useEnvironment"

const LANG_KEY_MAP = {
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
	const { language } = useEnvironment();
	const t = (key) => {
		if (!language.value) return key;
		return LANG_KEY_MAP[language.value]?.[key];
	};
	return { t }
}

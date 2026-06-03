import { useEnvironment } from "./useEnvironment"

export const LANG_KEY = {
	en: 'EN',
	zh: 'ZH',
};

const LANG_KEY_MAP = {
	EN: {
		fileExplorer: 'FILE EXPLORER',
		viewInList: 'VIEW IN LIST',
		environment: 'ENVIRONMENT',
		translation: 'Translation',
		light: 'Light',
		name: 'Name',
		year: 'Year',
		no: 'No',
		medium: 'Medium',
		get_in_touch_greeting: 'Always open to intriguing ideas in digital storytelling and cultural content design Ü',
	},
	ZH: {
		fileExplorer: '所有專案',
		viewInList: '在清單閱讀',
		environment: '閱讀環境',
		translation: '翻譯',
		light: '燈光',
		name: '專案名稱',
		no: '編號',
		year: '年份',
		medium: '媒介',
		get_in_touch_greeting: '隨時歡迎來自數位敘事、文化內容設計中的有趣想法 Ü',
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

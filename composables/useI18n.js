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
		work_category: 'WORKS',
		translation: 'Translation',
		light: 'Light',
		name: 'Name',
		year: 'Year',
		no: 'No',
		medium: 'Medium',
		get_in_touch_greeting: 'Open to intriguing ideas in digital storytelling and cultural content design',
		chart: 'Chart',
		works_coordinate: 'Practice as a map',
		digital: 'Digital',
		physical: 'Physical',
	},
	ZH: {
		fileExplorer: '所有專案',
		viewInList: '在清單閱讀',
		environment: '閱讀環境',
		work_category: '作品分類',
		translation: '翻譯',
		light: '燈光',
		name: '專案名稱',
		no: '編號',
		year: '年份',
		medium: '媒介',
		get_in_touch_greeting: '歡迎來自數位敘事、數位設計的有趣想法',
		chart: '表',
		works_coordinate: '創作實踐地圖',
		digital: '數位',
		physical: '實體',
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

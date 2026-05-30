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
	},
	ZH: {
		fileExplorer: '所有專案',
		viewInList: '在清單閱讀',
		environment: '設定',
		translation: '語言',
		light: '外觀',
		name: '專案名稱',
		no: '編號',
		year: '年份',
		medium: '媒介',
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

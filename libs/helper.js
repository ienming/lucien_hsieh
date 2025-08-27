import { SITE_NAME } from "~/constants/system";

export function splitMultiLine(str) {
	return str.split('\\n').filter(para => para);
}

export function getPageUnlockRecords() {
	return JSON.parse(localStorage.getItem(SITE_NAME) || '{}');
}

export function setPageUnlockRecord(originalRecords) {
	localStorage.setItem(SITE_NAME, JSON.stringify(originalRecords));
}

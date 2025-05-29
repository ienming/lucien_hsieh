import { imgDomain } from "~/constants/system";

export function getImg(url) {
	if (!url) {
		return new Error('Image url is required');
	}

	return `${imgDomain}/lucien-portfolio/${url}`;
}
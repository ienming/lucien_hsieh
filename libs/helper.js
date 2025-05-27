import { imgDomain } from "~/constants/system";

export function getImg(config) {
    const {paths, url} = config;

    if (!url) {
        return new Error('Image url is required');
    }

    let result = `${imgDomain}/lucien-portfolio/`;

    if (Array.isArray(paths)) {
        paths.forEach(path => {
            result += `${path}/`;
        })
    }

    result += url;

    return result;
}
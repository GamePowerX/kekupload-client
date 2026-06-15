import { browser } from "$app/environment";
import { title, description } from "$lib/config";

function setMeta(selector: string, content: string) {
	document.querySelector(selector)?.setAttribute("content", content);
}

export function applyMetadata() {
	if (!browser) return;

	document.title = title;
	setMeta('meta[name="title"]', title);
	setMeta('meta[property="og:title"]', title);
	setMeta('meta[name="description"]', description);
	setMeta('meta[property="og:description"]', description);
	setMeta('meta[property="twitter:description"]', description);
}

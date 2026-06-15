export function getThemeHref(theme: string) {
	return `/themes/${theme}.css`;
}

export function getActiveTheme(defaultTheme: string) {
	if (typeof localStorage === "undefined") return defaultTheme;
	return localStorage.theme || defaultTheme;
}

export function applyTheme(theme: string) {
	const currentTheme = document.getElementById("theme") as HTMLLinkElement | null;
	if (!currentTheme) {
		return Promise.resolve(false);
	}

	const href = getThemeHref(theme);
	if (currentTheme.getAttribute("href") === href) {
		localStorage.theme = theme;
		return Promise.resolve(true);
	}

	return new Promise<boolean>((resolve) => {
		const nextTheme = document.createElement("link");
		nextTheme.rel = "stylesheet";
		nextTheme.href = href;
		nextTheme.onload = () => {
			currentTheme.href = href;
			localStorage.theme = theme;
			nextTheme.remove();
			resolve(true);
		};
		nextTheme.onerror = () => {
			nextTheme.remove();
			resolve(false);
		};

		currentTheme.after(nextTheme);
	});
}

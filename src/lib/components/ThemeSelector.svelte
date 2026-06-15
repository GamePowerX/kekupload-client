<script lang="ts">
	import themes from "$lib/themes";
	import { default_theme } from "$lib/config";
	import { applyTheme, getActiveTheme } from "$lib/theme";
	import { tick } from "svelte";
	import { fade } from "svelte/transition";

	let activeTheme = $state(getActiveTheme(default_theme));
	let isOpen = $state(false);
	let isLoading = $state(false);
	let error = $state("");
	let openButton: HTMLButtonElement;
	let previousFocus: Element | null = null;

	async function openMenu() {
		previousFocus = document.activeElement;
		isOpen = true;
		await tick();
		document.querySelector<HTMLButtonElement>(".theme.active")?.focus();
	}

	async function closeMenu() {
		isOpen = false;
		await tick();
		if (previousFocus instanceof HTMLElement) previousFocus.focus();
		else openButton.focus();
	}

	async function setTheme(index: number) {
		const nextTheme = themes[index].file;
		isLoading = true;
		error = "";

		if (await applyTheme(nextTheme)) activeTheme = nextTheme;
		else error = "Could not load this theme. Please try again.";

		isLoading = false;
	}

	function onMenuKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") closeMenu();
	}
</script>

<button
	bind:this={openButton}
	class="open"
	type="button"
	aria-haspopup="dialog"
	onclick={openMenu}
>
	Theme
</button>

{#if isOpen}
	<div
		class="menu"
		role="dialog"
		aria-modal="true"
		aria-labelledby="theme-title"
		tabindex="-1"
		transition:fade={{ duration: 50 }}
		onkeydown={onMenuKeydown}
	>
		<main>
			<h1 id="theme-title">Theme</h1>
			<p>Please select the theme you want.</p>
			{#if isLoading}
				<p class="hint">Loading theme...</p>
			{/if}
			{#if error}
				<p class="error">{error}</p>
			{/if}

			{#each themes as theme, i}
				<button
					type="button"
					class="theme"
					class:active={theme.file === activeTheme}
					disabled={isLoading}
					onclick={() => setTheme(i)}
				>
					<h3>{theme.name}</h3>
				</button>
			{/each}
		</main>
		<button class="close" type="button" onclick={closeMenu}>
			Back
		</button>
	</div>
{/if}

<style>
	.theme.active::after {
		content: "active";
		color: var(--highlight);
		margin-left: 5px;
	}

	.error {
		color: var(--highlight);
		margin-bottom: 10px;
	}

	.open,
	.close {
		position: fixed;
		bottom: 0;
		left: 0;
		cursor: pointer;
		user-select: none;
		background: none;
		border: none;
		padding: 0;
	}

	.menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background);
	}

	.menu > main {
		background-color: var(--secondary);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 30px 0;
		padding-bottom: 20px;
		width: 100%;
		max-width: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.menu > main > p {
		margin-bottom: 20px;
	}

	.theme {
		border: 1px solid var(--border);
		background: transparent;
		border-radius: 20px;
		padding: 8px 20px;
		width: 90%;
		text-align: center;
		margin-bottom: 10px;
		cursor: pointer;
		user-select: none;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme:hover {
		background-color: var(--theme-hover);
	}
</style>

<script lang="ts">
	import { onMount } from "svelte";
	import { default_theme } from "$lib/config";
	import { applyTheme, getActiveTheme } from "$lib/theme";
	import { applyMetadata } from "$lib/metadata";
	import ThemeSelector from "$lib/components/ThemeSelector.svelte";

	let { children } = $props();

	onMount(() => {
		applyTheme(getActiveTheme(default_theme));
		applyMetadata();
	});
</script>

<svelte:head>
	<title>KekUpload</title>
	<meta name="title" content="KekUpload" />
	<meta property="og:title" content="KekUpload" />
	<meta name="description" content="Upload everything" />
	<meta property="og:description" content="Upload everything" />
	<meta property="twitter:description" content="Upload everything" />
	<meta name="theme-color" content="#000000" />
</svelte:head>

{@render children()}

<ThemeSelector />

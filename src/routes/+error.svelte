<script lang="ts">
	import { page } from "$app/stores";
	import { base_download } from "$lib/config";
</script>

<svelte:head>
	<title>404 - KekUpload</title>
	<link rel="stylesheet" href="/404.css" />
</svelte:head>

<h1 id="title">404</h1>
<p id="description">This page could not be found</p>
<a id="home-link" href={base_download}>Back to uploads</a>

<style>
	:global(body) {
		background-color: var(--background);
		color: var(--text);
		font-family: sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100vh;
		margin: 0;
	}

	h1 {
		font-size: 5em;
		margin: 0;
	}

	p {
		color: var(--text-secondary);
		margin: 10px 0;
	}

	a {
		color: var(--highlight);
	}
</style>

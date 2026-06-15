<script lang="ts">
	import * as config from "$lib/config";
	import FileSelector from "$lib/components/FileSelector.svelte";
	import UploadList from "$lib/components/UploadList.svelte";
	import type { UploadListType } from "$lib/types";

	let uploadList: UploadListType = $state(undefined!);
	let fileCount = $state(0);
</script>

<main>
	<h1>{config.title}</h1>
	<p>{config.description}</p>

	<FileSelector onfiles={(f) => uploadList.addFiles(f)} />

	<div class="spacer"></div>

	<UploadList
		bind:uploadList={uploadList}
		onfileschange={(count) => (fileCount = count)}
	/>

	<div class="spacer"></div>

	<button disabled={fileCount === 0} onclick={() => uploadList.uploadAll()}>
		Upload all
	</button>
</main>

<style>
	:global(button) {
		background-color: var(--primary);
		border: 3px solid var(--border);
		padding: 5px 10px;
		font-size: 20px;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	:global(button:disabled) {
		cursor: not-allowed;
		opacity: 0.55;
	}

	:global(button:hover) {
		background-color: var(--primary-hover);
	}

	:global(button:focus-visible),
	:global(input:focus-visible),
	:global([role="button"]:focus-visible) {
		outline: 3px solid var(--highlight);
		outline-offset: 3px;
	}

	:global(input) {
		background-color: var(--secondary);
		border: 1px solid var(--border);
		border-radius: 20px;
		padding: 0 10px;
		color: var(--text-secondary);
	}

	:global(p) {
		color: var(--text-secondary);
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		color: var(--text);
	}

	:global(body) {
		background-color: var(--background);
		width: 100%;
		height: 100vh;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	:global(#app) {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100%;
		padding: 10px 0;
		width: 100%;
	}

	main {
		background-color: var(--secondary);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 30px 0;
		width: 100%;
		max-width: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	p {
		margin-bottom: 20px;
	}

	.spacer {
		margin-bottom: 20px;
	}
</style>

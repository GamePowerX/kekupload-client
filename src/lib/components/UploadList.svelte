<script lang="ts">
	import type { UploadListType } from "$lib/types";
	import UploadEntry from "./UploadEntry.svelte";

	let {
		onfileschange,
		uploadList = $bindable()
	}: {
		onfileschange?: (count: number) => void;
		uploadList: UploadListType;
	} = $props();

	let uploadEntries: Record<number, Record<string, any>> = {};
	let files: Array<File> = $state([]);

	function removeitem(index: number) {
		files.splice(index, 1);
		files = files;
		onfileschange?.(files.length);
	}

	function uploadAll() {
		Object.values(uploadEntries).forEach((entry) => {
			entry.startUpload();
		});
	}

	function addFiles(filelist: FileList) {
		for (let file of filelist) files.push(file);

		files = files;
		onfileschange?.(files.length);
	}

	uploadList = { removeitem, uploadAll, addFiles };
</script>

{#if files.length > 0}
	<main>
		{#each files as file, i (file)}
			<UploadEntry bind:this={uploadEntries[i]} {file} index={i} onclose={() => removeitem(i)} />
			<div class="spacer"></div>
		{/each}
	</main>
{/if}

<style>
	main {
		width: 90%;
		border: 1px solid var(--border);
		border-radius: 15px;
		padding: 10px 5px 0 5px;
	}
	.spacer {
		margin-bottom: 10px;
	}
</style>

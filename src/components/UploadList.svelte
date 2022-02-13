<script lang="ts">
    import UploadEntry from "./UploadEntry.svelte";

    let uploadEntries: Object = {};

    let files: Array<File> = [];

    function removeitem(index: number) {
        files.splice(index, 1);
        files = files;
    }

    export function uploadAll() {
        Object.values(uploadEntries).forEach((entry)=>{
            entry.startUpload();
        });
    }

    export function addFiles(filelist: FileList) {
        for(let file of filelist) files.push(file);

        files = files;
    }
</script>

{#if files.length > 0}
<main>
    {#each files as file, i}
	<UploadEntry bind:this={uploadEntries[i]} file={file} index={i} onclose={removeitem} />
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
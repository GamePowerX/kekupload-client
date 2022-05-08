<script lang="ts">
    import * as config from "../config";
    import FileSelector from "./FileSelector.svelte";
    import ThemeSelector from "./ThemeSelector.svelte";
    import UploadList from "./UploadList.svelte";

    let uploadList: UploadList;
</script>

<main>
    <h1>{config.title}</h1>
    <p>{config.description}</p>

    <FileSelector onfiles={(f)=>uploadList.addFiles(f)}/>
        
    <div class="spacer"></div>

    <UploadList bind:this={uploadList}/>

    <div class="spacer"></div>

    <button on:click={()=>uploadList.uploadAll()}>Upload all</button>
</main>

<ThemeSelector/>

<style>
    :global(button) {
        background-color: var(--primary);
        outline: none;
        border: 3px solid var(--border);
        padding: 5px 10px;
        font-size: 20px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    :global(button:hover) {
        background-color: var(--primary-hover);
    }

    :global(input) {
        background-color: var(--secondary);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 0 10px;
        outline: none;
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
        scrollbar-width: none;
    }

    :global(::-webkit-scrollbar) {
        display: none;
    }

    :global(body) {
        background-color: var(--background);
        width: 100vw;
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
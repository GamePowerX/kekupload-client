<script lang="ts">
    import config from "../config";
    import FileSelector from "./FileSelector.svelte";

    const onfiles = (files: FileList)=>{
        console.log(files);
    }
</script>

<main>
    <h1>{config.title}</h1>
    <p>{config.description}</p>

    <FileSelector onfiles={onfiles}/>
</main>

<style>
    @import "../theme.css";

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
</style>
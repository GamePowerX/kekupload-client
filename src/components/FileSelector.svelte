<script lang="ts">
    export let onfiles: (files: FileList)=>void; 
    
    let style = "";
    let select: HTMLInputElement;
    let active = false;

    const ondragover = (e: DragEvent)=>{
        style = "background-color: var(--highlight)";
        active = true;
        e.preventDefault();
    };

    const ondragleave = ()=>{
        active = false;
        style = "";
    };

    const ondrop = (e: DragEvent)=>{
        active = false;
        style = "";
        e.preventDefault();

        if (e.dataTransfer?.files) {
            onfiles(e.dataTransfer.files);
        }
    }

    const onclick = ()=>{
        select.click();
    }

    const onkeydown = (e: KeyboardEvent)=>{
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select.click();
        }
    }

    const onchange = (e: Event)=>{
        const files = (e.target as HTMLInputElement).files;
        if (files) {
            onfiles(files);
        }
    }
</script>

<div class="drop" class:active  style={style} role="button" tabindex="0" on:dragover={ondragover} on:dragleave={ondragleave} on:drop={ondrop} on:click={onclick} on:keydown={onkeydown}>
    <h2>Drag & Drop</h2>
    <input bind:this={select} on:change={onchange} id="select-files" multiple type="file">
</div>


<style>
    .drop {
        outline: 2px dashed var(--border);
        border-radius: 20px;
        width: 90%;
        height: 300px;
        max-width: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    input {
        display: none;
    }
</style>
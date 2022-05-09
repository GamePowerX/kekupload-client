<script lang="ts">
    export let onfiles: (files: FileList)=>void; 
    
    let style;
    let select;
    let active;

    const ondragover = (e: DragEvent)=>{
        style = "background-color: var(--highlight)";
        active = true;
        e.preventDefault();
    };

    const ondragleave = (e: DragEvent)=>{
        active = false;
        style = "";
    };

    const ondrop = (e: DragEvent)=>{
        active = false;
        style = "";
        e.preventDefault();

        onfiles(e.dataTransfer.files);
    }

    const onclick = (e: MouseEvent)=>{
        select.click();
    }

    const onchange = (e: Event)=>{
        onfiles((e.target as HTMLInputElement).files);
    }
</script>

<div class="drop" class:active  style={style} on:dragover={ondragover} on:dragleave={ondragleave} on:drop={ondrop} on:click={onclick}>
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
<script lang="ts">
    export let onfiles: (files: FileList)=>void; 
    
    let style;
    let select;

    const ondragover = (e: DragEvent)=>{
        style = "background-color: var(--highlight)";
        e.preventDefault();
    };

    const ondragleave = (e: DragEvent)=>{
        style = "";
    };

    const ondrop = (e: DragEvent)=>{
        style = "";
        e.preventDefault();

        onfiles(e.dataTransfer.files);
    }

    const onclick = (e: MouseEvent)=>{
        select.click();
    }

    const onselect = (e: Event)=>{

    }
</script>

<div class="drop" style={style} on:dragover={ondragover} on:dragleave={ondragleave} on:drop={ondrop} on:click={onclick}>
    <h2>Drag & Drop</h2>
    <input bind:this={select} on:select={onselect} id="select-files" type="file">
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
    }
    input {
        display: none;
    }
</style>
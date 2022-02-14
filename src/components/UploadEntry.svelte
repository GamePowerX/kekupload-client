<script lang="ts">
    import api from "../api";
    import config from "../config";

    export let file: File;
    export let index: number;
    export let onclose: (index: number)=>void;

    let entryId: number;

    let uploadlink: HTMLInputElement;

    let isUploading = false;
    let statusbarStyle = "width: 0px;";
    let statusPercentage = "0%";

    let uploadId: undefined | String;

    function makeHuman(size: number) {
        if(size >= 1099511627776) {
            return (size/1099511627776).toFixed(2) + " TiB";
        } else if(size >= 1073741824) {
            return (size/1073741824).toFixed(2) + " GiB";
        } else if(size >= 1048576) {
            return (size/1048576).toFixed(2) + " MiB";
        } else if(size >= 1024) {
            return (size/1024).toFixed(2) + " KiB";
        } else return size + " bytes";
    }

    export function startUpload() {
        if(!isUploading && !uploadId) {
            isUploading = true;

            entryId = api.startUpload(file, (status)=>{
                statusPercentage = (status*100).toFixed(2) + "%";
                statusbarStyle = "width: " + statusPercentage;
                console.log("STATUS: " + status);
            }, (id)=>{
                console.log("SUCCESS: " + id);
                isUploading = false;
                uploadId = id;
            }, (err)=>{
                console.log("ERROR: " + err);
                alert("Oh shit! This upload failed! (" + file.name + " | " + err + ")");
            });
        }
    }

    async function onCancel() {
        if(isUploading) {
            await api.cancelUpload(entryId);
            statusbarStyle = "width: 0px;";
            statusPercentage = "0%";
            isUploading = false;
        } else onclose(index);
    }
</script>

<main>
    <div class="wrapper">
        <div class="max">
            <p>{file.name}</p>
            <p>{makeHuman(file.size)}</p>
        </div>
        <img on:click={onCancel} class="cancel" src="assets/cancel.png" alt="" srcset="">
        {#if !isUploading && !uploadId}
        <img on:click={startUpload} class="upload" src="assets/upload.png" alt="" srcset="">
        {/if}
    </div>
    {#if uploadId}
    <div class="uploadlink">
        <input bind:this={uploadlink} type="text" value={config.baseDownload + uploadId}>
        <button on:click={()=>{
            uploadlink.select();
            uploadlink.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(uploadlink.value);
        }}>Copy</button>
    </div>
    {/if}

    {#if isUploading}
    <div class="status">
        <div class="statusbar-wrapper">
            <div class="statusbar" style={statusbarStyle}></div>
        </div>
        <p class="statusper">{statusPercentage}</p>
    </div>
    {/if}
</main>


<style>
    .uploadlink {
        margin-top: 10px;
        display: flex;
    }

    .uploadlink>input {
        width: 100%;
        border-radius: 10px 0 0 10px;
    }

    .uploadlink>button {
        font-size: 15px;
        padding: 0 5px;
        border-radius: 0 10px 10px 0;
    }



    main {
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 10px 20px;
        width: 100%;
    }

    .wrapper {
        display: flex;
        align-items: center;
    }

    p {
        text-overflow: ellipsis; 
        white-space: nowrap; 
        overflow: hidden;
    }

    .max {
        width: calc(100% - 60px);
    }

    img {
        margin-left: auto;
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .upload {
        margin-left: 10px;
    }

    .status {
        display: flex;
        align-items: center;
    }

    .statusbar-wrapper {
        width: calc(100% - 90px);
        height: 7px;
        border: 1px solid var(--border);
        border-radius: 5px;
    }

    .statusbar {
        background-color: var(--primary);
        border: 1px solid var(--border);
        width: 100%;
        height: 7px;
        border-radius: 5px;
    }

    .statusper {
        margin-left: auto;
    }
</style>
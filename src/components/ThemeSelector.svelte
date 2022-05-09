<script lang="ts">
    import themes from "../themes";
    import { fade } from "svelte/transition";

    let activeTheme = localStorage.theme;
    let isOpen = false;

    function openMenu() {
        isOpen = true;
    }

    function closeMenu() {
        isOpen = false;
    }

    function setTheme(index: number) {
        activeTheme = themes[index].file;
        localStorage.theme = activeTheme;
        document.getElementById("theme").setAttribute("href", "/themes/" + activeTheme + ".css");
    }
</script>


<p class="open" on:click={openMenu}>Theme</p>

{#if isOpen}
    <div class="menu" transition:fade={{ duration: 50 }}>
        <main>
            <h1>Theme</h1>
            <p>Please select the theme you want.</p>

            {#each themes as theme, i }
                <div class="theme" class:active={theme.file===activeTheme} on:click={()=>setTheme(i)}>
                    <h3>{theme.name}</h3>
                </div>
            {/each}
        </main>    
        <p class="close" on:click={closeMenu}>Back</p>
    </div>
{/if}

<style>
    .theme.active::after {
        content: "active";
        color: var(--highlight);
        margin-left: 5px;
    }

    .open,.close {
        position: fixed;
        bottom: 0;
        left: 0;
        cursor: pointer;
        user-select: none;
    }

    .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--background);
    }

    .menu>main {
        background-color: var(--secondary);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 30px 0;
        padding-bottom: 20px;
        width: 100%;
        max-width: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .menu>main>p {
        margin-bottom: 20px;
    }

    .theme {
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 8px 20px;
        width: 90%;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer;
        user-select: none;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .theme:hover {
        background-color: var(--theme-hover);
    }

</style>
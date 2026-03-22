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
        const themeElement = document.getElementById("theme");
        if (themeElement) {
            themeElement.setAttribute("href", "/themes/" + activeTheme + ".css");
        }
    }
</script>


<button class="open" type="button" on:click={openMenu}>Theme</button>

{#if isOpen}
    <div class="menu" transition:fade={{ duration: 50 }}>
        <main>
            <h1>Theme</h1>
            <p>Please select the theme you want.</p>

            {#each themes as theme, i }
                <button type="button" class="theme" class:active={theme.file===activeTheme} on:click={()=>setTheme(i)}>
                    <h3>{theme.name}</h3>
                </button>
            {/each}
        </main>    
        <button class="close" type="button" on:click={closeMenu}>Back</button>
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
        background: none;
        border: none;
        padding: 0;
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
        background: transparent;
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
<script lang="ts">
	let { onfiles }: { onfiles: (files: FileList) => void } = $props();

	let style = $state("");
	let select: HTMLInputElement;
	let active = $state(false);

	const ondragover = (e: DragEvent) => {
		style = "background-color: var(--highlight)";
		active = true;
		e.preventDefault();
	};

	const ondragleave = () => {
		active = false;
		style = "";
	};

	const ondrop = (e: DragEvent) => {
		active = false;
		style = "";
		e.preventDefault();

		if (e.dataTransfer?.files) {
			onfiles(e.dataTransfer.files);
		}
	};

	const onclick = () => {
		select.click();
	};

	const onchange = (e: Event) => {
		const files = (e.target as HTMLInputElement).files;
		if (files) {
			onfiles(files);
		}
	};
</script>

<button
	type="button"
	class="drop"
	class:active
	{style}
	aria-label="Select files to upload"
	ondragover={ondragover}
	ondragleave={ondragleave}
	ondrop={ondrop}
	onclick={onclick}
>
	<h2>Drag & Drop</h2>
	<p>or click to select files</p>
</button>
<input bind:this={select} onchange={onchange} id="select-files" multiple type="file" />

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
		flex-direction: column;
		cursor: pointer;
		background: transparent;
		border: none;
	}

	p {
		margin-top: 6px;
		font-size: 15px;
	}

	input {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}
</style>

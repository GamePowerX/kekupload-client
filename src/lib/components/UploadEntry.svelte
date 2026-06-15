<script lang="ts">
	import * as config from "$lib/config";

	let {
		file,
		index,
		onclose
	}: {
		file: File;
		index: number;
		onclose: (index: number) => void;
	} = $props();

	let entryId: number;

	let uploadlink: HTMLInputElement;

	let isUploading = $state(false);
	let isQueueing = $state(false);
	let isRemoving = $state(false);
	let status = $state(0);
	let copyStatus = $state("");
	let errorMessage = $state("");

	let uploadId: string | undefined = $state();

	function makeHuman(size: number) {
		if (size >= 1099511627776) {
			return (size / 1099511627776).toFixed(2) + " TiB";
		} else if (size >= 1073741824) {
			return (size / 1073741824).toFixed(2) + " GiB";
		} else if (size >= 1048576) {
			return (size / 1048576).toFixed(2) + " MiB";
		} else if (size >= 1024) {
			return (size / 1024).toFixed(2) + " KiB";
		} else return size + " bytes";
	}

	function makeErrorMessage(e: unknown) {
		const networkError = "Network error. The server may be unreachable.";

		if (e instanceof Error) return e.message || networkError;
		if (typeof e === "string") return e.trim() || networkError;

		const fallback = JSON.stringify(e);
		return fallback && fallback !== "{}" ? fallback : networkError;
	}

	async function startUpload() {
		if (!isUploading && !uploadId) {
			errorMessage = "";
			isQueueing = true;
			isUploading = true;

			const ext = file.name.includes(".")
				? file.name.split(".").pop() || ""
				: "";

			entryId = config.uploader.add_job({
				then: ({ id }: { id: string }) => (uploadId = id),
				finally: () => (isUploading = false),
				on_progress: (s: number) => {
					if (isQueueing) isQueueing = false;

					status = s;
				},
				catch: (e: unknown) => {
					if (e !== "CANCELLED")
						errorMessage = "Upload failed: " + makeErrorMessage(e);
				},
				file,
				ext,
				name: config.upload_with_filename
					? file.name.split(".").slice(0, -1).join(".")
					: undefined
			});
		}
	}

	async function onCancel() {
		if (isUploading) {
			isRemoving = true;
			await config.uploader
				.cancel_job(entryId)
				.catch(
					(e) =>
						(errorMessage =
							"Could not cancel upload: " + makeErrorMessage(e))
				);
			status = 0;
			isUploading = false;
			isRemoving = false;
		} else onclose(index);
	}

	async function copyLink() {
		const value = uploadlink.value;
		uploadlink.select();
		uploadlink.setSelectionRange(0, value.length);

		try {
			if (navigator.clipboard)
				await navigator.clipboard.writeText(value);
			else document.execCommand("copy");
			copyStatus = "Copied";
		} catch (e) {
			copyStatus = "Copy failed";
		}

		window.setTimeout(() => (copyStatus = ""), 2000);
	}
</script>

<main>
	<div class="wrapper">
		<div class="max">
			<p>{file.name}</p>
			<p>{makeHuman(file.size)}</p>
		</div>
		<button
			type="button"
			class="icon-btn cancel"
			onclick={onCancel}
			aria-label="Cancel upload or remove entry"
		>
			<img src="/assets/cancel.png" alt="" />
		</button>
		{#if !isUploading && !uploadId}
			<button
				type="button"
				class="icon-btn upload"
				onclick={startUpload}
				aria-label="Start upload"
			>
				<img src="/assets/upload.png" alt="" />
			</button>
		{/if}
	</div>
	{#if uploadId}
		<div class="uploadlink">
			<input
				bind:this={uploadlink}
				type="text"
				value={config.base_download + uploadId}
				readonly
				aria-label="Upload link"
			/>
			<button type="button" onclick={copyLink}>Copy</button>
		</div>
		<p class="success">Uploaded</p>
		{#if copyStatus}
			<p class="hint">{copyStatus}</p>
		{/if}
	{/if}

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}

	{#if isUploading}
		<div class="status">
			{#if isQueueing}
				<p class="hint">Waiting for Queue...</p>
			{:else}
				{#if isRemoving}
					<p class="hint">Removing...</p>
				{:else}
					<div class="statusbar-wrapper">
						<div
							class="statusbar"
							style="width: {status * 100}%;"
						></div>
					</div>
					<p class="statusper">{(status * 100).toFixed(2)}%</p>
				{/if}
			{/if}
		</div>
	{/if}
</main>

<style>
	.uploadlink {
		margin-top: 10px;
		display: flex;
	}

	.uploadlink > input {
		width: 100%;
		border-radius: 10px 0 0 10px;
	}

	.uploadlink > button {
		font-size: 15px;
		padding: 0 5px;
		border-radius: 0 10px 10px 0;
	}

	.success {
		color: var(--highlight);
		margin-top: 5px;
	}

	.error {
		color: var(--highlight);
		margin-top: 5px;
		white-space: normal;
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

	.icon-btn {
		margin-left: auto;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	img {
		margin-left: auto;
		width: 25px;
		height: 25px;
	}

	.upload {
		margin-left: 10px;
	}

	.status {
		margin-top: 3px;
		display: flex;
		align-items: center;
	}

	.statusbar-wrapper {
		width: calc(100% - 90px);
		height: 9px;
		border: 1px solid var(--border);
		border-radius: 5px;
		padding: 0;
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

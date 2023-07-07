import { FileUploaderQueued, KekUploadAPI } from "kekupload-lib-ts";

export const title = "KekUpload";
export const description = "Upload everything";
export const base_download = "http://localhost:6942/";
export const api = new KekUploadAPI("http://localhost:6942/api/");
export const upload_with_filename = true;
export const uploader = new FileUploaderQueued({
	read_size: 1024 * 1024 * 32,
	chunk_size: 1024 * 1024 * 2,
	api
});

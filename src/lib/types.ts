export type UploadListType =
  {
    removeitem: (index: number) => void;
    addFiles: (filelist: FileList) => void;
    uploadAll: () => void;
  };
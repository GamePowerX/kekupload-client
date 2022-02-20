import CryptoJS from "crypto-js";
import config from "./config";

let cancelCallbacks: Object = {};
let queue: Array<number> = [];

let entries: Object = {};

let entryCounter = 0;

type FileQueueEntry = {
    file: File,
    onStatus: (percentage: number)=>void, 
    onSuccess: (id: String)=>void, 
    onError: (error: String)=>void
}

let workingEntryId: number|undefined = undefined;
let uploadStreamId: number = 0;

let locked = 0;

function arrayBufferToWordArray(ab) {
    let i8a = new Uint8Array(ab);
    let a = [];
    for (let i = 0; i < i8a.length; i += 4) {
        a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
}

async function makeApiRequest(path: String, buf: ArrayBuffer) : Promise<XMLHttpRequest> {
    return new Promise(resolve=>{
        let xmlHttp = new XMLHttpRequest(); 
        xmlHttp.onreadystatechange = ()=>{
            if(xmlHttp.readyState===4) resolve(xmlHttp);
        };
        xmlHttp.open("POST", config.api.baseurl + path, true);
        xmlHttp.send(buf);
    });
}

async function uploadChunk(id: String, hash: String, c: ArrayBuffer) {
    let r = await makeApiRequest("u/" + id + "/" + hash, c);
    if(r.status===200) {
        return r.response;
    } else throw r.response;
}

async function createStream(ext: String) {
    let r = await makeApiRequest("c/" + ext, null);
    if(r.status===200) {
        return r.response;
    } else throw r.response;
}

async function finishFile(id: String, h: String) {
    let r = await makeApiRequest("f/" + id + "/" + h, null);
    if(r.status===200) {
        return r.response;
    } else throw r.response;
}

async function removeFile(id: String) {
    let r = await makeApiRequest("r/" + id, null);
    if(r.status===200) {
        return r.response;
    } else throw r.response;
}

function cancelUpload(entryId: number) {
    delete entries[entryId];
    
    if(workingEntryId == entryId) {
        return new Promise(resolve => {
            cancelCallbacks[uploadStreamId] = resolve;
        });
    }

    queue = queue.filter(id=>id!=entryId);
}

function startUpload(file: File, onStatus: (percentage: number)=>void, onSuccess: (id: String)=>void, onError: (error: String)=>void) {
    let id = entryCounter++;

    entries[id] = {file, onStatus, onSuccess, onError};

    queue.push(id);

    work();

    return id;
}

async function work() {
    if(!locked++) {
        workingEntryId = queue.pop();
        while(workingEntryId != undefined) {
            await new Promise(async resolve=>{
                let entry = entries[workingEntryId];
                uploadStreamId = await uploadFile(entry.file, entry.onStatus, entry.onSuccess, entry.onError, resolve);
            });
            delete entries[workingEntryId];
            workingEntryId = queue.pop();
        }
        workingEntryId = undefined;
        locked = 0;
    }
}


async function uploadFile(file: File, onStatus: (percentage: number)=>void, onSuccess: (id: String)=>void, onError: (error: String)=>void, onFinish: (undefined)=>void) {
    let splitname = file.name.split(".");
    let ext = splitname.length>1?splitname[splitname.length-1]:"none";
    if(ext === "") ext = " ";

    ext = encodeURIComponent(ext)

    let id = await createStream(ext);

    (async ()=>{
        let hash = CryptoJS.algo.SHA1.create();
        let running = true;

        for(let i = 0; i < file.size && running; i+=config.fileChunkSize) {
            await new Promise(resolve=>{
                let slc = file.slice(i, i+config.fileChunkSize);

                let reader = new FileReader();
                reader.onload = async (e)=>{
                    let res = e.target.result as ArrayBuffer;
                    for(let f = 0; f < res.byteLength && running; f+=config.chunkSize) {
                        let success = false;
                        while(!success) {
                            if(cancelCallbacks[id]) {
                                running = false;
                                break;
                            }
            

                            try {
                                let buf = res.slice(f, f+config.chunkSize);

                                let wordArray = arrayBufferToWordArray(buf);

                                hash.update(wordArray);

                                await uploadChunk(id, CryptoJS.SHA1(wordArray).toString(), res.slice(f, f+config.chunkSize));

                                success = true;

                                onStatus((i+f)/file.size);
                            } catch(e) {}
                        }
                    }
                    resolve(null);
                }
                reader.readAsArrayBuffer(slc);
            });
        }

        if(running) {
            finishFile(id, hash.finalize().toString())
                .then(onSuccess)
                .catch(onError);
        } else {
            removeFile(id);
            cancelCallbacks[id]();
        }

        onFinish(undefined);
    })();

    return id;
}

export default {startUpload, cancelUpload};
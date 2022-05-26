
import { decodeAsync, decode } from '@msgpack/msgpack';
import axios from 'axios';

export async function decodeFromBlob(blob: Blob) {
  if (blob.stream) {
    // Blob#stream(): ReadableStream<Uint8Array> (recommended)
    return await decodeAsync(blob.stream());
  } else {
    // Blob#arrayBuffer(): Promise<ArrayBuffer> (if stream() is not available)
    return decode(await blob.arrayBuffer());
  }
}

export async function fetchMsgPackBlob(url) { 
  const response = await axios.get(url, {
    responseType: 'blob',
  });

  const data = await decodeFromBlob(response.data);
  return data;
}
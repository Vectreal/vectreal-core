export interface URIBufferObject {
  uri: string;
  byteLength: number;
}

export interface TexturesObject {
  name: string;
  sampler: number;
  source: number;
}

export interface ImageDataObject {
  data?: Uint8Array | ArrayBuffer;
  uri?: string;
  mimeType?: string;
}

export interface ExportResult {
  buffers?: ArrayBuffer[] | URIBufferObject[];
  images?: ImageDataObject[];
  textures?: TexturesObject[];
}

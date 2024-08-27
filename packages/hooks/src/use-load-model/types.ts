import { Object3D } from 'three';

export enum ModelFileTypes {
  gltf = 'gltf',
  glb = 'glb',
  usdz = 'usdz',
}

export type InputFileOrDirectory = (File | FileSystemDirectoryHandle)[];

export interface ReducedGltf {
  images: { name: string; uri: string }[];
  buffers: { bytelength: string; uri: string }[];
}

export interface ModelFile {
  model: Object3D;
  type: ModelFileTypes;
  name: string;
}

// Updated State interface
export interface State {
  file: ModelFile | null;
  isFileLoading: boolean;
  progress: number;
  supportedFileTypes: ModelFileTypes[];
}

// Updated Action types
export type Action =
  | { type: 'SET_FILE'; payload: ModelFile }
  | { type: 'SET_FILE_LOADING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'RESET_STATE' };

// Updated Event types
export type EventTypes =
  | 'MULTIPLE_3D_MODELS'
  | 'UNSUPPORTED_FILE_TYPE'
  | 'UPLOAD_PROGRESS'
  | 'UPLOAD_COMPLETE';

// Updated event data types
export type EventData = {
  MULTIPLE_3D_MODELS: File[];
  UNSUPPORTED_FILE_TYPE: File[];
  UPLOAD_PROGRESS: number;
  UPLOAD_COMPLETE: State['file'];
};

// Updated EventHandler type
export type EventHandler<T extends EventTypes> = (data: EventData[T]) => void;

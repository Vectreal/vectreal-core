/* vectreal-core | vctrl/hooks
Copyright (C) 2024 Moritz Becker

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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

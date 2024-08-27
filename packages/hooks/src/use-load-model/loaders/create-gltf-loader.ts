import { WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

function createGltfLoader() {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  const ktxLoader = new KTX2Loader();
  ktxLoader.setTranscoderPath('/draco/');

  const gltfLoader = new GLTFLoader()
    .setDRACOLoader(dracoLoader)
    .setKTX2Loader(ktxLoader.detectSupport(new WebGLRenderer()));

  return gltfLoader;
}

export default createGltfLoader;

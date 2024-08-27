import { USDZLoader } from 'three/examples/jsm/loaders/USDZLoader';

function createUsdzLoader() {
  const usdzLoader = new USDZLoader();

  return usdzLoader;
}

export default createUsdzLoader;

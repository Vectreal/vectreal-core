import { Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { VectrealViewer } from '@vctrl/viewer';

interface ModelSceneProps {
  url: string;
}

const InfoContent = () => {
  return (
    <p className="text-sm text-zinc-400 pr-4">
      This work is based on{' '}
      <a
        target="_blank"
        rel="noreferrer"
        className="text-zinc-300"
        href="https://sketchfab.com/3d-models/unused-blue-vans-shoe-96baa4684df7415ba8ba87d39bd1c2ee"
      >
        "Unused Blue Vans Shoe"
      </a>{' '}
      by{' '}
      <a
        target="_blank"
        rel="noreferrer"
        className="text-zinc-300"
        href="https://sketchfab.com/thesidekick"
      >
        Lassi Kaukonen
      </a>{' '}
      licensed under{' '}
      <a
        target="_blank"
        rel="noreferrer"
        className="text-zinc-300"
        href="https://creativecommons.org/licenses/by/4.0/"
      >
        CC-BY-4.0
      </a>
    </p>
  );
};

const HomeModelScene = ({ url }: ModelSceneProps) => {
  const { scene } = useGLTF(url);

  return (
    <VectrealViewer
      model={scene}
      infoContent={<InfoContent />}
      cameraOptions={{ initialCameraPosition: new Vector3(-5, 2, 0) }}
      controlsOptions={{ enableZoom: false, dampingFactor: 0.1 }}
      gridOptions={{ showGrid: true }}
      envOptions={{
        backgroundColor: '#141414',
        env: { preset: 'city', background: false, backgroundBlurriness: 1 },
        stage: { adjustCamera: 1 },
      }}
    />
  );
};

export default HomeModelScene;

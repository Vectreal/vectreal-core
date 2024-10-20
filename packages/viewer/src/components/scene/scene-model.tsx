import { Object3D } from 'three';
import { Stage } from '@react-three/drei';
import { EnvProps } from './scene-environment';

interface ModelProps {
  object: null | Object3D;
  envOptions?: EnvProps['stage'];
}

const SceneModel = ({ object, envOptions }: ModelProps) => {
  if (!object) return null;

  return (
    <Stage
      intensity={0.1}
      adjustCamera={1.5}
      environment={null}
      {...envOptions}
    >
      <primitive object={object || new Object3D()} />
    </Stage>
  );
};

export default SceneModel;

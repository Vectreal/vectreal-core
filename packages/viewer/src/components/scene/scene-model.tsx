import { Object3D } from 'three';
import { Stage } from '@react-three/drei';
import { useModelContext } from '@vctrl/hooks/use-load-model';

import { EnvProps } from './scene-environment';

interface ModelProps {
  object: null | Object3D;
  envOptions?: EnvProps['stage'];
}

const SceneModel = ({ object, envOptions }: ModelProps) => {
  const { file } = useModelContext();

  if (!(object || file?.model)) return null;

  return (
    <Stage
      center={{ top: true }}
      intensity={0.1}
      adjustCamera={1.5}
      environment={null}
      {...envOptions}
    >
      <primitive object={object || file?.model || new Object3D()} />
    </Stage>
  );
};

export default SceneModel;

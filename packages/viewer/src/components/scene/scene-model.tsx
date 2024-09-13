import { Stage } from '@react-three/drei';
import { useModelContext } from '@vctrl/hooks/use-load-model';
import { Object3D } from 'three';

interface ModelProps {
  object: null | Object3D;
}

const SceneModel = ({ object }: ModelProps) => {
  const { file } = useModelContext();

  if (!(object || file?.model)) return null;

  return (
    <Stage
      center={{ top: true }}
      preset="rembrandt"
      intensity={0.1}
      adjustCamera={1.5}
      shadows="contact"
      environment="city"
    >
      <primitive object={object || file?.model || new Object3D()} />
    </Stage>
  );
};

export default SceneModel;

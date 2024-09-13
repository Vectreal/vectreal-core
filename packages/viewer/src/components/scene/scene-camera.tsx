import { useEffect } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';

export interface CameraProps {
  initialCameraPosition?: Vector3;
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
}

const SceneCamera = (props: CameraProps) => {
  const { camera }: { camera: PerspectiveCamera } = useThree();

  useEffect(() => {
    camera.far = props.far || 1000;
    camera.near = props.near || 0.01;
    camera.fov = props.fov || 69;

    if (props.initialCameraPosition) {
      camera.position.set(
        props.initialCameraPosition.x,
        props.initialCameraPosition.y,
        props.initialCameraPosition.z,
      );
    }

    camera.updateProjectionMatrix();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only for initial render

  return null;
};

export default SceneCamera;

import { useEffect } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';

export interface CameraProps {
  initialCameraPosition?:
    | Vector3
    | { x: number; y: number; z: number }
    | [number, number, number];
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

    if (!props.initialCameraPosition) return;

    if (Array.isArray(props.initialCameraPosition)) {
      camera.position.set(
        props.initialCameraPosition[0],
        props.initialCameraPosition[1],
        props.initialCameraPosition[2],
      );
    } else if (
      props.initialCameraPosition instanceof Vector3 ||
      (props.initialCameraPosition instanceof Object &&
        'x' in props.initialCameraPosition &&
        'y' in props.initialCameraPosition &&
        'z' in props.initialCameraPosition)
    ) {
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

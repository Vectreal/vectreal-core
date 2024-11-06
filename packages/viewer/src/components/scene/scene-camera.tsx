import { useEffect } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';

type CameraPosition =
  | Vector3
  | { x: number; y: number; z: number }
  | [number, number, number];

export interface CameraProps {
  /**
   * Initial camera position.
   */
  initialCameraPosition?: CameraPosition;
  /**
   * Field of view.
   */
  fov?: number;
  /**
   * Aspect ratio.
   */
  aspect?: number;
  /**
   * Near clipping plane.
   */
  near?: number;
  /**
   *  Near clipping plane.
   */
  far?: number;
}

export const defaultCameraOptions: Required<CameraProps> = {
  aspect: 1,
  initialCameraPosition: new Vector3(0, 0, 5),
  fov: 69,
  near: 0.01,
  far: 1000,
};

/**
 * Configures the Three.js camera using provided props.
 *
 * @param {CameraProps} props - Camera configuration.
 * @returns {null} No rendered output.
 */
const SceneCamera = (props: CameraProps) => {
  const cameraOptions = { ...defaultCameraOptions, ...props };
  const { initialCameraPosition, fov, near, far } = cameraOptions;
  const { camera } = useThree();

  useEffect(() => {
    camera.far = far;
    camera.near = near;
    (camera as PerspectiveCamera).fov = fov;

    const pos = initialCameraPosition;

    if (pos instanceof Vector3) {
      camera.position.copy(pos);
    } else if (Array.isArray(pos)) {
      camera.position.fromArray(pos);
    } else {
      camera.position.set(pos.x, pos.y, pos.z);
    }

    camera.updateProjectionMatrix();
  }, [camera, initialCameraPosition, fov, near, far]);

  return null;
};

export default SceneCamera;

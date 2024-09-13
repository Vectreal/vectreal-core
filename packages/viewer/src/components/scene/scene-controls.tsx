import { OrbitControls, OrbitControlsProps } from '@react-three/drei';
import { useEffect, useState } from 'react';

export interface ControlsProps extends OrbitControlsProps {
  controlsTimeout?: number;
}

const SceneControls = ({ enabled, ...rest }: ControlsProps) => {
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);

  const controlsOptions = {
    enabled,
    maxPolarAngle: Math.PI / 2,
    autoRotate: true,
    makeDefault: true,
    ...rest,
  };

  // wait for the stage component to center the model
  // after 1 second enable the controls
  useEffect(() => {
    if (isControlsEnabled) return;

    const timeoutId = setTimeout(
      () => setIsControlsEnabled(true),
      controlsOptions?.controlsTimeout || 1500,
    );

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <OrbitControls {...controlsOptions} />;
};

export default SceneControls;

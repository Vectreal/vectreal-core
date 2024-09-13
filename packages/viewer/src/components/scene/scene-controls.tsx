import { useEffect, useMemo, useState } from 'react';
import { OrbitControls, OrbitControlsProps } from '@react-three/drei';

export interface ControlsProps extends OrbitControlsProps {
  controlsTimeout?: number;
}

const SceneControls = ({ enabled, ...rest }: ControlsProps) => {
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);

  const controlsOptions = useMemo(
    () => ({
      enabled,
      maxPolarAngle: Math.PI / 2,
      autoRotate: true,
      makeDefault: true,
      ...rest,
    }),
    [enabled, rest],
  );

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

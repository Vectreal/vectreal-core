import { useEffect, useState } from 'react';
import { OrbitControls, OrbitControlsProps } from '@react-three/drei';

export interface ControlsProps extends OrbitControlsProps {
  controlsTimeout?: number;
}

const SceneControls = ({
  enabled,
  controlsTimeout = 1500,
  ...rest
}: ControlsProps) => {
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setIsControlsEnabled(true),
      controlsTimeout,
    );

    return () => clearTimeout(timeoutId);
  }, [controlsTimeout]);

  return (
    <OrbitControls
      enabled={isControlsEnabled && enabled}
      maxPolarAngle={Math.PI / 2}
      autoRotate
      makeDefault
      {...rest}
    />
  );
};

export default SceneControls;

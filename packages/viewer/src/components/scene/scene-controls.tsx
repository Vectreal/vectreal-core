import { useEffect, useState } from 'react';
import { OrbitControls, OrbitControlsProps } from '@react-three/drei';

export interface ControlsProps extends OrbitControlsProps {
  /**
   * The timeout duration in milliseconds before enabling the controls.
   */
  controlsTimeout?: number;
}

export const defaultControlsOptions: ControlsProps = {
  controlsTimeout: 1500,
  maxPolarAngle: Math.PI / 2,
  autoRotate: true,
  makeDefault: true,
};

/**
 * SceneControls component that enables orbit controls after a specified timeout.
 */
const SceneControls = (props: ControlsProps) => {
  const { controlsTimeout, ...rest } = { ...defaultControlsOptions, ...props };
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsControlsEnabled(true);
    }, controlsTimeout);

    return () => clearTimeout(timeoutId);
  }, [controlsTimeout]);

  return isControlsEnabled && <OrbitControls {...rest} />;
};

export default SceneControls;

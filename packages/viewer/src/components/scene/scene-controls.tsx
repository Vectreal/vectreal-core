import { useEffect, useState } from 'react';
import { OrbitControls, OrbitControlsProps } from '@react-three/drei';

export interface ControlsProps extends OrbitControlsProps {
  controlsTimeout?: number;
}

/**
 * SceneControls component that enables orbit controls after a specified timeout.
 *
 * @param {ControlsProps} props - The properties for the SceneControls component.
 * @param {number} [props.controlsTimeout=1500] - The timeout duration in milliseconds before enabling the controls.
 * @param {Object} rest - Additional properties passed to the OrbitControls component.
 *
 * @returns {JSX.Element} The OrbitControls component if controls are enabled.
 *
 * @example
 * <SceneControls controlsTimeout={2000} />
 */
const SceneControls = ({ controlsTimeout = 1500, ...rest }: ControlsProps) => {
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('SceneControls: useEffect');
      setIsControlsEnabled(true);
    }, controlsTimeout);

    return () => clearTimeout(timeoutId);
  }, [controlsTimeout]);

  return (
    isControlsEnabled && (
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        autoRotate
        makeDefault
        {...rest}
      />
    )
  );
};

export default SceneControls;

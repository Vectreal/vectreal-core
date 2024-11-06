import { ComponentProps, CSSProperties } from 'react';
import { Environment, EnvironmentProps, Stage } from '@react-three/drei';

export interface EnvProps {
  /**
   * Optional environment properties.
   */
  env?: EnvironmentProps;

  /**
   * Optional properties for the Stage component.
   */
  stage?: ComponentProps<typeof Stage>;

  /**
   * Optional background color for the viewer.
   */
  backgroundColor?: CSSProperties['backgroundColor'];
}

export const defaultEnvOptions: EnvProps = {
  env: {
    preset: 'apartment',
  },
  stage: {
    intensity: 0.1,
    adjustCamera: 1.5,
    environment: null,
  },
};

/**
 * SceneEnvironment component that sets up the environment for a scene.
 */
const SceneEnvironment = (props: EnvProps['env']) => {
  return <Environment {...defaultEnvOptions.env} {...props} />;
};

export default SceneEnvironment;

import { ComponentProps, CSSProperties } from 'react';
import { Environment, EnvironmentProps, Stage } from '@react-three/drei';

export interface EnvProps {
  env?: EnvironmentProps;
  stage?: ComponentProps<typeof Stage>;
  backgroundColor?: CSSProperties['backgroundColor'];
}

const SceneEnvironment = (props: EnvProps['env']) => {
  return <Environment preset="apartment" {...props} />;
};

export default SceneEnvironment;

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useLayoutEffect, useState } from 'react';

interface ModelSceneProps {
  url: string;
}

const HomeModelScene = ({ url }: ModelSceneProps) => {
  const { scene } = useGLTF(url);
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);

  // wait for the stage component to center the model
  // after 1 second enable the controls
  useLayoutEffect(() => {
    if (isControlsEnabled || !scene) return;
    const timeoutId = setTimeout(() => setIsControlsEnabled(true), 1500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  return (
    <Canvas className="h-full w-full -top-9" camera={{ position: [5, 0, 0] }}>
      {isControlsEnabled && (
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          makeDefault
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          dampingFactor={0.2}
        />
      )}
      <Stage preset="soft" environment="city" adjustCamera={1.5}>
        <primitive object={scene} />
      </Stage>
    </Canvas>
  );
};

export default HomeModelScene;

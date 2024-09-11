/* vectreal-core | vctrl/viewer
Copyright (C) 2024 Moritz Becker

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

import { Suspense, useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { clsx } from 'clsx';
import { Object3D, PerspectiveCamera, Vector3 } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import {
  Grid,
  GridProps as ThreeGridProps,
  OrbitControls,
  OrbitControlsProps,
  Stage,
} from '@react-three/drei';

import { useModelContext } from '@vctrl/hooks/use-load-model';

interface ModelProps {
  object: null | Object3D;
}

const Model = ({ object }: ModelProps) => {
  const { file } = useModelContext();

  if (!(object || file?.model)) return null;

  return (
    <Stage
      center={{ top: true }}
      preset="rembrandt"
      intensity={0.1}
      adjustCamera={1.5}
      shadows="contact"
      environment="city"
    >
      <primitive object={object || file?.model || new Object3D()} />
    </Stage>
  );
};

const Spinner = () => {
  return (
    <MutatingDots
      height="100px"
      width="100px"
      color="#fff"
      secondaryColor="#fff"
    />
  );
};

const SpinnerWrapper = ({ loader }: { loader: JSX.Element }) => {
  return (
    <div className="flex items-center justify-center absolute top-0 right-0 bottom-0 left-0">
      {loader}
    </div>
  );
};

interface CameraProps {
  initialCameraPosition?: Vector3;
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
}

const Camera = (props: CameraProps) => {
  const { camera }: { camera: PerspectiveCamera } = useThree();

  useEffect(() => {
    camera.far = props.far || 1000;
    camera.near = props.near || 0.01;
    camera.fov = props.fov || 69;

    if (props.initialCameraPosition) {
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

interface ControlsProps extends OrbitControlsProps {
  controlsTimeout?: number;
}

interface GridProps extends ThreeGridProps {
  showGrid: boolean;
}

interface VectrealViewerProps {
  model?: Object3D;
  className?: string;
  cameraOptions?: CameraProps;
  controlsOptions?: ControlsProps;
  gridOptions?: GridProps;
  loader?: JSX.Element;
}

const VectrealViewer = ({ model, ...props }: VectrealViewerProps) => {
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);
  const { isFileLoading } = useModelContext();

  const { cameraOptions, gridOptions, loader = <Spinner /> } = props;
  let { className, controlsOptions } = props;

  // wait for the stage component to center the model
  // after 1 second enable the controls
  useEffect(() => {
    if (isControlsEnabled || isFileLoading) return;

    const timeoutId = setTimeout(
      () => setIsControlsEnabled(true),
      controlsOptions?.controlsTimeout || 1500,
    );

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  className = clsx('w-full h-full', className);

  controlsOptions = {
    enabled: controlsOptions?.enabled,
    maxPolarAngle: Math.PI / 2,
    autoRotate: true,
    makeDefault: true,
    ...controlsOptions,
  };

  const { showGrid = false, ...gridOptionsRest } = {
    cellSize: 0.5,
    sectionSize: 5,
    sectionColor: 'rgb(134, 73, 33)',
    cellColor: 'rgb(100, 100, 100)',
    fadeDistance: 25,
    fadeStrength: 1,
    args: [10, 10],
    followCamera: false,
    infiniteGrid: true,
    ...gridOptions,
  };

  return (
    <div className="w-full h-full">
      {isFileLoading ? (
        <SpinnerWrapper loader={loader} />
      ) : (
        <Suspense fallback={loader}>
          <Canvas className={className} dpr={[1, 1.5]} shadows>
            <OrbitControls {...controlsOptions} />
            <Camera {...cameraOptions} />
            <Model object={model || null} />
            {showGrid && <Grid {...(gridOptionsRest as GridProps)} />}
          </Canvas>
        </Suspense>
      )}
    </div>
  );
};

export default VectrealViewer;

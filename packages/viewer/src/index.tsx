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

import { Suspense } from 'react';
import { clsx } from 'clsx';
import { Object3D } from 'three';
import { Canvas } from '@react-three/fiber';

import { useModelContext } from '@vctrl/hooks/use-load-model';

import { DefaultSpinner, SpinnerWrapper } from './components';
import {
  CameraProps,
  ControlsProps,
  GridProps,
  SceneCamera,
  SceneControls,
  SceneGrid,
  SceneModel,
} from './components/scene';

interface VectrealViewerProps {
  model?: Object3D;
  className?: string;
  cameraOptions?: CameraProps;
  controlsOptions?: ControlsProps;
  gridOptions?: GridProps;
  loader?: JSX.Element;
}

export const VectrealViewer = ({ model, ...props }: VectrealViewerProps) => {
  const { isFileLoading } = useModelContext();

  const {
    cameraOptions,
    gridOptions,
    controlsOptions,
    loader = <DefaultSpinner />,
  } = props;

  let { className } = props;

  className = clsx('w-full h-full', className);

  return (
    <div className="w-full h-full">
      {isFileLoading ? (
        <SpinnerWrapper loader={loader} />
      ) : (
        <Suspense fallback={loader}>
          <Canvas className={className} dpr={[1, 1.5]} shadows>
            <SceneModel object={model || null} />
            <SceneCamera {...cameraOptions} />
            <SceneGrid {...gridOptions} />
            {!isFileLoading && <SceneControls {...controlsOptions} />}
          </Canvas>
        </Suspense>
      )}
    </div>
  );
};

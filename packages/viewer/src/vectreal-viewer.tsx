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

import {
  CameraProps,
  ControlsProps,
  GridProps,
  SceneCamera,
  SceneControls,
  SceneGrid,
  SceneModel,
} from './components/scene';
import { DefaultSpinner, SpinnerWrapper } from './components';

interface VectrealViewerProps {
  model?: Object3D;
  className?: string;
  cameraOptions?: CameraProps;
  controlsOptions?: ControlsProps;
  gridOptions?: GridProps;
  loader?: JSX.Element;
}

/**
 * A React component for rendering 3D models.
 *
 * This component is designed to be easily extensible and customizable. It uses the
 * `useModelContext` hook to access the model context and loading state. It also uses the
 * `@react-three/drei` library to render the 3D scene.
 *
 * If a model is not provided, the component will render a spinner until the model is loaded.
 *
 * The component also accepts the following props:
 *
 * - `model`: A 3D model to render if not provided as child or via the `ModelContext`.
 * - `className`: An optional className to apply to the outermost container element.
 * - `cameraOptions`: An optional object containing options for the camera.
 * - `controlsOptions`: An optional object containing options for the OrbitControls.
 * - `envOptions`: An optional object containing options for the environment.
 * - `gridOptions`: An optional object containing options for the grid.
 * - `loader`: An optional JSX element to render while the model is loading.
 *
 * The component will render a `Canvas` component with the provided props. It will also render a
 * `SceneCamera`, `SceneModel`, `SceneEnvironment`, and `SceneGrid` component inside the canvas.
 *
 * If the `controlsOptions` prop is not provided, the component will not render any controls.
 *
 * The component will render any provided children inside the canvas.
 *
 * See [The official website]({@link https://core.vectreal.com}) or the [vctrl/viewer README]({@link https://github.com/vectreal/vectreal-core/blob/main/packages/viewer/README.md}) for more information.
 *
 * @example
 * import { VectrealViewer } from '@vctrl/viewer';
 *
 * const MyComponent = () => {
 *   return (
 *     <VectrealViewer
 *       model={model}
 *       controlsOptions={{ maxPolarAngle: Math.PI / 2 }}
 *       envOptions={{ stage: { preset: 'sunset' } }}
 *     />
 *   );
 * };
 */
const VectrealViewer = ({ model, ...props }: VectrealViewerProps) => {
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
        <Suspense fallback={<SpinnerWrapper loader={loader} />}>
            <SceneCamera {...cameraOptions} />
            <SceneGrid {...gridOptions} />
            {!isFileLoading && <SceneControls {...controlsOptions} />}
          </Canvas>
        </Suspense>
      )}
    </div>
  );
};

export default VectrealViewer;

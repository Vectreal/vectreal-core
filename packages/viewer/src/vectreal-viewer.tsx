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

import { PropsWithChildren, Suspense } from 'react';
import { Object3D } from 'three';
import { Canvas } from '@react-three/fiber';
import { cn } from '@vctrl/shared/lib/utils';

import {
  CameraProps,
  ControlsProps,
  EnvProps,
  GridProps,
  SceneCamera,
  SceneControls,
  SceneEnvironment,
  SceneGrid,
  SceneModel,
} from './components/scene';

import { DefaultSpinner, InfoPopover, SpinnerWrapper } from './components';

import './index.css';

interface VectrealViewerProps extends PropsWithChildren {
  model?: Object3D;
  className?: string;
  cameraOptions?: CameraProps;
  controlsOptions?: ControlsProps;
  envOptions?: EnvProps;
  gridOptions?: GridProps;
  loader?: JSX.Element;
  infoContent?: JSX.Element | string;
}

/**
 * A React component for rendering 3D models.
 *
 * This component is designed to be easily extensible and customizable. It uses the
 * `@react-three/drei` library to render the 3D scene.
 *
 * The component also accepts the following props:
 *
 * - `children`: Any React children to render inside the canvas.
 * - `model`: A 3D model to render as three `Object3D`.
 * - `className`: An optional className to apply to the outermost container element.
 * - `cameraOptions`: An optional object containing options for the camera.
 * - `controlsOptions`: An optional object containing options for the OrbitControls.
 * - `envOptions`: An optional object containing options for the environment.
 * - `gridOptions`: An optional object containing options for the grid.
 * - `loader`: An optional JSX element to render while the model is loading.
 * - `infoContent`: An optional JSX element or string to render as the info popover content.
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
  const {
    className,
    children,
    cameraOptions,
    envOptions,
    gridOptions,
    controlsOptions,
    infoContent,
    loader = <DefaultSpinner />,
  } = props;

  return (
    <div className="vctrl-viewer w-full h-full grow overflow-clip">
      {model && (
        <Suspense fallback={<SpinnerWrapper loader={loader} />}>
          <Canvas
            className={cn('vctrl-viewer-canvas w-full h-full', className)}
            dpr={[1, 1.5]}
            shadows
            style={{ backgroundColor: envOptions?.backgroundColor }}
          >
            <SceneCamera {...cameraOptions} />
            <SceneEnvironment {...envOptions?.env} />
            <SceneGrid {...gridOptions} />
            <SceneModel object={model || null} envOptions={envOptions?.stage} />
            <SceneControls {...controlsOptions} />
            {children}
          </Canvas>
        </Suspense>
      )}

      <InfoPopover content={infoContent} />
    </div>
  );
};

export default VectrealViewer;

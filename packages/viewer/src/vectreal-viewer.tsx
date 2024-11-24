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

import {
  DefaultSpinner,
  InfoPopover,
  SpinnerWrapper,
  type InfoPopoverProps,
} from './components';

import styles from './styles.module.css';

interface VectrealViewerProps extends PropsWithChildren {
  /**
   * The 3D model to render in the viewer. (three.js `Object3D`)
   */
  model?: Object3D;

  /**
   * An optional className to apply to the outermost container of the viewer.
   */
  className?: string;

  /**
   * Options for the camera.
   */
  cameraOptions?: CameraProps;

  /**
   * Options for the OrbitControls.
   */
  controlsOptions?: ControlsProps;

  /**
   * Options for the react-three environment and stage components.
   */
  envOptions?: EnvProps;

  /**
   * Options for the grid.
   *
   * @see {@link https://drei.docs.pmnd.rs/gizmos/grid}
   */
  gridOptions?: GridProps;

  /**
   * Options for the info popover.
   */
  infoPopoverOptions?: InfoPopoverProps;

  /**
   * JSX element to render while the model is loading.
   */
  loader?: JSX.Element;
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
 * - `infoPopoverOptions`: An optional object containing options for the info popover.
 * - `loader`: An optional JSX element to render while the model is loading.
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
    infoPopoverOptions,
    loader = <DefaultSpinner />,
  } = props;

  // Check if the dark mode is manually enabled - This needs to be js because of CSS modules and minification
  const isManualDarkModel = className?.split(' ').includes('dark');

  return (
    <div
      className={cn(
        className,
        'vctrl-viewer',
        styles['viewer'],
        isManualDarkModel && styles.dark,
      )}
    >
      {model && (
        <Suspense fallback={<SpinnerWrapper loader={loader} />}>
          <Canvas
            className={cn('vctrl-viewer-canvas', styles['viewer-canvas'])}
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

      <InfoPopover {...infoPopoverOptions} />
    </div>
  );
};

export default VectrealViewer;

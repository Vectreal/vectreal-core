import React, { ComponentProps } from 'react';
import { useGLTF } from '@react-three/drei';
import type { Meta, StoryObj } from '@storybook/react';

import { defaultInfoPopoverProps } from './components';
import {
  defaultCameraOptions,
  defaultControlsOptions,
  defaultEnvOptions,
  defaultGridOptions,
} from './components/scene';

import VectrealViewer from './vectreal-viewer';

type ViewerProps = ComponentProps<typeof VectrealViewer>;

const Component = (props: ViewerProps) => {
  const { scene } = useGLTF(
    // Model from the glTF sample models repository
    'https://raw.githack.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
  );

  return (
    <div style={{ height: '100vh', margin: '-1rem', overflow: 'hidden' }}>
      <VectrealViewer model={scene} {...props} />
    </div>
  );
};

const meta: Meta<typeof VectrealViewer> = {
  component: Component,
  title: 'VectrealViewer',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cameraOptions: defaultCameraOptions,
    controlsOptions: defaultControlsOptions,
    envOptions: defaultEnvOptions,
    gridOptions: defaultGridOptions,
    infoPopoverOptions: defaultInfoPopoverProps,
  },
};

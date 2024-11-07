# vctrl/viewer

[![Version and release packages to NPM](https://img.shields.io/github/actions/workflow/status/vectreal/vectreal-core/version-release.yaml?logo=github&logoColor=%23fc6c18&label=Version%20and%20release%20packages%20to%20NPM&color=%23fc6c18)
](https://github.com/Vectreal/vectreal-core/actions/workflows/version-release.yaml)
[![@vctrl/viewer | NPM Downloads](https://img.shields.io/npm/dm/%40vctrl%2Fviewer?logo=npm&logoColor=%23fc6c18&label=%40vctrl%2Fviewer%20%7C%20NPM%20Downloads&color=%23fc6c18)](https://npmjs.com/package/@vctrl/viewer)
[![Code sandbox](https://img.shields.io/badge/Code_Sandbox_example-Open-fc6c18?logo=codesandbox&logoColor=%23fc6c18)](https://codesandbox.io/p/sandbox/vectreal-core-viewer-vctrl-viewer-example-kwncm2)
[![Storybook vctrl/viewer](https://img.shields.io/badge/Storybook_vctrl/viewer-Docs-fc6c18?logo=storybook&logoColor=%23fc6c18)](https://main--672b9522ee5bda25942a731c.chromatic.com/?path=/docs/vectrealviewer--docs)

> This library is still undergoing heavy development until the first major version is released. This may lead to breaking changes in upcoming updates.

## Overview

vctrl/viewer is a React component library for rendering and interacting with 3D models. It's part of the [vectreal-core](https://github.com/vectreal/vectreal-core) ecosystem and is designed to work seamlessly with the [`@vctrl/hooks`](https://www.npmjs.com/package/@vctrl/hooks?activeTab=readme) package for model loading and management.

## Table of Contents

- [vctrl/viewer](#vctrlviewer)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Reference](#api-reference)
    - [`VectrealViewer` Component](#vectrealviewer-component)
    - [Props](#props)
  - [Customization](#customization)
    - [Camera Options](#camera-options)
    - [Controls Options](#controls-options)
    - [Environment/Stage Options](#environmentstage-options)
    - [Grid Options](#grid-options)
  - [Development](#development)
  - [License](#license)
  - [Contributing](#contributing)
  - [Support](#support)

## Features

- Easy-to-use React component for 3D model visualization
- Integration with Three.js and React Three Fiber
- Customizable camera, controls, and grid options
- Support for various 3D model formats (via vctrl/hooks)
- Responsive design with automatic resizing
- Custom loading component support

## Installation

To install the package, use npm or yarn:

```bash
npm install @vctrl/viewer
# or
yarn add @vctrl/viewer
```

## Usage

Here's a basic example of how to use the VectrealViewer component:

```tsx
import React from 'react';

// Use vctrl/hooks for loading a local model
import { useLoadModel } from '@vctrl/hooks/useLoadModel';

// You could also use the `useGLTF` hook from `@react-three/drei`
// import { useGLTF } from '@react-three/drei'

import { VectrealViewer } from '@vctrl/viewer';
import '@vctrl/viewer/css';

function App() {
  const { file } = useLoadModel();
  // const { scene: model } = useGLTF('/model.glb');

  return <VectrealViewer model={file.model} />;
}

export default App;
```

> You must also import the CSS bundle for the viewer to work as expected. See the full example [here](https://codesandbox.io/p/sandbox/vectreal-core-viewer-vctrl-viewer-example-kwncm2).

> You can also load any model supported by the [react-three-drei](https://github.com/pmndrs/react-three-drei) loading hooks and pass it into the `VectrealViewer` using the `model` prop.

## API Reference

### `VectrealViewer` Component

The main component exported by this package.

### Props

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>model</td>
      <td>Object3D</td>
      <td>(Optional when using `use-load-model` context) The 3D model to display</td>
    </tr>
    <tr>
      <td>className</td>
      <td>string</td>
      <td>(Optional) Additional CSS classes for the viewer container</td>
    </tr>
    <tr>
      <td>cameraOptions</td>
      <td>CameraProps</td>
      <td>(Optional) Configuration for the camera</td>
    </tr>
    <tr>
      <td>controlsOptions</td>
      <td>ControlsProps</td>
      <td>(Optional) Configuration for the OrbitControls</td>
    </tr>
    <tr>
      <td>envOptions</td>
      <td>EnvProps</td>
      <td>(Optional) Configuration for the Stage and Environment Component</td>
    </tr>
    <tr>
      <td>gridOptions</td>
      <td>GridProps</td>
      <td>(Optional) Configuration for the grid</td>
    </tr>
    <tr>
      <td>loader</td>
      <td>() => JSX.Element</td>
      <td>(Optional) Custom loading component</td>
    </tr>
  </tbody>
</table>

## Customization

### Camera Options

- [Perspective Camera docs](https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera)

You can customize the camera by passing a `cameraOptions` prop:

```jsx
<VectrealViewer
  cameraOptions={{
    initialCameraPosition: new Vector3(0, 5, 5),
    fov: 75,
    aspect: 1,
    near: 0.1,
    far: 1000,
  }}
/>
```

### Controls Options

- [`Orbit-controls` props interface](https://github.com/pmndrs/drei/blob/c5862585174f0eabfa92485d0ceaae862071a332/src/core/OrbitControls.tsx#L11)

Customize the controls based on OrbitControls with the `controlsOptions` prop:

```jsx
<VectrealViewer
  controlsOptions={{
    maxPolarAngle: Math.PI / 2,
    autoRotate: true,
    controlsTimeout: 2000,
  }}
/>
```

### Environment/Stage Options

- [`Stage` props interface](https://github.com/pmndrs/drei/blob/c5862585174f0eabfa92485d0ceaae862071a332/src/core/Stage.tsx#L47)
- [`Environment` props interface](https://github.com/pmndrs/drei/blob/c5862585174f0eabfa92485d0ceaae862071a332/src/core/Environment.tsx#L8)

Customize the @react-three/drei `Stage` and `Environment` components with the `controlsOptions` prop:

```jsx
<VectrealViewer
  envOptions={{
    env: {
      preset: 'studio',
    },
    stage: {
      adjustCamera: 1.5,
    },
    backgroundColor: 'maroon',
  }}
/>
```

### Grid Options

- [`Grid` props interface](https://github.com/pmndrs/drei/blob/c5862585174f0eabfa92485d0ceaae862071a332/src/core/Grid.tsx#L14)

Configure the grid display with the `gridOptions` prop:

```jsx
<VectrealViewer
  gridOptions={{
    showGrid: true,
    cellSize: 0.5,
    sectionSize: 5,
    sectionColor: 'rgb(134, 73, 33)',
    cellColor: 'rgb(100, 100, 100)',
  }}
/>
```

## Development

This package is part of a monorepo workspace managed with Nx. To contribute or modify the package:

1. Clone the monorepo
2. Install dependencies: `npm install` or `yarn install`
3. Make your changes
4. Build the package: `nx build vctrl/viewer`
5. Test your changes: `nx test vctrl/viewer`

## License

Please refer to the LICENSE file in the package root for licensing information.

## Contributing

Contributions are welcome! Please read the contributing guidelines in the [vectreal-core](https://github.com/vectreal/vectreal-core) monorepo before submitting pull requests.

## Support

For issues, feature requests, or questions, please file an issue in the [GitHub repository](https://github.com/vectreal/vectreal-core).

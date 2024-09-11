# vctrl/viewer

[![Version and release packages to NPM](https://img.shields.io/github/actions/workflow/status/vectreal/vectreal-core/version-release.yaml?logo=github&logoColor=%23fc6c18&label=Version%20and%20release%20packages%20to%20NPM&color=%23fc6c18)
](https://github.com/Vectreal/vectreal-core/actions/workflows/version-release.yaml)
[![@vctrl/viewer | NPM Downloads](https://img.shields.io/npm/dm/%40vctrl%2Fviewer?logo=npm&logoColor=%23fc6c18&label=%40vctrl%2Fviewer%20%7C%20NPM%20Downloads&color=%23fc6c18)](https://npmjs.com/package/@vctrl/viewer)

> This library is still undergoing heavy development until the first major version is released. This may lead to breaking changes in upcoming updates.

## Overview

vctrl/viewer is a React component library for rendering and interacting with 3D models. It's part of the vectreal ecosystem and is designed to work seamlessly with the vctrl/hooks package for model loading and management.

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
    - [Grid Options](#grid-options)
  - [Integration with vctrl/hooks](#integration-with-vctrlhooks)
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

```jsx
import React from 'react';
import { VectrealViewer } from '@vctrl/viewer';
import { ModelProvider } from '@vctrl/hooks/use-load-model';

function App() {
  return (
    <ModelProvider>
      <VectrealViewer />
    </ModelProvider>
  );
}

export default App;
```

> You can also load any model supported by the [react-three-drei](https://github.com/pmndrs/react-three-drei) loading hooks and pass it into the `VectrealViewer` using the `model` prop.

## API Reference

### `VectrealViewer` Component

The main component exported by this package.

### Props

| Prop            | Type              | Description                                                |
| --------------- | ----------------- | ---------------------------------------------------------- |
| model           | Object3D          | (Optional) The 3D model to display                         |
| className       | string            | (Optional) Additional CSS classes for the viewer container |
| cameraOptions   | CameraProps       | (Optional) Configuration for the camera                    |
| controlsOptions | ControlsProps     | (Optional) Configuration for the OrbitControls             |
| gridOptions     | GridProps         | (Optional) Configuration for the grid                      |
| loader          | () => JSX.Element | (Optional) Custom loading component                        |

## Customization

### Camera Options

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

Customize the OrbitControls with the `controlsOptions` prop:

```jsx
<VectrealViewer
  controlsOptions={{
    maxPolarAngle: Math.PI / 2,
    autoRotate: true,
    controlsTimeout: 2000,
  }}
/>
```

### Grid Options

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

## Integration with vctrl/hooks

The VectrealViewer component is designed to work with the vctrl/hooks package. It uses the `useModelContext` hook to access the loaded model and loading state:

```jsx
import { ModelProvider } from '@vctrl/hooks/use-load-model';
import { VectrealViewer } from '@vctrl/viewer';

function App() {
  return (
    <ModelProvider>
      <VectrealViewer />
      {/* Other components that use the model context */}
    </ModelProvider>
  );
}
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

For issues, feature requests, or questions, please file an issue in the GitHub repository.

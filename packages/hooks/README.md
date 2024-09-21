# vctrl/hooks

[![Version and release packages to NPM](https://img.shields.io/github/actions/workflow/status/vectreal/vectreal-core/version-release.yaml?logo=github&logoColor=%23fc6c18&label=Version%20and%20release%20packages%20to%20NPM&color=%23fc6c18)
](https://github.com/Vectreal/vectreal-core/actions/workflows/version-release.yaml)
[![@vctrl/hooks | NPM Downloads](https://img.shields.io/npm/dm/%40vctrl%2Fhooks?logo=npm&logoColor=%23fc6c18&label=%40vctrl%2Fhooks%20%7C%20NPM%20Downloads&color=%23fc6c18)](https://www.npmjs.com/package/@vctrl/hooks)

> **Note**: This library is still undergoing heavy development until the first major version is released. This may lead to breaking changes in upcoming updates.

## Overview

`@vctrl/hooks` is a React hooks package designed to simplify 3D model loading, optimization, and exporting within React applications. It's part of the vectreal-core ecosystem and is primarily used in the `@vctrl/viewer` React component and the official website application.

The package provides powerful hooks for:

- Loading various 3D model file formats (`useLoadModel`)
- Optimizing 3D models (`useOptimizeModel`)
- Exporting 3D models from Three.js scenes (`useExportModel`)

It also includes a React context (`ModelContext`) for easy state management and an event system for handling different stages of the model loading process.

## Table of Contents

- [vctrl/hooks](#vctrlhooks)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Hooks](#hooks)
    - [useLoadModel](#useloadmodel)
      - [Overview](#overview-1)
      - [Features](#features)
      - [Usage](#usage)
      - [API Reference](#api-reference)
      - [Event System](#event-system)
        - [Events](#events)
    - [useOptimizeModel](#useoptimizemodel)
      - [Overview](#overview-2)
      - [Features](#features-1)
      - [Usage](#usage-1)
      - [API Reference](#api-reference-1)
    - [useExportModel](#useexportmodel)
      - [Overview](#overview-3)
      - [Features](#features-2)
      - [Usage](#usage-2)
      - [API Reference](#api-reference-2)
  - [ModelContext](#modelcontext)
  - [Common Concepts](#common-concepts)
    - [Supported File Types](#supported-file-types)
    - [File Loading Process](#file-loading-process)
    - [State Management](#state-management)
    - [Integration with Three.js](#integration-with-threejs)
  - [Development](#development)
  - [License](#license)
  - [Contributing](#contributing)
  - [Support](#support)

## Installation

To install the package, use npm or yarn:

```bash
npm install @vctrl/hooks
# or
yarn add @vctrl/hooks
```

## Hooks

### useLoadModel

#### Overview

`useLoadModel` is a React hook for loading and managing 3D model files in your application. It supports various file formats and integrates with Three.js for rendering.

#### Features

- Supports direct 3D model file loading (GLTF, GLB, USDZ)
- Provides loading progress updates
- Emits events during the loading process
- Integrates with Three.js
- Supports multiple file uploads (e.g., `.gltf` with associated `.bin` and texture files)
- TypeScript support

#### Usage

Here's a basic example of how to use `useLoadModel`:

```jsx
import React from 'react';
import { useLoadModel } from '@vctrl/hooks/use-load-model';

function ModelLoader() {
  const { load, file, progress, isLoading } = useLoadModel();

  const onFileChange = (event) => {
    const files = Array.from(event.target.files);
    load(files);
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} multiple />
      {isLoading && <p>Loading: {progress}%</p>}
      {file && <p>Model loaded: {file.name}</p>}
    </div>
  );
}
```

> **Note**: Multiple files can be handled, e.g., when uploading a `.gltf` model along with its `.bin` file and relevant texture files (e.g., `.jpeg`, `.png`).

You can also use the `ModelProvider` and `useModelContext` to access the model state across your application:

```jsx
// App.jsx
import React from 'react';
import { ModelProvider } from '@vctrl/hooks/use-load-model';
import ModelConsumer from './ModelConsumer';

function App() {
  return (
    <ModelProvider>
      <ModelConsumer />
    </ModelProvider>
  );
}

// ModelConsumer.jsx
import React from 'react';
import { useModelContext } from '@vctrl/hooks/use-load-model';

function ModelConsumer() {
  const { file, isLoading, progress, load } = useModelContext();

  // Use the context values
  return (
    // ... your component logic
  );
}
```

> **Note**: When using the React context, load models using the `useModelContext` hook.

#### API Reference

The `useLoadModel` hook returns the following:

- `file`: The loaded file object (`ModelFile | null`).
- `isLoading`: A boolean indicating whether a file is currently being loaded.
- `progress`: A number between 0 and 100 representing the loading progress.
- `load(files)`: A function to handle file uploads. It accepts an array of `File` objects or a mixed array of `File` objects and directory entries.
- `reset()`: A function to reset the internal state back to its initial values.
- `on(event, handler)`: A function to subscribe to events.
- `off(event, handler)`: A function to unsubscribe from events.
- `optimize`: An object optionally populated by the `useOptimizeModel` hook (see below).

#### Event System

The `useLoadModel` hook includes a custom event system for handling various stages of the model loading process.

##### Events

You can subscribe to these events using the `on` method:

- `'UPLOAD_PROGRESS'`: Emitted with the current progress (0-100) during file upload.
- `'UPLOAD_COMPLETE'`: Emitted with the loaded file object when the upload is complete.
- `'MULTIPLE_3D_MODELS'`: Emitted if multiple supported 3D model files are detected in the upload.
- `'UNSUPPORTED_FILE_TYPE'`: Emitted if an unsupported file type is uploaded.

Example usage:

```javascript
const { on, off } = useLoadModel();

useEffect(() => {
  const handleProgress = (progress) => {
    console.log(`Upload progress: ${progress}%`);
  };

  on('UPLOAD_PROGRESS', handleProgress);

  return () => off('UPLOAD_PROGRESS', handleProgress);
}, [on, off]);
```

### useOptimizeModel

#### Overview

`useOptimizeModel` is a React hook used to optimize 3D models, particularly GLTF-based scenes. It can be used in conjunction with `useLoadModel` or independently.

#### Features

- Simplifies 3D models using mesh optimization algorithms
- Integrates with `useLoadModel` and `ModelContext`
- TypeScript support

#### Usage

There are two ways to use the `useOptimizeModel` hook:

1. **Directly with `useLoadModel`**

   ```jsx
   import React from 'react';
   import { useLoadModel } from '@vctrl/hooks/use-load-model';
   import { useOptimizeModel } from '@vctrl/hooks/use-optimize-model';

   function ModelLoader() {
     const optimizer = useOptimizeModel();
     const { load: loadFile, file, optimize } = useLoadModel(optimizer);

     const handleFileChange = (event) => {
       const files = Array.from(event.target.files);
       loadFile(files);
     };

     const handleSimplify = async () => {
       await optimize.simplifyOptimization();
       // The optimized model is now in file.model
     };

     return (
       <div>
         <input type="file" onChange={handleFileChange} multiple />
         <button onClick={handleSimplify}>Simplify Model</button>
       </div>
     );
   }
   ```

   > **Note**: Changes are applied to the `file.model` field from `useLoadModel` automatically when using optimizations.

2. **With `ModelProvider` and `useModelContext`**

   ```jsx
   // App.jsx
   import React from 'react';
   import { ModelProvider } from '@vctrl/hooks/use-load-model';
   import { useOptimizeModel } from '@vctrl/hooks/use-optimize-model';
   import Scene from './Scene';

   function App() {
     const optimizer = useOptimizeModel();

     return (
       <ModelProvider optimizer={optimizer}>
         <Scene />
       </ModelProvider>
     );
   }

   // Scene.jsx
   import React from 'react';
   import { useModelContext } from '@vctrl/hooks/use-load-model';

   function Scene() {
     const { optimize } = useModelContext();

     const handleSimplify = async () => {
       await optimize.simplifyOptimization();
       // Optimized model is now available
     };

     return <button onClick={handleSimplify}>Simplify Model</button>;
   }
   ```

#### API Reference

The `useOptimizeModel` hook returns the following:

- `load(model)`: Loads a Three.js `Object3D` model into the optimizer.
- `getModel()`: Retrieves the optimized model document using the `MeshoptSimplifier`.
- `simplifyOptimization()`: Simplifies the current model document and updates the model.

### useExportModel

#### Overview

`useExportModel` is a React hook for exporting 3D models from a Three.js scene.

#### Features

- Exports models in GLTF or GLB format
- Integrates with Three.js scenes
- TypeScript support

#### Usage

```jsx
import React from 'react';
import { useExportModel } from '@vctrl/hooks/use-export-model';

function ExportButton({ scene }) {
  const { handleGltfExport } = useExportModel();

  const exportModel = () => {
    handleGltfExport(scene, { format: 'glb' });
  };

  return <button onClick={exportModel}>Export Model</button>;
}
```

#### API Reference

The `useExportModel` hook returns the following:

- `handleGltfExport(scene, options)`: Function to handle exporting the scene in GLTF or GLB format.
  - `scene`: The Three.js `Scene` or `Object3D` to export.
  - `options`: Optional export options, such as format (`'gltf'` or `'glb'`).

## ModelContext

`ModelContext` is a React context that provides the state and functions from `useLoadModel` (and optionally `useOptimizeModel`) to child components.

```jsx
import { ModelProvider, useModelContext } from '@vctrl/hooks/use-load-model';

function App() {
  return (
    <ModelProvider>
      <ModelConsumer />
    </ModelProvider>
  );
}

function ModelConsumer() {
  const { file, isLoading, progress, load, optimize } = useModelContext();
  // Use the context values
}
```

> **Note**: When using the React context, load models using the `useModelContext` hook.

## Common Concepts

### Supported File Types

The package currently supports the following 3D model file formats:

- GLTF (`.gltf`)
- GLB (`.glb`)
- USDZ (`.usdz`)

These are defined in the `ModelFileTypes` enum in `types.ts`.

### File Loading Process

The file loading process, particularly for GLTF files, is handled internally by the hooks. The process includes:

1. Parsing the GLTF file content.
2. Embedding external resources (buffers and images) into the GLTF content.
3. Using Three.js `GLTFLoader` to parse the modified GLTF content.
4. Updating the state with the loaded model.

The loading process includes progress updates, which are communicated through the event system.

### State Management

The package uses a reducer pattern for state management. The state includes:

- `file`: The currently loaded model file.
- `isLoading`: A boolean indicating if a file is being loaded.
- `progress`: The current loading progress.
- `supportedFileTypes`: An array of supported file types.

Actions for updating the state are defined in the `Action` type in `types.ts`.

### Integration with Three.js

The package integrates with Three.js for handling 3D model rendering and manipulation. The loaded models are compatible with Three.js scenes, with the model stored as a Three.js `Object3D` in the `ModelFile` interface.

## Development

This package is part of a monorepo workspace managed with Nx. To contribute or modify the package:

1. Clone the monorepo from [vectreal-core](https://github.com/vectreal/vectreal-core).
2. Install dependencies: `npm install` or `yarn install`.
3. Make your changes.
4. Build the package: `nx build vctrl/hooks`.
5. Test your changes: `nx test vctrl/hooks`.

## License

Please refer to the [LICENSE](https://github.com/vectreal/vectreal-core/blob/main/LICENSE) file in the package root for licensing information.

## Contributing

Contributions are welcome! Please read the contributing guidelines in the [vectreal-core](https://github.com/vectreal/vectreal-core) monorepo before submitting pull requests.

## Support

For issues, feature requests, or questions, please file an issue in the [GitHub repository](https://github.com/vectreal/vectreal-core/issues).

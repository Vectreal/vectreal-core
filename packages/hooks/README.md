# vctrl/hooks

[![Version and release packages to NPM](https://img.shields.io/github/actions/workflow/status/vectreal/vectreal-core/version-release.yaml?logo=github&logoColor=%23fc6c18&label=Version%20and%20release%20packages%20to%20NPM&color=%23fc6c18)
](https://github.com/Vectreal/vectreal-core/actions/workflows/version-release.yaml)
[![@vctrl/hooks | NPM Downloads](https://img.shields.io/npm/dm/%40vctrl%2Fhooks?logo=npm&logoColor=%23fc6c18&label=%40vctrl%2Fhooks%20%7C%20NPM%20Downloads&color=%23fc6c18)](https://www.npmjs.com/package/@vctrl/hooks)

> **Note**: This library is still undergoing heavy development until the first major version is released. This may lead to breaking changes in upcoming updates.

## Overview

`@vctrl/hooks` is a React hooks package designed to simplify 3D model loading, optimization, and exporting within React applications. It's part of the [vectreal-core](https://github.com/vectreal/vectreal-core) ecosystem and is primarily used in the `@vctrl/viewer` React component and the [official website application](https://core.vectreal.com).

The package provides powerful hooks for:

- **Loading various 3D model file formats** (`useLoadModel`)
- **Optimizing 3D models** (`useOptimizeModel`)
- **Exporting 3D models from Three.js scenes** (`useExportModel`)

It also includes a React context (`ModelContext`) for easy state management and an event system for handling different stages of the model loading process.

### Table of Contents

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
      - [Optimization Integration](#optimization-integration)
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
- Integrates with `useOptimizeModel` for model optimization
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
- `optimize`: An object populated by the `useOptimizeModel` hook integration, providing optimization functions (see below).

#### Optimization Integration

If you pass an instance of `useOptimizeModel` to `useLoadModel`, it will integrate optimization functions into the `optimize` object:

```jsx
import React from 'react';
import { useLoadModel } from '@vctrl/hooks/use-load-model';
import { useOptimizeModel } from '@vctrl/hooks/use-optimize-model';

function ModelLoader() {
  const optimizer = useOptimizeModel();
  const { load, file, optimize } = useLoadModel(optimizer);

  const handleSimplify = async () => {
    await optimize.simplifyOptimization();
    // The optimized model is now in file.model
  };

  return (
    // ... your component logic
  );
}
```

The `optimize` object includes quick access optimization:

- `simplifyOptimization(options)`: Simplifies the model using mesh simplification.
- `dedupOptimization(options)`: Removes duplicate vertices and meshes.
- `quantizeOptimization(options)`: Reduces the precision of vertex attributes.
- `texturesCompressionOptimization(options)`: Compresses the relevant textures in the model file using texture compression.

### useOptimizeModel

#### Overview

`useOptimizeModel` is a React hook used to optimize 3D models, particularly GLTF-based scenes. It can be used in conjunction with `useLoadModel` or independently.

#### Features

- Simplifies 3D models using mesh optimization algorithms
- Provides deduplication and quantization optimizations
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
     const { load, file, optimize } = useLoadModel(optimizer);

     const handleSimplify = async () => {
       await optimize.simplifyOptimization();
       // The optimized model is now in file.model
     };

     const handleDedup = async () => {
       await optimize.dedupOptimization();
     };

     const handleQuantize = async () => {
       await optimize.quantizeOptimization();
     };

     return (
       <div>
         <input
           type="file"
           onChange={(e) => load(Array.from(e.target.files))}
           multiple
         />
         <button onClick={handleSimplify}>Simplify Model</button>
         <button onClick={handleDedup}>Deduplicate Model</button>
         <button onClick={handleQuantize}>Quantize Model</button>
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
     };

     const handleDedup = async () => {
       await optimize.dedupOptimization();
     };

     const handleQuantize = async () => {
       await optimize.quantizeOptimization();
     };

     return (
       <div>
         <button onClick={handleSimplify}>Simplify Model</button>
         <button onClick={handleDedup}>Deduplicate Model</button>
         <button onClick={handleQuantize}>Quantize Model</button>
       </div>
     );
   }
   ```

#### API Reference

The `useOptimizeModel` hook returns the following:

- `load(model)`: Loads a Three.js `Object3D` model into the optimizer.
- `getModel()`: Retrieves the optimized model as a binary array buffer.
- `simplifyOptimization(options)`: Simplifies the current model using the `MeshoptSimplifier`.
- `dedupOptimization(options)`: Removes duplicate vertices and meshes.
- `quantizeOptimization(options)`: Reduces the precision of vertex attributes.
- `texturesOptimization(options)`: Compresses related textures.
- `getSize()`: Object with byte size of gltf scene and a formatted megabyte string
- `reset()`: Resets the current optimizer model and report state.
- `report`: @gltf-transform gltf report object with relevant details about a gltf scene
- `error`: Stores any possible optimization errors
- `loading`: Boolean for when the model is being loaded

### useExportModel

#### Overview

`useExportModel` is a React hook for exporting 3D models from a Three.js scene.

#### Features

- Exports models in GLTF or GLB format
- Handles embedded resources and textures
- Integrates with Three.js scenes
- TypeScript support

#### Usage

```jsx
import React from 'react';
import { useExportModel } from '@vctrl/hooks/use-export-model';

function ExportButton({ file }) {
  const { handleGltfExport } = useExportModel(
    () => console.log('Export complete'),
    (error) => console.error('Export error:', error),
  );

  const exportAsGlb = () => {
    handleGltfExport(file, true); // Export as GLB (binary)
  };

  const exportAsGltf = () => {
    handleGltfExport(file, false); // Export as GLTF
  };

  return (
    <div>
      <button onClick={exportAsGlb}>Export as GLB</button>
      <button onClick={exportAsGltf}>Export as GLTF</button>
    </div>
  );
}
```

#### API Reference

The `useExportModel` hook returns the following:

- `handleGltfExport(file, binary)`: Function to handle exporting the model.
  - `file`: The `ModelFile` object to export.
  - `binary`: A boolean indicating whether to export in binary format (`true` for GLB, `false` for GLTF).
  - The function exports the model and triggers file download.

### ModelContext

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
5. Integrating with the optimizer if provided.

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

This project is licensed under the **GNU Affero General Public License v3.0**. Please refer to the [LICENSE](https://github.com/vectreal/vectreal-core/blob/main/LICENSE) file in the package root for licensing information.

## Contributing

Contributions are welcome! Please read the contributing guidelines in the [vectreal-core](https://github.com/vectreal/vectreal-core) monorepo before submitting pull requests.

## Support

For issues, feature requests, or questions, please file an issue in the [GitHub repository](https://github.com/vectreal/vectreal-core/issues).

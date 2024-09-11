# vctrl/hooks

[![Version and release packages to NPM](https://img.shields.io/github/actions/workflow/status/vectreal/vectreal-core/version-release.yaml?logo=github&logoColor=%23fc6c18&label=Version%20and%20release%20packages%20to%20NPM&color=%23fc6c18)
](https://github.com/Vectreal/vectreal-core/actions/workflows/version-release.yaml)
[![@vctrl/hooks | NPM Downloads](https://img.shields.io/npm/dm/%40vctrl%2Fhooks?logo=npm&logoColor=%23fc6c18&label=%40vctrl%2Fhooks%20%7C%20NPM%20Downloads&color=%23fc6c18)](https://www.npmjs.com/package/@vctrl/hooks)

## Overview

vctrl/hooks is a React hooks package designed to simplify 3D model loading and management within React applications. It's part of the vectreal-core ecosystem and is primarily used in the vctrl/viewer React component and the official website application.

The package provides a powerful hook for loading various 3D model file formats, along with a React context for easy state management and an event system for handling different stages of the model loading process.

## Table of contents

- [vctrl/hooks](#vctrlhooks)
  - [Overview](#overview)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Reference](#api-reference)
    - [useLoadModel](#useloadmodel)
      - [Returns](#returns)
    - [ModelContext](#modelcontext)
    - [Event System](#event-system)
      - [Events](#events)
  - [Supported File Types](#supported-file-types)
  - [File Loading Process](#file-loading-process)
  - [State Management](#state-management)
  - [Integration with Three.js](#integration-with-threejs)
  - [Development](#development)
  - [License](#license)
  - [Contributing](#contributing)
  - [Support](#support)

## Features

- Direct 3D model file loading (supports GLTF, GLB, and USDZ formats)
- React context for state management (ModelContext)
- Event system for handling loading progress and completion
- Three.js integration
- TypeScript support

## Installation

To install the package, use npm or yarn:

```bash
npm install @vctrl/hooks
# or
yarn add @vctrl/hooks
```

## Usage

The main hook exported by this package is `useLoadModel`. Here's a basic example of how to use it:

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
      <input type="file" onChange={onFileChange} />
      {isLoading && <p>Loading: {progress}%</p>}
      {file && <p>Model loaded: {file.name}</p>}
    </div>
  );
}
```

> Multiple files can be handled, e.g. when uploading a `.gltf` model, its `.bin` file and the relavant image texture files as `.jpeg`/`.png` (Other texture file formats have not been tested).

## API Reference

### useLoadModel

The main hook for loading and managing 3D model files.

#### Returns

- `file`: The loaded file object of type `ModelFile | null`.
- `isLoading`: A boolean indicating whether a file is currently being loaded.
- `progress`: A number between 0 and 100 representing the loading progress.
- `load`: A function to handle file upload. It accepts an array of `File` objects or a mixed array of `File` objects and directory entries.
- `reset`: A function to reset the internal state back to it's initial values.
- `on`: A function to subscribe to events.
- `off`: A function to unsubscribe from events.

### ModelContext

A React context that provides the state and functions from `useLoadModel` to child components. It's implemented in `model-context.tsx`.

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
  const { file, isLoading, progress, load } = useModelContext();
  // Use the context values
}
```

> When using the React Context, only load models with the `useModelContext` hook.

### Event System

The package includes a custom event system for handling various stages of the model loading process. The event system is implemented in `event-system.ts` and provides three main methods:

- `emit<T extends EventTypes>(event: T, data: EventData[T]): void`
- `on<T extends EventTypes>(event: T, handler: EventHandler<T>): void`
- `off<T extends EventTypes>(event: T, handler: EventHandler<T>): void`

#### Events

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

## Supported File Types

The package currently supports the following 3D model file formats:

- GLTF (.gltf)
- GLB (.glb)
- USDZ (.usdz)

These are defined in the `ModelFileTypes` enum in `types.ts`.

## File Loading Process

The file loading process, particularly for GLTF files, is handled by the `useLoadGltf` hook in `use-load-gltf.ts`. This hook performs the following steps:

1. Parses the GLTF file content.
2. Embeds external resources (buffers and images) into the GLTF content.
3. Uses Three.js GLTFLoader to parse the modified GLTF content.
4. Dispatches actions to update the state with the loaded model.

The loading process includes progress updates, which are communicated through the event system.

## State Management

The package uses a reducer pattern for state management, implemented in `state.ts`. The state includes:

- `file`: The currently loaded model file.
- `isFileLoading`: A boolean indicating if a file is being loaded.
- `progress`: The current loading progress.
- `supportedFileTypes`: An array of supported file types.

Actions for updating the state are defined in the `Action` type in `types.ts`.

## Integration with Three.js

The package integrates with Three.js for handling 3D model rendering. The loaded models are compatible with Three.js scene rendering, with the model stored as a Three.js `Object3D` in the `ModelFile` interface.

## Development

This package is part of a monorepo workspace managed with Nx. To contribute or modify the package:

1. Clone the monorepo
2. Install dependencies: `npm install` or `yarn install`
3. Make your changes
4. Build the package: `nx build vctrl/hooks`
5. Test your changes: `nx test vctrl/hooks`

## License

Please refer to the LICENSE file in the package root for licensing information.

## Contributing

Contributions are welcome! Please read the contributing guidelines in the [vectreal-core](https://github.com/vectreal/vectreal-core) monorepo before submitting pull requests.

## Support

For issues, feature requests, or questions, please file an issue in the GitHub repository.

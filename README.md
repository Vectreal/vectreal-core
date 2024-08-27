![Vectreal Core Banner](https://storage.googleapis.com/documentation-assets/vectreal-core-banner.png)

# Vectreal Core

## Introduction

Vectreal Core is a robust, community-driven, open-source toolkit designed to seamlessly integrate high-performance 3D content into React-based projects. Our mission is to empower developers, designers, and creators with comprehensive resources to build stunning, interactive 3D experiences.

The monorepo is orchestrated using NX within an npm workspaces environment, primarily consisting of React.js projects.

>This project provides easy-to-use, fully configured components, hooks, and additional tools built on top of [Three.js](https://github.com/mrdoob/three.js) and [React Three Fiber](https://github.com/pmndrs/react-three-fiber).

## Table of Contents

- [Vectreal Core](#vectreal-core)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Packages](#packages)
    - [React Packages](#react-packages)
    - [Docker](#docker)
  - [Applications](#applications)
  - [Examples](#examples)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Projects](#running-projects)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Features

- Fully typed components for seamless integration with TypeScript projects
- Optimized performance for smooth 3D rendering
- Support for multiple 3D file formats (glTF, GLB, OBJ, USDZ, and more)
- Extensible architecture for custom implementations
- Comprehensive documentation and examples

## Project Structure

This monorepo is organized as follows:

```
vectreal-core/
├── packages/
│ ├── hooks/
│ ├── viewer/
│ └── docker/
├── apps/
│ └── official-website/
├── examples/
└── docs/
```

## Packages

### React Packages

- **[@vctrl/hooks](https://github.com/Vectreal/vectreal-core/tree/main/packages/hooks)**: A collection of useful React hooks for loading and interacting with 3D files.

  - **use-load-model**: File or directory loading hooks for various approaches (Event based, React Context, direct)

- **[@vctrl/viewer](https://github.com/Vectreal/vectreal-core/tree/main/packages/viewer)**: A fully type-safe and ready-to-use viewer component for React.

  Built with the `@vctrl/hooks/use-load-model` hook to dynamically load various model file types.

  Supported file formats:

  - glTF (with .bin and textures)
  - GLB
  - OBJ
  - USDZ (limited support, work in progress)

### Docker

- **[Docker images](https://github.com/Vectreal/vectreal-core/tree/main/packages/docker)**: (Work in Progress) Easily deploy convenient Vectreal tools like file converters in your Docker environment.

## Applications

- **[Official Website](https://github.com/Vectreal/vectreal-core/tree/main/apps/official-website)**: A showcase application built using the components and software provided in this monorepo. Deployed using GitHub Actions and Google Cloud.

## Examples

Visit our [free online editor toolkit](https://core.vectreal.com/editor) to see Vectreal Core in action. This interactive playground demonstrates the capabilities of our components and provides a hands-on experience for developers.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Vectreal/vectreal-core.git
   cd vectreal-core
   ```

   Install dependencies:

   ```bash
   npm install
   ```

### Running Projects

To serve one of the app projects, use the following command:

```bash
npx nx serve vectreal/official-website
```

To see all available targets for a project:

```bash
npx nx show project vectreal/official-website --web
```

> The optional `--web` parameter opens a visual overview of all possible commands available for a project.

For more information on working with NX, refer to the [official NX documentation](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial#project-details-container).

## Contributing

We welcome contributions from developers passionate about React and Three.js.

To contribute:

> Please read our Contributing Guidelines for more details.

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them following the commit message format described [here by NX](https://nx.dev/recipes/nx-release/get-started-with-nx-release)
4. Push your changes to your fork
5. Submit a pull request to the main repository

Join our Discord community for support, announcements, and discussions about the future of 3D web content.

## License



## Contact

Website: [Vectreal Core](https://core.vectreal.com) | [Vectreal Platform](https://vectreal.com)

Discord: [Join our server](https://discord.gg/2wMKRyFE)

X/Twitter: [@Vectreal](https://x.com/vectreal)

Email: info@vectreal.com

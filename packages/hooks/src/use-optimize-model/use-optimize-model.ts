/* vectreal-core | vctrl/hooks
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

import { useRef } from 'react';

import { Object3D } from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

import { Document, WebIO } from '@gltf-transform/core';
import { dedup, flatten, quantize, simplify, weld } from '@gltf-transform/functions';
import { KHRMeshQuantization } from '@gltf-transform/extensions';
import { MeshoptSimplifier } from 'meshoptimizer';

const exporter = new GLTFExporter();
const io = new WebIO();
io.registerExtensions([KHRMeshQuantization]);

const useOptimizeModel = () => {
  const modelDoc = useRef<Document | null>(null);

  async function load(model: Object3D) {
    const modelBuffer = (await exporter.parseAsync(model, {
      binary: true,
    })) as ArrayBuffer;
    modelDoc.current = await io.readBinary(new Uint8Array(modelBuffer));
  }

  async function simplifyOptimization() {
    if (!modelDoc.current) return;

    const transformedModel = await modelDoc.current.transform(
      flatten(),
      quantize(),
      weld(),
      simplify({ simplifier: MeshoptSimplifier, ratio: 0.1, error: 0.0001 }),
    );

    modelDoc.current = transformedModel;
  }

  async function dedupOptimization() {
    if (!modelDoc.current) return;

    const transformedModel = await modelDoc.current.transform(dedup({}));

    modelDoc.current = transformedModel;
  }

  async function quantizeOptimization() {
    if (!modelDoc.current) return;

    const transformedModel = await modelDoc.current.transform(quantize({}));

    modelDoc.current = transformedModel;
  }

  async function getModel() {
    if (!modelDoc.current) return;

    console.log(modelDoc.current);

    return await io.writeBinary(modelDoc.current);
  }

  return {
    load,
    getModel,
    simplifyOptimization,
    dedupOptimization,
    quantizeOptimization,
  };
};

export default useOptimizeModel;

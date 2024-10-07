import { useRef } from 'react';
import { toast } from 'sonner';
import {
  presetsObj,
  PresetsType,
} from '@react-three/drei/helpers/environment-assets';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarSub,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from '@vctrl/shared/components';
import { useModelContext } from '@vctrl/hooks/use-load-model';
import { useExportModel } from '@vctrl/hooks/use-export-model';

import { useEditorContext } from '../../components/providers';

function handleExportSuccess() {
  toast.info('Successfully exported model.');
}

function handleExportError(error: ErrorEvent) {
  toast.error(error.message);
}

const FileMenu = () => {
  const { file, load, reset, optimize } = useModelContext();
  const { simplifyOptimization } = optimize;

  const { handleGltfExport } = useExportModel(
    handleExportSuccess,
    handleExportError,
  );

  const {
    autoRotate,
    setAutoRotateEnabled,
    setAutoRotateSpeed,
    hdr,
    setHdrExposure,
    setHdrPreset,
    setShowAsBackground,
    color,
    setColor,
    showGrid,
    setShowGrid,
  } = useEditorContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleReset() {
    reset();
  }

  function handleToggleGrid() {
    setShowGrid(!showGrid);
  }

  function handleToggleAutoRotate() {
    setAutoRotateEnabled(!autoRotate.enabled);
  }

  function handleToggleHdrBackground() {
    setShowAsBackground(!hdr.asBackground);
  }

  function handleNewFilesClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleLoadNewFiles(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const files = event.target.files;

    if (files) {
      load(Array.from(files));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function handleUsdzExport() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async function handleSimplifyClick() {
    simplifyOptimization();
  }

  return (
    file && (
      <>
        {/* Keep input mounted for upload */}
        <input
          type="file"
          onChange={handleLoadNewFiles}
          ref={inputRef}
          accept=".glb, .gltf, .bin, .usdz, .usda, .jpeg, .jpg, .png"
          style={{ display: 'none' }}
          multiple
        />

        <Menubar className="absolute bottom-[2rem] right-[50%] translate-x-[50%]">
          <MenubarMenu>
            <MenubarTrigger key="file">File</MenubarTrigger>
            <MenubarContent align="center">
              <MenubarItem onClick={handleNewFilesClick}>
                Load new files <MenubarShortcut>⌘ + l</MenubarShortcut>
              </MenubarItem>

              <MenubarSeparator />

              <MenubarItem onClick={handleReset}>Clear viewer</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger key="file">View</MenubarTrigger>

            <MenubarContent align="center">
              <MenubarCheckboxItem
                onClick={handleToggleGrid}
                checked={showGrid}
              >
                Show Grid
              </MenubarCheckboxItem>

              <MenubarSeparator />

              <MenubarCheckboxItem
                onClick={handleToggleAutoRotate}
                checked={autoRotate.enabled}
              >
                Enable Auto-Rotation
              </MenubarCheckboxItem>

              <MenubarSub>
                <MenubarSubTrigger>Auto-Rotation Speed</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarRadioGroup value={String(autoRotate.speed)}>
                    {['1', '0.5', '0.25'].map((key) => (
                      <MenubarRadioItem
                        key={key}
                        value={key}
                        onClick={() => setAutoRotateSpeed(Number(key))}
                      >
                        {key !== '1' ? key : key + '.0'}x
                      </MenubarRadioItem>
                    ))}
                  </MenubarRadioGroup>
                </MenubarSubContent>
              </MenubarSub>

              <MenubarSeparator />

              <MenubarCheckboxItem
                onClick={handleToggleHdrBackground}
                checked={hdr.asBackground}
              >
                Show HDR As Background
              </MenubarCheckboxItem>
              <MenubarSub>
                <MenubarSubTrigger>Environment HDR</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarRadioGroup value={hdr.preset as string}>
                    {Object.keys(presetsObj).map((key) => (
                      <MenubarRadioItem
                        className="capitalize"
                        key={key}
                        value={key}
                        onClick={() => setHdrPreset(key as PresetsType)}
                      >
                        {key}
                      </MenubarRadioItem>
                    ))}
                  </MenubarRadioGroup>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger key="edit">Edit</MenubarTrigger>
            <MenubarContent align="center">
              <MenubarItem onClick={handleSimplifyClick}>Simplify</MenubarItem>
              <MenubarItem onClick={handleNewFilesClick}>Weld</MenubarItem>
              <MenubarItem onClick={handleNewFilesClick}>
                Remove duplicates
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger key="edit">Export</MenubarTrigger>
            <MenubarContent align="center">
              <MenubarSub>
                <MenubarSubTrigger>glTF</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={() => handleGltfExport(file, true)}>
                    glTF-Binary
                    <pre className="text-muted-foreground"> .glb</pre>
                  </MenubarItem>
                  <MenubarItem onClick={() => handleGltfExport(file, false)}>
                    glTF-JSON
                    <pre className="text-muted-foreground"> .gltf</pre>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>USD (WIP)</MenubarSubTrigger>
                {/* <MenubarSubContent>
                  <MenubarItem onClick={handleUsdzExport}>
                    USDZ
                    <pre className="text-muted-foreground"> .usdz (ASCII)</pre>
                  </MenubarItem>
                  <MenubarItem onClick={handleUsdzExport}>
                    USDZ
                    <pre className="text-muted-foreground"> .usdz (BINARY)</pre>
                  </MenubarItem>
                </MenubarSubContent> */}
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </>
    )
  );
};

export default FileMenu;

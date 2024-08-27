import { useRef } from 'react';

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
} from './ui/menubar';
import { MenubarSub } from '@radix-ui/react-menubar';
import { useModelContext } from '@vctrl/hooks/src/use-load-model';

const FileMenu = () => {
  const { file, handleFileUpload } = useModelContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleReset = () => {
    // dispatch(reset());
  };

  const handleNewFilesClick = () => {
    handleReset();

    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleLoadNewFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    handleReset();

    const files = event.target.files;

    if (files) {
      handleFileUpload(Array.from(files));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleUsdzExport = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSimplifyClick = () => {};

  return (
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

      <Menubar className="absolute bottom-[1rem] right-[50%] translate-x-[50%]">
        <MenubarMenu>
          <MenubarTrigger key="file">File</MenubarTrigger>
          <MenubarContent align="center">
            <MenubarItem onClick={handleNewFilesClick}>
              Load new files <MenubarShortcut>⌘ + l</MenubarShortcut>
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem onClick={handleReset} disabled={!file}>
              Reset viewer
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger key="edit" disabled={!file}>
            Edit
          </MenubarTrigger>
          <MenubarContent align="center">
            <MenubarItem onClick={handleSimplifyClick} disabled={!file}>
              Simplify
            </MenubarItem>
            <MenubarItem onClick={handleNewFilesClick} disabled={!file}>
              Weld
            </MenubarItem>
            <MenubarItem onClick={handleNewFilesClick} disabled={!file}>
              Remove duplicates
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger key="edit" disabled={!file}>
            Export
          </MenubarTrigger>
          <MenubarContent align="center">
            <MenubarSub>
              <MenubarSubTrigger>glTF</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={handleUsdzExport} disabled={!file}>
                  glTF-Binary
                  <pre className="text-muted-foreground"> .glb</pre>
                </MenubarItem>
                <MenubarItem onClick={handleUsdzExport} disabled={!file}>
                  glTF-JSON
                  <pre className="text-muted-foreground"> .gltf</pre>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>USD</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={handleUsdzExport} disabled={!file}>
                  USDZ
                  <pre className="text-muted-foreground"> .usdz (ASCII)</pre>
                </MenubarItem>
                <MenubarItem onClick={handleUsdzExport} disabled={!file}>
                  USDZ
                  <pre className="text-muted-foreground"> .usdz (BINARY)</pre>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};

export default FileMenu;

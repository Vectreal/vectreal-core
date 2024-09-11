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
  MenubarSub,
  MenubarCheckboxItem,
} from '@vctrl/shared/components';
import { useModelContext } from '@vctrl/hooks/use-load-model';

const FileMenu = () => {
  const { file, load, reset, optimize } = useModelContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleReset = () => {
    reset();
  };
  const handleNewFilesClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleLoadNewFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;

    if (files) {
      load(Array.from(files));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleUsdzExport = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleSimplifyClick = async () => {
  };

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

              <MenubarSeparator />

              <MenubarItem onClick={handleReset}>Reset viewer</MenubarItem>
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
                  <MenubarItem onClick={handleUsdzExport}>
                    glTF-Binary
                    <pre className="text-muted-foreground"> .glb</pre>
                  </MenubarItem>
                  <MenubarItem onClick={handleUsdzExport}>
                    glTF-JSON
                    <pre className="text-muted-foreground"> .gltf</pre>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>USD</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={handleUsdzExport}>
                    USDZ
                    <pre className="text-muted-foreground"> .usdz (ASCII)</pre>
                  </MenubarItem>
                  <MenubarItem onClick={handleUsdzExport}>
                    USDZ
                    <pre className="text-muted-foreground"> .usdz (BINARY)</pre>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </>
    )
  );
};

export default FileMenu;
